export default function ThankYouPage({ orderId, onGoHome }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECD2D0] via-rose-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center border border-[#ECD2D0]/50">
        {/* Success Icon */}
        <div className="text-6xl mb-6 animate-bounce">✨</div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold text-[#B77570] mb-4">Thank You!</h1>
        <p className="text-xl text-gray-700 mb-2">Your order has been placed successfully.</p>

        {/* Order ID */}
        <div className="bg-[#FAF1F1] border-2 border-[#ECD2D0] rounded-2xl p-4 my-6">
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="text-lg font-mono font-bold text-[#B77570] break-all">{orderId}</p>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          We've received your order and will deliver it soon. You'll receive updates on your email and mobile number.
        </p>

        {/* Home Button */}
        <button
          onClick={onGoHome}
          className="w-full bg-[#B77570] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#945854] transition-colors cursor-pointer"
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
