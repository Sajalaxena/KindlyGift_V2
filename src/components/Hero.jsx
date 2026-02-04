import { motion } from "framer-motion";
import ImageSlider from "./ImageSlider";

export default function Hero() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="glass rounded-3xl p-8"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600">
          Valentine’s Day Special 💖
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          Express love with glowing gifts that stay forever in memories.
        </p>

        <p className="mt-3 text-xl font-bold text-rose-600">
          Flat 50% OFF – Limited Time Only!
        </p>

        <button className="mt-6 px-8 py-3 rounded-full bg-pink-600 text-white text-lg font-semibold hover:scale-105 transition">
          Shop Now
        </button>
      </motion.div>

      {/* Right */}
      <ImageSlider />
    </section>
  );
}
