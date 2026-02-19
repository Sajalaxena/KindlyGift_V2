export default function ThankYouPage({ orderId, onGoHome }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="text-6xl mb-6 animate-bounce">✨</div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-700 mb-2">Your order has been placed successfully.</p>

        {/* Order ID */}
        <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4 my-6">
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="text-lg font-mono font-bold text-pink-600 break-all">{orderId}</p>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          We've received your order and will deliver it soon. You'll receive updates on your email and mobile number.
        </p>

        {/* Home Button */}
        <button
          onClick={onGoHome}
          className="w-full bg-[#d65a8d] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#b03a6b] transition-colors cursor-pointer"
        >
          Back to Home
        </button>

        {/* Additional Info */}
        <p className="text-xs text-gray-500 mt-6">
          💡 Tip: Save your Order ID for tracking your delivery
        </p>
      </div>
    </div>
  );
}
