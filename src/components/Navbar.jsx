import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function Navbar({ onCartClick }) {
  const { cart } = useCart();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-4 z-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="
          glass 
          rounded-2xl 
          px-6 
          h-16 
          flex 
          items-center 
          justify-between
          shadow-[0_20px_40px_rgba(255,20,147,0.25)]
        ">
          
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer">
            {/* <div className="
              w-10 h-10 
              rounded-full 
              bg-gradient-to-br 
              from-pink-500 
              to-rose-400 
              flex items-center justify-center 
              text-white 
              font-bold
              shadow-lg
            "> */}
              <img src="/Kindly_gift.png" alt="KindlyGift" width={40} height={40} className="rounded-full"/>
            {/* </div> */}

            <span className="font-heading text-2xl text-pink-600">
              KindlyGift
            </span>
          </div>

          {/* Cart */}
          <button 
            onClick={onCartClick}
            className="
            relative 
            px-6 
            py-2 
            rounded-full 
            bg-gradient-to-r 
            from-pink-500 
            to-rose-500 
            text-white 
            font-medium 
            shadow-lg
            hover:scale-105 
            transition
            cursor-pointer
          ">
            🛒 Cart
            {cart.length > 0 && (
              <span className="
                absolute 
                -top-2 
                -right-2 
                w-5 
                h-5 
                rounded-full 
                bg-black 
                text-xs 
                flex 
                items-center 
                justify-center
              ">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
