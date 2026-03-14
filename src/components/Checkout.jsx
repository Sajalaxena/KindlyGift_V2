import { useState } from "react";
import { useCart } from "../context/CartContext";
import MessageDialog from "./MessageDialog";
import { motion, AnimatePresence } from "framer-motion";

// ── Heart Burst Overlay ──────────────────────────────────────────────
const HEARTS = ["❤️", "🩷", "💕", "💖", "💗", "💓", "🌸"];

function HeartBurst({ show, discount }) {
  const hearts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    emoji: HEARTS[i % HEARTS.length],
    x: (Math.random() - 0.5) * 80,   // vw offset from centre
    y: -(20 + Math.random() * 55),    // vh upward travel
    scale: 0.8 + Math.random() * 1.4,
    delay: Math.random() * 0.5,
    rotate: (Math.random() - 0.5) * 40,
  }));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="heart-burst"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
        >
          {hearts.map((h) => (
            <motion.span
              key={h.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 0, x: `${h.x}vw`, y: `${h.y}vh`, scale: h.scale, rotate: h.rotate }}
              transition={{ duration: 1.4 + Math.random() * 0.5, delay: h.delay, ease: "easeOut" }}
              className="absolute text-3xl select-none"
              style={{ fontSize: `${1.5 + Math.random()}rem` }}
            >
              {h.emoji}
            </motion.span>
          ))}

          {/* Centre success badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="bg-white rounded-3xl shadow-2xl border-2 border-[#ECD2D0] px-8 py-6 text-center relative z-10"
          >
            <p className="text-4xl mb-2">🎉</p>
            <p className="font-heading font-extrabold text-[#B77570] text-2xl">Coupon Applied!</p>
            {discount > 0 && (
              <p className="text-green-600 font-bold text-lg mt-1">You saved ₹{discount.toFixed(2)} 💸</p>
            )}
            <p className="text-gray-400 text-xs mt-2">Discount reflected in your total</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
// ────────────────────────────────────────────────────────────────────

const API_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwn7KjWn6R-fKUtqvZtZcM1KMD0N4a_OUHlU1M-8hQFUGqWgo_BYEIKTEMSa5LRh9OT8A/exec";

const VALID_COUPONS = {
  WELCOME10: 0.1,
  SAVE10: 0.1,
  SAVE20: 0.2,
  FLAT100: 100,
};

function FloatingInput({ label, id, type = "text", name, value, onChange, placeholder, maxLength, required }) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder=" "
        required={required}
        className="peer w-full border-2 border-[#ECD2D0] rounded-xl px-4 pt-6 pb-2 text-gray-800 text-sm focus:outline-none focus:border-[#B77570] bg-white transition-all duration-200 placeholder-transparent"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-[11px] text-[#B77570] font-semibold tracking-wide transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#B77570] peer-focus:font-semibold"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, id, name, value, onChange, rows = 3, required }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder=" "
        required={required}
        className="peer w-full border-2 border-[#ECD2D0] rounded-xl px-4 pt-6 pb-2 text-gray-800 text-sm focus:outline-none focus:border-[#B77570] bg-white transition-all duration-200 placeholder-transparent resize-none"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-[11px] text-[#B77570] font-semibold tracking-wide transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#B77570] peer-focus:font-semibold"
      >
        {label}
      </label>
    </div>
  );
}

export default function Checkout({ onClose, onOrderSuccess }) {
  const { cart, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ isOpen: false, type: "", text: "" });

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerMobile: "",
    address: "",
    pinCode: "",
    couponCode: "",
  });

  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [showHearts, setShowHearts] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = () => {
    const coupon = formData.couponCode.trim().toUpperCase();
    if (!coupon) {
      setMessage({ isOpen: true, type: "error", text: "Please enter a coupon code" });
      return;
    }
    if (VALID_COUPONS[coupon]) {
      const discount =
        typeof VALID_COUPONS[coupon] === "number" && VALID_COUPONS[coupon] < 1
          ? total * VALID_COUPONS[coupon]
          : VALID_COUPONS[coupon];
      setDiscountAmount(discount);
      setAppliedCoupon(coupon);
      // Show heart animation instead of popup
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 2200);
    } else {
      setMessage({ isOpen: true, type: "error", text: "Invalid coupon code. Try SAVE10 or FLAT100" });
      setDiscountAmount(0);
      setAppliedCoupon("");
    }
  };

  const finalTotal = Math.max(0, total - discountAmount);
  const deliveryCharge = finalTotal < 999 ? 49 : 0;
  const grandTotal = finalTotal + deliveryCharge;

  const validateForm = () => {
    if (!formData.customerName.trim()) { setMessage({ isOpen: true, type: "error", text: "Please enter your name" }); return false; }
    if (!formData.customerEmail.trim()) { setMessage({ isOpen: true, type: "error", text: "Please enter your email" }); return false; }
    if (!formData.customerMobile.trim() || formData.customerMobile.length !== 10) { setMessage({ isOpen: true, type: "error", text: "Please enter a valid 10-digit mobile number" }); return false; }
    if (!formData.address.trim()) { setMessage({ isOpen: true, type: "error", text: "Please enter your address" }); return false; }
    if (!formData.pinCode.trim() || formData.pinCode.length !== 6) { setMessage({ isOpen: true, type: "error", text: "Please enter a valid 6-digit pin code" }); return false; }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || cart.length === 0) {
      setMessage({ isOpen: true, type: "error", text: "Please add items and fill all details" });
      return;
    }
    setIsLoading(true);
    try {
      const orderData = {
        order_id: `ORD_${Date.now()}`,
        order_date_time: new Date().toLocaleString("en-IN"),
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_mobile: formData.customerMobile,
        address: formData.address,
        pin_code: formData.pinCode,
        products_info: JSON.stringify(cart.map((item) => ({ id: item.id, name: item.name }))),
        product_qty: JSON.stringify(cart.map((item) => ({ id: item.id, qty: item.qty }))),
        product_price: JSON.stringify(cart.map((item) => ({ id: item.id, price: item.salePrice })).concat([{ id: 0, delivery: 80 }])),
        subtotal: total.toFixed(2),
        coupon_code: appliedCoupon || "NONE",
        discount_amt: discountAmount.toFixed(2),
        delivery_charge: deliveryCharge.toFixed(2),
        total_amount: grandTotal.toFixed(2),
        payment_method: "COD",
        order_status: "Pending",
      };
      const response = await fetch(API_ENDPOINT, { method: "POST", body: JSON.stringify(orderData) });
      if (!response.ok) throw new Error("Failed");
      clearCart();
      onOrderSuccess(`ORD_${Date.now()}`);
    } catch {
      setMessage({ isOpen: true, type: "error", text: "Failed to place order. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #FDF7F7 0%, #FAF1F1 40%, #F4E3E2 100%)" }}>
      <HeartBurst show={showHearts} discount={discountAmount} />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#ECD2D0] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛍️</span>
            <div>
              <h1 className="font-heading font-extrabold text-[#B77570] text-xl leading-none">Checkout</h1>
              <p className="text-xs text-gray-400">KindlyGift • Secure Checkout</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F4E3E2] hover:bg-[#ECD2D0] text-[#B77570] font-bold text-lg flex items-center justify-center transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-[#B77570] text-white text-[10px] sm:text-xs py-2 px-4 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-10 font-medium text-center">
        <span className="flex items-center gap-1.5 whitespace-nowrap">🔒 <span className="hidden xs:inline">Secure</span> Checkout</span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">🚚 Free Delivery <span className="hidden xs:inline">Above ₹999</span></span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">💚 Cash on Delivery</span>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 lg:gap-8 items-start">

          {/* ─── LEFT: Delivery Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md border border-[#ECD2D0] overflow-hidden"
          >
            {/* Section Header */}
            <div className="px-6 py-5 border-b border-[#F4E3E2] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#B77570] text-white flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h2 className="font-heading font-bold text-gray-800 text-lg">Delivery Information</h2>
                <p className="text-xs text-gray-400">We'll ship your order to this address</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatingInput label="Full Name *" id="customerName" name="customerName" value={formData.customerName} onChange={handleInputChange} required />
                <FloatingInput label="Email Address *" id="customerEmail" type="email" name="customerEmail" value={formData.customerEmail} onChange={handleInputChange} required />
              </div>

              <FloatingInput label="Mobile Number (10 digits) *" id="customerMobile" type="tel" name="customerMobile" value={formData.customerMobile} onChange={handleInputChange} maxLength="10" required />

              <FloatingTextarea label="Delivery Address (Street, Area, Landmark) *" id="address" name="address" value={formData.address} onChange={handleInputChange} rows={3} required />

              <FloatingInput label="Pin Code (6 digits) *" id="pinCode" name="pinCode" value={formData.pinCode} onChange={handleInputChange} maxLength="6" required />
            </div>

            {/* Payment Method Section */}
            <div className="px-6 pb-4">
              <div className="rounded-xl border-2 border-[#B77570] bg-[#FDF7F7] p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B77570]/10 flex items-center justify-center text-xl">💵</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-sm">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Pay when your order arrives</p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-[#B77570] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B77570]" />
                </div>
              </div>
            </div>

            {/* Coupon */}
            <div className="px-6 pb-6">
              <div className="rounded-xl bg-[#F4E3E2]/50 border border-[#ECD2D0] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#B77570]">🏷️</span>
                  <h3 className="font-semibold text-gray-700 text-sm">Have a Coupon?</h3>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="couponCode"
                    placeholder="Enter coupon code"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    disabled={appliedCoupon !== ""}
                    className="flex-1 px-4 py-2.5 border-2 border-[#ECD2D0] rounded-xl text-sm focus:outline-none focus:border-[#B77570] disabled:bg-gray-50 disabled:text-gray-400 transition-all bg-white uppercase"
                  />
                  {appliedCoupon ? (
                    <button
                      onClick={() => { setAppliedCoupon(""); setDiscountAmount(0); setFormData((p) => ({ ...p, couponCode: "" })); }}
                      className="px-4 py-2.5 bg-red-100 text-red-600 border-2 border-red-200 rounded-xl font-semibold text-sm hover:bg-red-200 transition-all cursor-pointer"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyCoupon}
                      className="px-5 py-2.5 bg-[#B77570] text-white rounded-xl font-semibold text-sm hover:bg-[#945854] transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {appliedCoupon && (
                  <p className="text-green-600 text-xs mt-2 font-medium">✅ Coupon <strong>{appliedCoupon}</strong> applied — you saved ₹{discountAmount.toFixed(2)}!</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT: Order Summary ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Order Items Card */}
            <div className="bg-white rounded-2xl shadow-md border border-[#ECD2D0] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#F4E3E2] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B77570] text-white flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h2 className="font-heading font-bold text-gray-800 text-base">Your Order</h2>
                  <p className="text-xs text-gray-400">{cart.length} item{cart.length !== 1 ? "s" : ""} in cart</p>
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-4xl mb-2">🛒</p>
                  <p className="text-gray-500 font-medium">Your cart is empty</p>
                </div>
              ) : (
                <div className="divide-y divide-[#F4E3E2] max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                      {item.image && (
                        <img
                          src={Array.isArray(item.image) ? item.image[0] : item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-xl border border-[#ECD2D0] flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Qty: <span className="font-semibold text-[#B77570]">{item.qty}</span> × ₹{item.salePrice}</p>
                      </div>
                      <p className="font-bold text-[#B77570] text-sm flex-shrink-0">₹{(item.salePrice * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Breakdown Card */}
            <div className="bg-white rounded-2xl shadow-md border border-[#ECD2D0] p-5">
              <h3 className="font-bold text-gray-700 text-sm mb-4">Price Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span>−₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  {deliveryCharge > 0
                    ? <span className="font-semibold">₹{deliveryCharge.toFixed(2)}</span>
                    : <span className="text-green-600 font-semibold">FREE 🎉</span>
                  }
                </div>
                {deliveryCharge > 0 && (
                  <p className="text-xs text-[#B77570] bg-[#FDF7F7] rounded-lg px-3 py-2">
                    Add ₹{(999 - finalTotal).toFixed(2)} more for free delivery!
                  </p>
                )}
                <div className="border-t-2 border-dashed border-[#ECD2D0] pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-800">Total Amount</span>
                  <span className="text-xl font-extrabold text-[#B77570]">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Return Policy */}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <span className="text-xl mt-0.5">ℹ️</span>
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Return Policy:</strong> Returns accepted only for wrong items delivered, within 24 hours of delivery.
              </p>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={isLoading || cart.length === 0}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              style={{
                background: isLoading || cart.length === 0
                  ? "#9ca3af"
                  : "linear-gradient(135deg, #CE928C 0%, #B77570 50%, #945854 100%)",
                boxShadow: cart.length > 0 && !isLoading ? "0 8px 24px rgba(183,117,112,0.4)" : "none",
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                  Placing Order...
                </span>
              ) : (
                "Place Order (COD) →"
              )}
            </button>

            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full py-3 rounded-2xl font-semibold text-gray-500 bg-white border-2 border-[#ECD2D0] hover:border-[#B77570] hover:text-[#B77570] transition-all cursor-pointer text-sm disabled:opacity-50"
            >
              ← Back to Shopping
            </button>
          </motion.div>
        </div>
      </div>

      <MessageDialog
        isOpen={message.isOpen}
        type={message.type}
        message={message.text}
        onClose={() => setMessage({ isOpen: false, type: "", text: "" })}
        autoClose={3000}
      />
    </div>
  );
}
