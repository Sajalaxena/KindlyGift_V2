import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ImageSlider from "../components/ImageSlider";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Find the product
  const product = products.flatMap(cat => cat.products).find(p => p.id === id);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const images = Array.isArray(product.image) ? product.image : [product.image];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-white rounded-full text-pink-600 font-semibold hover:bg-pink-100 transition"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="w-full">
            <ImageSlider images={images} height="h-96" showThumbnails={true} />
          </div>

          {/* Details */}
          <div className="glass rounded-3xl p-8">
            <h1 className="text-3xl font-bold text-pink-600 mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="line-through text-gray-500 text-xl">₹{product.price}</span>
              <span className="text-pink-600 font-bold text-3xl">₹{product.salePrice}</span>
            </div>

            <p className="text-gray-700 mb-6">
              {product.description || `A perfect Valentine's gift to express your love. This adorable ${product.name.toLowerCase()} will light up their day!`}
            </p>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-full font-bold text-white text-lg transition ${isAdded
                ? "bg-green-500"
                : "bg-pink-600 hover:bg-pink-700"
                }`}
            >
              {isAdded ? "✓ Added to Cart" : "+ Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}