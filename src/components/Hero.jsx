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
    <div className="relative w-full overflow-hidden bg-pink-50">
      <div className="flex flex-col md:flex-row w-full max-w-[1600px] mx-auto items-stretch">

        {/* Banner / Image (Right Side on Desktop, Top on Mobile) */}
        <div className="order-1 md:order-2 w-full md:w-1/2 relative min-h-[45vh] sm:min-h-[50vh] md:min-h-[75vh]">
          <AnimatePresence>
            <motion.img
              key={index}
              src={images[index]}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt="Hero Background"
            />
          </AnimatePresence>
          {/* Subtle gradient to blend the flat edge on desktop */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-pink-50 to-transparent z-10 hidden md:block" />
          {/* Subtle gradient to blend bottom edge on mobile */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-pink-50 to-transparent z-10 md:hidden" />
        </div>

        {/* Hero Content (Left Side on Desktop, Bottom on Mobile) */}
        <div className="order-2 md:order-1 w-full md:w-1/2 relative z-20 flex items-center justify-center p-6 pb-12 pt-0 md:p-12 lg:p-20 font-body">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-lg bg-white/95 md:bg-transparent rounded-3xl p-6 md:p-0 border border-pink-100 md:border-none shadow-xl md:shadow-none mt-[-4rem] md:mt-0 relative z-30"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#f83a8b] text-white font-bold text-xs mb-4 md:mb-6 tracking-wide uppercase shadow-sm">
              Exclusive Collection
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 leading-tight drop-shadow-sm">
              Gifts That <br className="hidden lg:block" /> <span className="text-[#f83a8b]">Glow With Love</span>.
            </h1>

            <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-lg leading-relaxed font-medium">
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
                className="px-6 md:px-8 py-3 md:py-3.5 rounded-full bg-[#f83a8b] text-white outline-none font-bold text-base md:text-lg hover:-translate-y-1 transition-all shadow-lg md:shadow-[0_4px_14px_0_rgba(248,58,139,0.39)] hover:shadow-[0_6px_20px_rgba(248,58,139,0.23)] flex items-center gap-2"
              >
                Shop Collection
                <span className="text-xl">✨</span>
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
