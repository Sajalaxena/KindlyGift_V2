import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ImageSlider({ images = [], height = "h-80", showThumbnails = false }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images && images.length > 1) {
      const id = setInterval(
        () => setIndex((i) => (i + 1) % images.length),
        3000
      );
      return () => clearInterval(id);
    }
  }, [images?.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-4"
      >
        <img
          src={images[index]}
          alt="Product view"
          className={`rounded-2xl w-full ${height} object-cover`}
        />
      </motion.div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 0 && (
        <div className="flex flex-wrap gap-2 px-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${index === i
                ? "border-pink-500 scale-105 shadow-md"
                : "border-transparent opacity-60 hover:opacity-100"
                }`}
            >
              <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
