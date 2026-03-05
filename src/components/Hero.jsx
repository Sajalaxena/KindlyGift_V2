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
    <div className="relative w-full md:h-[80vh] md:min-h-[500px] overflow-hidden bg-gradient-to-b from-pink-50 to-white md:bg-none flex flex-col md:block">
      {/* Background Slider */}
      <div className="relative w-full aspect-video md:aspect-auto md:absolute md:inset-0 md:h-full md:w-full">
        <AnimatePresence>
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-contain md:object-cover"
            alt="Hero Background"
          />
        </AnimatePresence>
      </div>

      {/* Gradient Overlays for Readability (Desktop Only) */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-50/100 via-transparent to-transparent z-10 md:hidden" />

      {/* Hero Content */}
      <div className="relative z-20 w-full md:h-full max-w-7xl mx-auto px-6 py-8 md:py-0 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl w-full p-6 md:p-8 rounded-3xl backdrop-blur-md bg-white/40 md:bg-white/20 border border-white/50 md:border-white/30 shadow-xl md:shadow-2xl mt-[-2rem] md:mt-0 relative z-30"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-pink-500 text-white font-semibold text-sm mb-4 md:mb-6 tracking-wide uppercase shadow-sm">
            Exclusive Collection
          </div>

          <h1 className="text-3xl md:text-6xl font-extrabold text-gray-900 md:text-white leading-tight drop-shadow-sm md:drop-shadow-md">
            Gifts That <br className="hidden md:block" />
            <span className="text-pink-600 md:text-pink-300">Glow With Love</span>.
          </h1>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-700 md:text-white/90 max-w-lg leading-relaxed font-medium md:drop-shadow">
            Discover our premium silicone night lights. The perfect emotional, warm gift to make them smile every night.
          </p>

          <div className="mt-8 flex items-center gap-4">
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
              className="px-6 md:px-8 py-3 md:py-3.5 rounded-full bg-pink-600 md:bg-white text-white md:text-pink-600 outline-none text-base md:text-lg font-bold hover:bg-pink-700 md:hover:bg-pink-50 hover:scale-105 transition-all md:shadow-[0_0_20px_rgba(255,255,255,0.4)] shadow-lg flex items-center gap-2"
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
