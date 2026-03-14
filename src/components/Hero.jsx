import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "/banners/hero1.png",
    label: "Exclusive Collection",
    heading: "Sweet",
    headingAccent: "Beginnings.",
    sub: "Handpicked gifts that warm hearts and create memories.",
    cta: "Shop Now",
  },
  {
    image: "/banners/hero2.png",
    label: "Premium Gifting",
    heading: "Give the",
    headingAccent: "Perfect Gift.",
    sub: "Curated gift boxes for every special moment.",
    cta: "Explore Gifts",
  },
  {
    image: "/banners/hero3.png",
    label: "Night Light Collection",
    heading: "Glow With",
    headingAccent: "Love.",
    sub: "Magical silicone night lights — the gift that glows every night.",
    cta: "Shop Lights",
  },
];

export default function Hero() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  const handleCta = () => {
    const isHome = window.location.pathname === "/";
    const el = document.getElementById("products-section");
    if (isHome && el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/5", minHeight: "220px" }}>

      {/* Background Banner Images */}
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.image}
            alt={slide.heading}
            className="w-full h-full object-cover object-center"
          />
          {/* Left gradient overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text Overlay — top-left */}
      <div className="absolute inset-0 flex items-center">
        <motion.div
          key={`text-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="pl-[5%] sm:pl-[7%] md:pl-[8%] max-w-[55%] sm:max-w-[48%] md:max-w-[42%]"
        >
          {/* Badge */}
          <span className="inline-block px-3 py-1 rounded-full bg-[#B77570] text-white font-bold text-[10px] sm:text-xs mb-3 tracking-widest uppercase shadow-sm">
            {slide.label}
          </span>

          {/* Heading */}
          <h1 className="font-heading font-extrabold leading-tight text-gray-800 text-xl sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-sm">
            {slide.heading}{" "}
            <span className="text-[#B77570]">{slide.headingAccent}</span>
          </h1>

          {/* Sub */}
          <p className="mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xs hidden sm:block">
            {slide.sub}
          </p>

          {/* CTA Button */}
          <button
            onClick={handleCta}
            className="mt-4 sm:mt-5 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-[#B77570] text-white font-bold text-sm sm:text-base hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg hover:bg-[#945854] cursor-pointer"
          >
            {slide.cta}
          </button>
        </motion.div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${i === index
              ? "w-6 h-2 bg-[#B77570]"
              : "w-2 h-2 bg-[#B77570]/40"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
