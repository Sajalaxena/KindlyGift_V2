import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ onCheckout }) {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed right-0 top-0 h-full w-80 glass p-5 z-50 flex flex-col"
    >
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="bg-white bg-opacity-30 p-3 rounded-lg mb-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-700">₹{item.salePrice}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-bold">{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                  <span className="font-bold">
                    ₹{(item.salePrice * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white border-opacity-30 pt-4 mt-4">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-green-500 text-white py-3 rounded-full font-bold hover:bg-green-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
