import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/panda4.jpeg",
  "/rabit.jpeg",
  "/panda3.jpeg",
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="glass rounded-3xl p-4"
    >
      <img
        src={images[index]}
        className="rounded-2xl w-full h-80 object-cover"
      />
    </motion.div>
  );
}
