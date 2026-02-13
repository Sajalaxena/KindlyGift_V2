import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductsPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Get all categories
  const categories = useMemo(() => {
    const cats = products.map(p => p.categoryName);
    return ["All", ...cats];
  }, []);

  // Flatten all products
  const allProducts = useMemo(() => {
    return products.flatMap(cat => cat.products);
  }, []);

  // Filtered products
  const filteredProducts = useMemo(() => {
    let prods = selectedCategory === "All"
      ? allProducts
      : products.find(cat => cat.categoryName === selectedCategory)?.products || [];

    if (searchQuery) {
      prods = prods.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return prods;
  }, [selectedCategory, searchQuery, allProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">

          {/* Category Pills (Left) - Scrollable on small screens */}
          <div className="overflow-x-auto pb-2 -mb-2 no-scrollbar">
            <div className="flex flex-nowrap lg:flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 text-sm rounded-full font-medium transition-all whitespace-nowrap border capitalize ${selectedCategory === cat
                      ? "bg-pink-600 text-white border-pink-600 shadow-lg shadow-pink-200 scale-105"
                      : "bg-white/60 backdrop-blur-sm text-gray-600 border-pink-100 hover:border-pink-300 hover:text-pink-600"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar (Right) */}
          <div className="relative w-full lg:w-80 group">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 text-sm rounded-full border-2 border-pink-200 bg-white/80 focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all shadow-sm group-hover:shadow-md"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl grayscale opacity-50 group-focus-within:grayscale-0 group-focus-within:opacity-100 transition-all">
              🔍
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/product/${product.id}`)}
              className="glass rounded-3xl p-4 cursor-pointer"
            >
              <img
                src={Array.isArray(product.image) ? product.image[0] : product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="line-through text-gray-500">₹{product.price}</span>
                <span className="text-pink-600 font-bold text-xl">₹{product.salePrice}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="w-full py-2 rounded-full bg-pink-600 text-white font-bold hover:bg-pink-700 transition"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}