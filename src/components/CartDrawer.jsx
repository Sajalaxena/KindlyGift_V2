import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ onCheckout }) {
  const { cart, removeFromCart, total } = useCart();

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed right-0 top-0 h-full w-80 glass p-5 z-50"
    >
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 && (
        <p className="text-gray-600">Cart is empty</p>
      )}

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-3">
          <span>{item.name} × {item.qty}</span>
          <button onClick={() => removeFromCart(item.id)}>❌</button>
        </div>
      ))}

      <p className="font-bold mt-6">Total: ₹{total}</p>

      <button
        onClick={onCheckout}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-full"
      >
        Checkout
      </button>
    </motion.div>
  );
}
