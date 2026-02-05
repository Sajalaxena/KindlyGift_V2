import { useState } from "react";
import { useCart } from "../context/CartContext";

const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbwn7KjWn6R-fKUtqvZtZcM1KMD0N4a_OUHlU1M-8hQFUGqWgo_BYEIKTEMSa5LRh9OT8A/exec";

export default function Checkout({ onClose }) {
  const { cart, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
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

  // Mock coupon codes - replace with your actual validation
  const VALID_COUPONS = {
    SAVE10: 0.1, // 10% off
    SAVE20: 0.2, // 20% off
    FLAT100: 100, // Flat 100 off
  };

  const handleApplyCoupon = () => {
    const coupon = formData.couponCode.trim().toUpperCase();
    if (!coupon) {
      alert("Please enter a coupon code");
      return;
    }

    if (VALID_COUPONS[coupon]) {
      const discount = typeof VALID_COUPONS[coupon] === "number" && VALID_COUPONS[coupon] < 1
        ? total * VALID_COUPONS[coupon]
        : VALID_COUPONS[coupon];

      setDiscountAmount(discount);
      setAppliedCoupon(coupon);
      alert(`Coupon applied! Discount: ₹${discount.toFixed(2)}`);
    } else {
      alert("Invalid coupon code");
      setDiscountAmount(0);
      setAppliedCoupon("");
    }
  };

  const finalTotal = Math.max(0, total - discountAmount);

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      alert("Please enter your name");
      return false;
    }
    if (!formData.customerEmail.trim()) {
      alert("Please enter your email");
      return false;
    }
    if (!formData.customerMobile.trim() || formData.customerMobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return false;
    }
    if (!formData.address.trim()) {
      alert("Please enter your address");
      return false;
    }
    if (!formData.pinCode.trim() || formData.pinCode.length !== 6) {
      alert("Please enter a valid 6-digit pin code");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || cart.length === 0) {
      alert("Please add items to cart and fill all details");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare order data
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
          cart.map((item) => ({ id: item.id, price: item.salePrice }))
        ),
        subtotal: total.toFixed(2),
        coupon_code: appliedCoupon || "NONE",
        discount_amt: discountAmount.toFixed(2),
        total_amount: finalTotal.toFixed(2),
        payment_method: "COD",
        order_status: "Pending",
      };

      // Send to Google Sheet API
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      alert("✅ Order placed successfully! We'll deliver it soon.");
      clearCart();
      onClose();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-pink-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:bg-pink-700 p-2 rounded"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-3">Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>₹{(item.salePrice * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-3" />
            <div className="flex justify-between font-bold text-lg">
              <span>Subtotal:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600 font-bold">
                <span>Discount ({appliedCoupon}):</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg text-pink-600 mt-3">
              <span>Total:</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer Information Form */}
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-lg">Delivery Information</h3>

            <input
              type="text"
              name="customerName"
              placeholder="Full Name *"
              value={formData.customerName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-600"
            />

            <input
              type="email"
              name="customerEmail"
              placeholder="Email Address *"
              value={formData.customerEmail}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-600"
            />

            <input
              type="tel"
              name="customerMobile"
              placeholder="Mobile Number (10 digits) *"
              value={formData.customerMobile}
              onChange={handleInputChange}
              maxLength="10"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-600"
            />

            <textarea
              name="address"
              placeholder="Delivery Address (Street, Area, Landmark) *"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-600"
            />

            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code (6 digits) *"
              value={formData.pinCode}
              onChange={handleInputChange}
              maxLength="6"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>

          {/* Coupon Code Section */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-3">Apply Coupon (Optional)</h3>
            <div className="flex gap-2">
              <input
                type="text"
                name="couponCode"
                placeholder="Enter coupon code"
                value={formData.couponCode}
                onChange={handleInputChange}
                disabled={appliedCoupon !== ""}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
              />
              {appliedCoupon ? (
                <button
                  onClick={() => {
                    setAppliedCoupon("");
                    setDiscountAmount(0);
                    setFormData((prev) => ({ ...prev, couponCode: "" }));
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Available codes: SAVE10 (10%), SAVE20 (20%), FLAT100 (₹100 off)
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">Payment Method</h3>
            <p className="text-lg font-bold text-green-600">
              💵 Cash on Delivery (COD) - Pay when you receive
            </p>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isLoading || cart.length === 0}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Placing Order..." : "Place Order (COD)"}
          </button>
        </div>
      </div>
    </div>
  );
}
