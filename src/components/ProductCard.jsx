import { motion } from "framer-motion";
import { useState } from "react";

import { useCart } from "../context/CartContext";
import ImageSlider from "./ImageSlider";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const images = Array.isArray(product.image) ? product.image : [product.image];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="glass rounded-3xl shadow-xl overflow-hidden p-4 border border-gray-200/20 cursor-pointer flex flex-col"
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
        <span className="text-[#d65a8d] font-bold text-xl">
          ₹{product.salePrice}
        </span>
      </div>

      <div className="mt-2">
        <span className="text-sm text-[#d65a8d] font-bold px-3 py-1 rounded-full bg-[#ffc8dd] inline-block offer-glow">
          Women's Day Special
        </span>
      </div>

      <button
        onClick={handleAddToCart}
        className={`w-full mt-4 py-3 rounded-full font-bold text-white transition-all cursor-pointer shadow-md ${isAdded ? "bg-green-500" : "bg-[#d65a8d] hover:bg-[#b03a6b] hover:shadow-lg"
          }`}
      >
        {isAdded ? "✓ Added to Cart" : "+ Add to Cart"}
      </button>
    </motion.div>
  );
}
