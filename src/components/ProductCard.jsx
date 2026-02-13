import { motion } from "framer-motion";
import { useState } from "react";
import QuantityControl from "./QuantityControl";
import { useCart } from "../context/CartContext";
import ImageSlider from "./ImageSlider";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const images = Array.isArray(product.image) ? product.image : [product.image];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass rounded-3xl shadow-xl overflow-hidden p-4"
    >
      {images.length > 1 ? (
        <ImageSlider images={images} height="h-56" />
      ) : (
        <img
          src={images[0]}
          className="w-full h-56 object-cover rounded-2xl"
        />
      )}

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

      <button
        onClick={handleAddToCart}
        className={`w-full mt-4 py-2 rounded-full font-bold text-white transition-all cursor-pointer ${
          isAdded
            ? "bg-green-500"
            : "bg-pink-600 hover:bg-pink-700"
        }`}
      >
        {isAdded ? "✓ Added to Cart" : "+ Add to Cart"}
      </button>
    </motion.div>
  );
}
