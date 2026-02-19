import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden font-body">
      {/* Foreground content */}
      <div className="relative z-10">

        {/* ================= HERO SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
          <Hero />
        </section>

        {/* ================= PRODUCTS SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6 ">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-[#d65a8d]">
              Women's Day Bestsellers
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
              Thoughtfully crafted glowing gifts to make her feel special.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {products.flatMap(cat => cat.products).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Spacer instead of button */}
          <div className="mt-16"></div>
        </section>

        {/* ================= WHY KINDLYGIFT ================= */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="glass rounded-3xl p-12 text-center">
            <h3 className="font-heading text-3xl md:text-4xl text-[#d65a8d]">
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

      </div>
    </div>
  );
}
