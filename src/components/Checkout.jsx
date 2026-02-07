import { useState } from "react";
import { useCart } from "../context/CartContext";
import MessageDialog from "./MessageDialog";

const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbwn7KjWn6R-fKUtqvZtZcM1KMD0N4a_OUHlU1M-8hQFUGqWgo_BYEIKTEMSa5LRh9OT8A/exec";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const VALID_COUPONS = {
    SAVE10: 0.1,
    SAVE20: 0.2,
    FLAT100: 100,
  };

  const handleApplyCoupon = () => {
    const coupon = formData.couponCode.trim().toUpperCase();
    if (!coupon) {
      setMessage({ isOpen: true, type: "error", text: "Please enter a coupon code" });
      return;
    }

    if (VALID_COUPONS[coupon]) {
      const discount = typeof VALID_COUPONS[coupon] === "number" && VALID_COUPONS[coupon] < 1
        ? total * VALID_COUPONS[coupon]
        : VALID_COUPONS[coupon];

      setDiscountAmount(discount);
      setAppliedCoupon(coupon);
      setMessage({ isOpen: true, type: "success", text: `Coupon applied! Discount: ₹${discount.toFixed(2)}` });
    } else {
      setMessage({ isOpen: true, type: "error", text: "Invalid coupon code" });
      setDiscountAmount(0);
      setAppliedCoupon("");
    }
  };

  const finalTotal = Math.max(0, total - discountAmount);
  const deliveryCharge = finalTotal < 999 ? 49 : 0;
  const grandTotal = finalTotal + deliveryCharge;

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      setMessage({ isOpen: true, type: "error", text: "Please enter your name" });
      return false;
    }
    if (!formData.customerEmail.trim()) {
      setMessage({ isOpen: true, type: "error", text: "Please enter your email" });
      return false;
    }
    if (!formData.customerMobile.trim() || formData.customerMobile.length !== 10) {
      setMessage({ isOpen: true, type: "error", text: "Please enter a valid 10-digit mobile number" });
      return false;
    }
    if (!formData.address.trim()) {
      setMessage({ isOpen: true, type: "error", text: "Please enter your address" });
      return false;
    }
    if (!formData.pinCode.trim() || formData.pinCode.length !== 6) {
      setMessage({ isOpen: true, type: "error", text: "Please enter a valid 6-digit pin code" });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || cart.length === 0) {
      setMessage({ isOpen: true, type: "error", text: "Please add items to cart and fill all details" });
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
        products_info: JSON.stringify(
          cart.map((item) => ({ id: item.id, name: item.name }))
        ),
        product_qty: JSON.stringify(
          cart.map((item) => ({ id: item.id, qty: item.qty }))
        ),
        product_price: JSON.stringify(
          cart.map((item) => ({ id: item.id, price: item.salePrice })).concat([{ id: 0, delivery: 80 }])
        ),
        subtotal: total.toFixed(2),
        coupon_code: appliedCoupon || "NONE",
        discount_amt: discountAmount.toFixed(2),
        delivery_charge: deliveryCharge.toFixed(2),
        total_amount: grandTotal.toFixed(2),
        payment_method: "COD",
        order_status: "Pending",
      };

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      clearCart();
      onOrderSuccess(`ORD_${Date.now()}`);
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage({ isOpen: true, type: "error", text: "Failed to place order. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200">
      {/* Header */}
      <div className="bg-pink-600 text-white p-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <button
            onClick={onClose}
            className="text-2xl hover:bg-pink-700 p-2 rounded transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN - Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-4">
                      <div className="flex gap-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Quantity: <span className="font-semibold text-pink-600">{item.qty}</span>
                          </p>
                          <p className="text-gray-600 text-sm">
                            Per Unit Price: <span className="font-semibold">₹{item.salePrice}</span>
                          </p>
                          <p className="text-pink-600 font-bold text-lg mt-2">
                            ₹{(item.salePrice * item.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₹{total.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon}):</span>
                      <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {deliveryCharge > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>Delivery Charge:</span>
                      <span className="font-semibold">₹{deliveryCharge.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg text-pink-600">
                    <span>Total:</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-blue-50 rounded-lg p-4 mt-6">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Payment Method</p>
                  <p className="text-lg font-bold text-green-600">💵 Cash on Delivery (COD)</p>
                  <p className="text-xs text-gray-600 mt-1">Pay when you receive the order</p>
                </div>

                {/* Return Policy Notice - Compact */}
                <div className="bg-amber-50 border-l-2 border-amber-500 rounded p-3 mt-6">
                  <p className="text-xs font-semibold text-amber-900 mb-1">Return Policy</p>
                  <p className="text-xs text-amber-800 leading-snug">
                    Returns accepted only for wrong items within 24 hours of delivery.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* RIGHT COLUMN - Delivery Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Information</h2>

            <div className="space-y-4">
              {/* Customer Details */}
              <input
                type="text"
                name="customerName"
                placeholder="Full Name *"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all"
              />

              <input
                type="email"
                name="customerEmail"
                placeholder="Email Address *"
                value={formData.customerEmail}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all"
              />

              <input
                type="tel"
                name="customerMobile"
                placeholder="Mobile Number (10 digits) *"
                value={formData.customerMobile}
                onChange={handleInputChange}
                maxLength="10"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all"
              />

              <textarea
                name="address"
                placeholder="Delivery Address (Street, Area, Landmark) *"
                value={formData.address}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all resize-none"
              />

              <input
                type="text"
                name="pinCode"
                placeholder="Pin Code (6 digits) *"
                value={formData.pinCode}
                onChange={handleInputChange}
                maxLength="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all"
              />

              {/* Coupon Section */}
              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <h3 className="font-bold text-gray-800 mb-3">Apply Coupon (Optional)</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    name="couponCode"
                    placeholder="Enter coupon code"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    disabled={appliedCoupon !== ""}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 transition-all"
                  />
                  {appliedCoupon ? (
                    <button
                      onClick={() => {
                        setAppliedCoupon("");
                        setDiscountAmount(0);
                        setFormData((prev) => ({ ...prev, couponCode: "" }));
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {/* <p className="text-xs text-gray-600">Try: SAVE10 (10%), SAVE20 (20%), FLAT100 (₹100 off)</p> */}
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading || cart.length === 0}
                className="w-full bg-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-8"
              >
                {isLoading ? "Placing Order..." : "Place Order (COD)"}
              </button>

              {/* Cancel Button */}
              <button
                onClick={onClose}
                disabled={isLoading}
                className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-400 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Dialog */}
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
