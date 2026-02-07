import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ValentineBackground from "../components/ValentineBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

export default function HomePage() {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setShowCart(false);
    navigate("/checkout");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 overflow-hidden font-body">
      {/* Ambient animated background */}
      <ValentineBackground />

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar onCartClick={() => setShowCart(!showCart)} />

        {/* ================= HERO SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
          <Hero />
        </section>

        {/* ================= PRODUCTS SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6 ">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-pink-600">
              Valentine's Bestsellers
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
              Thoughtfully crafted glowing gifts to make your loved one feel special.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ================= WHY KINDLYGIFT ================= */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="glass rounded-3xl p-12 text-center">
            <h3 className="font-heading text-3xl md:text-4xl text-pink-600">
              Why KindlyGift?
            </h3>

            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              At KindlyGift, we believe gifts are not objects — they are emotions.
              Each glowing piece is designed to create warmth, joy, and unforgettable moments.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <p className="text-4xl">🎁</p>
                <h4 className="mt-4 font-semibold text-lg">Premium Quality</h4>
                <p className="mt-2 text-gray-600">
                  Soft silicone, safe LEDs, long-lasting glow.
                </p>
              </div>

              <div>
                <p className="text-4xl">💖</p>
                <h4 className="mt-4 font-semibold text-lg">Made with Love</h4>
                <p className="mt-2 text-gray-600">
                  Designed especially for gifting moments.
                </p>
              </div>

              <div>
                <p className="text-4xl">🚚</p>
                <h4 className="mt-4 font-semibold text-lg">Fast Delivery</h4>
                <p className="mt-2 text-gray-600">
                  Delivered safely to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <Footer />
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <CartDrawer onCheckout={handleCheckout} onClose={() => setShowCart(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
