import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ImageSlider from "../components/ImageSlider";
import { Helmet } from "react-helmet-async";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Calculate discount percentage
  const getDiscountPercentage = (price, salePrice) => {
    if (!price || !salePrice || price <= salePrice) return null;
    return Math.round(((price - salePrice) / price) * 100);
  };

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
  const discount = getDiscountPercentage(product.price, product.salePrice);
  const title = `${product.name} | KindlyGift`;
  const description = product.description || `Buy ${product.name} online. Find the perfect customized gifts and premium hampers for your loved ones at KindlyGift.in.`;

  return (
    <div className="p-6">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={images[0]} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-white rounded-full text-[#B77570] font-semibold hover:bg-[#FAF1F1] transition shadow-sm border border-[#ECD2D0]"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-8 font-body">
          {/* Images */}
          <div className="w-full">
            <ImageSlider images={images} height="h-96" showThumbnails={true} />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Title - optimized for mobile to stay on one line where possible */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#B77570] mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center flex-wrap gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.salePrice}
              </span>
              <span className="line-through text-gray-500 text-xl font-light">
                ₹{product.price}
              </span>
              {discount !== null && (
                <span className="text-green-600 border border-green-600 bg-green-50 font-bold px-2 py-1 rounded text-xs tracking-wide shadow-sm">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Tabbed information section: Description / Product Info / More Info */}
            <div className="mb-8">
              {/* Tabs header */}
              <div className="border-b border-[#FAF1F1]">
                <div className="flex gap-6 text-sm sm:text-base">
                  <button
                    type="button"
                    onClick={() => setActiveTab("description")}
                    className={`pb-2 transition-all ${activeTab === "description"
                      ? "border-b-2 border-[#B77570] text-[#B77570] font-bold"
                      : "border-b-2 border-transparent text-gray-400 hover:text-gray-600"
                      }`}
                  >
                    Description
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("info")}
                    className={`pb-2 transition-all ${activeTab === "info"
                      ? "border-b-2 border-[#B77570] text-[#B77570] font-bold"
                      : "border-b-2 border-transparent text-gray-400 hover:text-gray-600"
                      }`}
                  >
                    Product Info
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("more")}
                    className={`pb-2 transition-all ${activeTab === "more"
                      ? "border-b-2 border-[#B77570] text-[#B77570] font-bold"
                      : "border-b-2 border-transparent text-gray-400 hover:text-gray-600"
                      }`}
                  >
                    More Info
                  </button>
                </div>
              </div>

              {/* Tabs content */}
              <div className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed font-body">
                {activeTab === "description" && (
                  <p>
                    {product.description ||
                      `A perfect gift to express your love. This adorable ${product.name.toLowerCase()} will light up their day!`}
                  </p>
                )}

                {activeTab === "info" && (
                  <dl className="space-y-3">
                    <div className="flex gap-4">
                      <dt className="w-24 text-gray-400 font-medium">Name</dt>
                      <dd className="flex-1 text-gray-800 font-semibold">{product.name}</dd>
                    </div>
                    {product.material && (
                      <div className="flex gap-4">
                        <dt className="w-24 text-gray-400 font-medium">Material</dt>
                        <dd className="flex-1 text-gray-800 font-semibold">{product.material}</dd>
                      </div>
                    )}
                    <div className="flex gap-4">
                      <dt className="w-24 text-gray-400 font-medium">Price</dt>
                      <dd className="flex-1 text-gray-800 font-semibold">
                        ₹{product.salePrice}{" "}
                        <span className="line-through text-gray-400 ml-1 text-xs font-normal">
                          ₹{product.price}
                        </span>
                      </dd>
                    </div>
                    <div className="flex gap-4">
                      <dt className="w-24 text-gray-400 font-medium">Status</dt>
                      <dd className={`flex-1 font-bold ${product.isOutOfStock ? "text-red-500" : "text-green-600"}`}>
                        {product.isOutOfStock ? "Out of stock" : "In stock"}
                      </dd>
                    </div>
                  </dl>
                )}

                {activeTab === "more" && (
                  <div className="bg-[#FAF1F1]/30 p-4 rounded-2xl border border-[#ECD2D0]/40">
                    <h3 className="font-bold text-[#B77570] mb-2 flex items-center gap-2">
                      <span>🚚</span> Delivery Info
                    </h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                      <li>Delivered product might vary slightly from the image.</li>
                      <li>Perishable item: only one delivery attempt.</li>
                      <li>Cannot be redirected to any other address.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full md:w-3/4 py-4 rounded-full font-bold text-white text-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${isAdded
                ? "bg-[#945854]"
                : "bg-[#B77570] hover:bg-[#945854] hover:shadow-lg"
                }`}
            >
              {isAdded ? "✓ Added to Cart" : "🛍️ Add to Cart"}
            </button>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 max-w-4xl mx-auto font-body">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b border-[#FAF1F1] pb-4 flex items-center gap-2">
            <span>✨</span> Customer Reviews
          </h2>

          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="bg-white border border-[#ECD2D0]/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FAF1F1] flex items-center justify-center text-[#B77570] font-bold text-lg border border-[#ECD2D0]/30 shadow-inner">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 leading-none mb-1">{review.user}</h4>
                        <div className="flex items-center">
                          {review.verified && (
                            <span className="text-[9px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full font-extrabold uppercase tracking-tight border border-green-200">
                              ✓ Verified Buyer
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm tracking-tighter">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-body">
                    "{review.comment}"
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-[#FAF1F1]/50 rounded-3xl border border-dashed border-[#ECD2D0] flex flex-col items-center gap-3">
                <span className="text-3xl">💝</span>
                <p className="text-gray-500 font-medium">Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}