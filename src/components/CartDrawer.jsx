import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ onCheckout, onClose }) {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  
  const deliveryCharge = total < 999 ? 49 : 0;
  const grandTotal = total + deliveryCharge;

  return (
    <>
      {/* Backdrop - clicking closes drawer if onClose provided */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-opacity-100 z-40"
        onClick={onClose}
      />

      <motion.aside
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl p-6 flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{cart.length} items</span>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="text-2xl text-gray-500 hover:text-gray-700 p-1 rounded-md cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded" />
                  )}

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Per unit: ₹{item.salePrice}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-pink-600 hover:text-pink-700 text-lg cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.qty - 1))}
                          className="w-8 h-8 bg-gray-200 rounded text-gray-700 flex items-center justify-center cursor-pointer"
                        >
                          −
                        </button>
                        <div className="px-3 font-semibold">{item.qty}</div>
                        <button
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          className="w-8 h-8 bg-gray-200 rounded text-gray-700 flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right font-bold text-gray-800">₹{(item.salePrice * item.qty).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Subtotal</p>
                  <p className="text-lg font-bold text-gray-800">₹{total.toFixed(2)}</p>
                </div>
                {deliveryCharge > 0 && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Delivery</p>
                    <p className="text-lg font-bold text-gray-800">₹{deliveryCharge}</p>
                  </div>
                )}
              </div>

              {deliveryCharge === 0 && (
                <p className="text-xs text-green-600 mb-4 text-center">Free delivery on orders above ₹999</p>
              )}

              <div className="mb-4 bg-pink-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">Total:</p>
                  <p className="text-2xl font-bold text-pink-600">₹{grandTotal.toFixed(2)}</p>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition-colors cursor-pointer"
              >
                Checkout
              </button>

              <button
                onClick={onClose}
                className="w-full mt-3 bg-white border border-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-50 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </motion.aside>
    </>
  );
}
