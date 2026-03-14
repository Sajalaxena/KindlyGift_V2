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
          className="mb-6 px-4 py-2 bg-white rounded-full text-baby-pink-600 font-semibold hover:bg-baby-pink-100 transition"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-8">
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
              <span className="line-through text-gray-500 text-xl">
                ₹{product.price}
              </span>
              {discount !== null && (
                <span className="text-green-600 border border-green-600 bg-green-50 font-semibold px-2 py-1 rounded text-sm tracking-wide">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Tabbed information section: Description / Product Info / More Info */}
            <div className="mb-8">
              {/* Tabs header */}
              <div className="border-b border-gray-200">
                <div className="flex gap-6 text-sm sm:text-base">
                  <button
                    type="button"
                    onClick={() => setActiveTab("description")}
                    className={`pb-2 transition-colors ${activeTab === "description"
                      ? "border-b-2 border-gray-900 text-gray-900 font-semibold"
                      : "border-b-2 border-transparent text-gray-500"
                      }`}
                  >
                    Description
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("info")}
                    className={`pb-2 transition-colors ${activeTab === "info"
                      ? "border-b-2 border-gray-900 text-gray-900 font-semibold"
                      : "border-b-2 border-transparent text-gray-500"
                      }`}
                  >
                    Product Info
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("more")}
                    className={`pb-2 transition-colors ${activeTab === "more"
                      ? "border-b-2 border-gray-900 text-gray-900 font-semibold"
                      : "border-b-2 border-transparent text-gray-500"
                      }`}
                  >
                    More Info
                  </button>
                </div>
              </div>

              {/* Tabs content */}
              <div className="mt-4 text-sm sm:text-base text-gray-700">
                {activeTab === "description" && (
                  <p className="leading-relaxed">
                    {product.description ||
                      `A perfect gift to express your love. This adorable ${product.name.toLowerCase()} will light up their day!`}
                  </p>
                )}

                {activeTab === "info" && (
                  <dl className="space-y-2">
                    <div className="flex gap-4">
                      <dt className="w-28 text-gray-500">Name</dt>
                      <dd className="flex-1 text-gray-800">{product.name}</dd>
                    </div>
                    {product.material && (
                      <div className="flex gap-4">
                        <dt className="w-28 text-gray-500">Material</dt>
                        <dd className="flex-1 text-gray-800">{product.material}</dd>
                      </div>
                    )}
                    <div className="flex gap-4">
                      <dt className="w-28 text-gray-500">Price</dt>
                      <dd className="flex-1 text-gray-800">
                        ₹{product.salePrice}{" "}
                        <span className="line-through text-gray-400 ml-1 text-sm">
                          ₹{product.price}
                        </span>
                        {discount !== null && (
                          <span className="ml-2 text-xs font-semibold text-green-600">
                            ({discount}% OFF)
                          </span>
                        )}
                      </dd>
                    </div>
                    <div className="flex gap-4">
                      <dt className="w-28 text-gray-500">Availability</dt>
                      <dd className="flex-1 text-gray-800">
                        {product.isOutOfStock ? "Out of stock" : "In stock"}
                      </dd>
                    </div>
                  </dl>
                )}

                {activeTab === "more" && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Delivery Info</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Delivered product might vary slightly from the image shown.</li>
                      <li>
                        This product is perishable therefore delivery will be attempted only once.
                      </li>
                      <li>The delivery cannot be redirected to any other address.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full md:w-3/4 py-3 rounded-full font-bold text-white text-lg transition ${isAdded
                ? "bg-green-500"
                : "bg-baby-pink-600 hover:bg-baby-pink-700"
                }`}
            >
              {isAdded ? "✓ Added to Cart" : "+ Add to Cart"}
            </button>
          </div>
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Customer Reviews</h2>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-baby-pink-100 flex items-center justify-center text-baby-pink-700 font-bold text-lg">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sneha K.</h4>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-lg">
                  ★★★★★
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Absolutely in love with this! The silicone is so soft and squishy, and the light is perfectly warm for a bedside table. Fast delivery to Mumbai too. Highly recommended for gifting!"
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                    R
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Rahul M.</h4>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-lg">
                  ★★★★★
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Bought this as a Valentine's gift for my girlfriend and she hasn't stopped talking about it. The battery lasts surprisingly long. Great packaging and premium feel."
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ananya D.</h4>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-lg">
                  ★★★★☆
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Very cute product. Looks exactly like the pictures on the site. Lost one star only because the delivery was delayed by a day in Bangalore, but the customer support team was very helpful. Worth the money!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}