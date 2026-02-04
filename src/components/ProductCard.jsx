import { motion } from "framer-motion";
import { useState } from "react";
import QuantityControl from "./QuantityControl";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass rounded-3xl shadow-xl overflow-hidden p-4"
    >
      <img
        src={product.image}
        className="w-full h-56 object-cover rounded-2xl"
      />

      <h3 className="mt-4 font-bold text-lg">{product.name}</h3>

      <div className="flex items-center gap-3 mt-2">
        <span className="line-through text-gray-500">₹{product.price}</span>
        <span className="text-pink-600 font-bold text-xl">
          ₹{product.salePrice}
        </span>
      </div>

      <span className="text-sm text-white px-3 py-1 rounded-full bg-pink-500 inline-block mt-2 offer-glow">
        Valentine Offer
      </span>

      <div className="flex justify-between items-center mt-4">
        <QuantityControl qty={qty} setQty={setQty} />

        <button
          onClick={() => addToCart(product, qty)}
          className="px-6 py-2 rounded-full bg-pink-600 text-white"
        >
          Add
        </button>
      </div>
    </motion.div>
  );
}
