export default function Checkout() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Customer Details</h2>

      <input placeholder="Name" className="input" />
      <input placeholder="Email" className="input" />
      <input placeholder="Address" className="input" />

      <button
        onClick={() => alert("Payment Successful 🎉")}
        className="mt-4 w-full bg-pink-600 text-white py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}
