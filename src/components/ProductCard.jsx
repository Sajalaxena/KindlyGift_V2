import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import ImageSlider from "./ImageSlider";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [hearted, setHearted] = useState(false);
  const navigate = useNavigate();

  const getDiscount = (price, salePrice) => {
    if (!price || !salePrice || price <= salePrice) return null;
    return Math.round(((price - salePrice) / price) * 100);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleHeart = (e) => {
    e.stopPropagation();
    setHearted((h) => !h);
  };

  const images = Array.isArray(product.image) ? product.image : [product.image];
  const discount = getDiscount(product.price, product.salePrice);

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(183,117,112,0.18)" }}
      onClick={() => navigate(`/product/${product.id}`)}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative bg-white rounded-3xl overflow-hidden cursor-pointer flex flex-col border border-[#ECD2D0]/60 shadow-md group"
      style={{ boxShadow: "0 4px 16px rgba(183,117,112,0.10)" }}
    >
      {/* ── Discount ribbon ───────────────────────── */}
      {discount !== null && (
        <div
          className="absolute top-3 left-0 z-20 bg-[#B77570] text-white text-[11px] font-extrabold px-3 py-1 rounded-r-full shadow-md tracking-wide"
        >
          {discount}% OFF
        </div>
      )}

      {/* ── Sale badge (top right) ─────────────────── */}
      <div className="absolute top-3 right-10 z-20">
        <span className="text-[10px] font-bold text-[#B77570] bg-[#FDF7F7] border border-[#ECD2D0] px-2 py-0.5 rounded-full shadow-sm offer-glow">
          Sale
        </span>
      </div>

      {/* ── Wishlist heart ────────────────────────── */}
      <button
        onClick={handleHeart}
        className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
        aria-label="Wishlist"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={hearted ? "filled" : "empty"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="text-sm leading-none"
          >
            {hearted ? "❤️" : "🤍"}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* ── Product image ─────────────────────────── */}
      <div className="relative overflow-hidden bg-[#FDF7F7]">
        {images.length > 1 ? (
          <ImageSlider images={images} height="h-56" />
        ) : (
          <img
            src={images[0]}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* ── Card body ─────────────────────────────── */}
      <div className="flex flex-col flex-1 px-4 pb-4 pt-3">
        {/* Name */}
        <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-2 mb-2">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-[#B77570] font-extrabold text-xl leading-none">
            ₹{product.salePrice}
          </span>
          {product.price > product.salePrice && (
            <span className="line-through text-gray-350 text-sm text-gray-400 leading-none mb-0.5">
              ₹{product.price}
            </span>
          )}
        </div>

        {/* Add to Cart button – pushes to bottom */}
        <div className="mt-auto">
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.96 }}
            className={`w-full py-2.5 rounded-2xl font-bold text-sm text-white transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2
              ${isAdded
                ? "bg-[#945854]"
                : "bg-[#B77570] hover:bg-[#945854] hover:shadow-md"
              }`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="flex items-center gap-1.5"
                >
                  ✓ Added to Cart
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-1.5"
                >
                  🛒 Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
