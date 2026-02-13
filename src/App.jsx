import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ValentineBackground from "./components/ValentineBackground";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";

  const handleCheckout = () => {
    setShowCart(false);
    navigate("/checkout");
  };

  return (
    <div className="relative min-h-screen">
      {/* Ambient animated background */}
      <ValentineBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {!isCheckoutPage && <Navbar onCartClick={() => setShowCart(!showCart)} />}

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>

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
