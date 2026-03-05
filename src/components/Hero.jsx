import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const images = [
    "/banners/hero1.png",
    "/banners/hero2.png"
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative w-full flex flex-col md:block md:h-[85vh] md:min-h-[500px] bg-gradient-to-b from-pink-50 to-white md:bg-none overflow-hidden">
      {/* Background Slider */}
      <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-auto md:h-full md:absolute md:inset-0">
        <AnimatePresence>
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
            alt="Hero Background"
          />
        </AnimatePresence>

        {/* Gradient Overlays for Readability all sides */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent z-10 md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/100 via-transparent to-transparent z-10 hidden md:block" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 w-full md:h-full max-w-7xl mx-auto px-6 pb-12 pt-0 md:flex md:items-center md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl w-full p-6 md:p-8 rounded-3xl backdrop-blur-md bg-white/70 md:bg-white/20 border border-white/70 md:border-white/30 shadow-xl md:shadow-2xl -mt-16 md:mt-0 relative z-30"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-pink-500 text-white md:bg-pink-500/90 font-semibold text-sm mb-4 md:mb-6 tracking-wide uppercase shadow-sm">
            Exclusive Collection
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 md:text-white leading-tight drop-shadow-sm md:drop-shadow-md">
            Gifts That <br className="hidden md:block" />
            <span className="text-pink-600 md:text-pink-300">Glow With Love</span>.
          </h1>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-800 md:text-white/90 drop-shadow-sm md:drop-shadow max-w-lg leading-relaxed font-medium">
            Discover our premium silicone night lights. The perfect emotional, warm gift to make them smile every night.
          </p>

          <div className="mt-6 md:mt-8 flex items-center gap-4">
            <button
              onClick={() => {
                const isHome = window.location.pathname === '/';
                const el = document.getElementById('products-section');

                if (isHome && el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/products');
                }
              }}
              className="px-6 md:px-8 py-3 md:py-3.5 rounded-full bg-pink-500 md:bg-white text-white md:text-pink-600 outline-none text-base md:text-lg font-bold hover:bg-pink-600 md:hover:bg-pink-50 hover:scale-105 transition-all shadow-lg md:shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-2"
            >
              Shop Collection
              <span className="text-xl">✨</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
