export default function QuantityControl({ qty, setQty }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setQty(Math.max(1, qty - 1))}
        className="px-3 py-1 rounded-full glass cursor-pointer"
      >
        −
      </button>

      <span className="font-semibold">{qty}</span>

      <button
        onClick={() => setQty(qty + 1)}
        className="px-3 py-1 rounded-full glass cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
