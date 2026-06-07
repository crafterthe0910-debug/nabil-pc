"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductCard2 from "@/components/ProductCard2";

export default function ProductPage({ params: paramsPromise }) {
  const { id } = use(paramsPromise);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    Promise.all([
      fetch(`/api/products/detail/${id}`).then((r) => r.json()),
    ]).then(([productData]) => {
      setProduct(productData);
      setLoading(false);

      if (productData.category) {
        fetch(`/api/products/${productData.category}`)
          .then((r) => r.json())
          .then((data) =>
            setSimilarProducts(
              data
                .filter((p) => p._id !== id)
                .slice(0, 4)
            )
          );
      }
    });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-slate-600">Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-red-600">Product not found</p>
          <Link href="/" className="mt-4 text-indigo-600 hover:text-indigo-700">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const images = Array.isArray(product.image)
    ? product.image
    : product.image
      ? [product.image]
      : ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"];

  const rating = product.rating || 4.5;
  const reviews = product.reviews || Math.floor(Math.random() * 200) + 10;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Link href="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 mb-6 inline-block">
          ← Back to Home
        </Link>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="sticky top-10 rounded-3xl border border-slate-200 bg-slate-100 overflow-hidden">
                  <img
                    src={images[currentImageIndex]}
                    alt={product.title}
                    className="h-96 w-full object-cover"
                  />

                  {images.length > 1 && (
                    <div className="flex gap-2 p-4">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`h-16 w-16 rounded-lg border-2 overflow-hidden transition ${
                            idx === currentImageIndex ? "border-indigo-600" : "border-slate-300"
                          }`}
                        >
                          <img src={img} alt={`View ${idx + 1}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">{product.category}</p>
                  <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.title}</h1>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-amber-500">★ {rating.toFixed(1)}</span>
                      <span className="text-sm text-slate-500">({reviews} customer reviews)</span>
                    </div>
                  </div>

                  <p className="mt-6 text-2xl font-bold text-slate-900">${product.price?.toFixed(2)}</p>

                  <p className="mt-6 leading-7 text-slate-600">{product.description}</p>

                  {product.specifications && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-slate-900">Specifications</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <li key={key} className="flex gap-2">
                            <span className="font-semibold text-slate-900">{key}:</span>
                            <span>{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-semibold">Quantity:</label>
                    <div className="flex items-center gap-3 border border-slate-300 rounded-full px-4 py-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="font-bold text-slate-600 hover:text-slate-900"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="font-bold text-slate-600 hover:text-slate-900"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="rounded-full border border-indigo-600 bg-white px-6 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
                    >
                      Add to Cart
                    </button>
                    <button className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
                      Buy Now
                    </button>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600">✓ Free shipping on orders over $50</p>
                    <p className="mt-2 text-xs font-semibold text-slate-600">✓ 30-day money-back guarantee</p>
                    <p className="mt-2 text-xs font-semibold text-slate-600">✓ 2-year warranty included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sticky top-10">
              <h3 className="text-lg font-semibold text-slate-900">Similar Products</h3>

              {similarProducts.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {similarProducts.map((prod) => (
                    <Link
                      key={prod._id}
                      href={`/product/${prod._id}`}
                      className="block rounded-2xl border border-slate-200 bg-slate-50 p-3 hover:border-indigo-400 hover:bg-white transition"
                    >
                      <img
                        src={Array.isArray(prod.image) ? prod.image[0] : prod.image}
                        alt={prod.title}
                        className="h-24 w-full rounded-lg object-cover"
                      />
                      <p className="mt-2 line-clamp-2 text-sm font-semibold text-slate-900">{prod.title}</p>
                      <p className="mt-1 text-sm font-bold text-indigo-600">${prod.price?.toFixed(2)}</p>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="text-xs font-semibold text-amber-500">★ {(prod.rating || 4.5).toFixed(1)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">No similar products available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
