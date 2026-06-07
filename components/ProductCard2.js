"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, isCompact = false }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  const images = Array.isArray(product.image)
    ? product.image
    : product.image
      ? [product.image]
      : ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"];

  const handlePrevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const rating = product.rating || 4.5;
  const reviews = product.reviews || Math.floor(Math.random() * 200) + 10;

  if (isCompact) {
    return (
      <Link href={`/product/${product._id}`}>
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-1">
          <div className="relative h-40 w-full overflow-hidden bg-slate-100">
            <img
              src={images[0]}
              alt={product.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
            />
            {images.length > 1 && (
              <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                +{images.length - 1}
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="line-clamp-1 text-sm font-semibold text-slate-900">{product.title}</h3>
            <p className="line-clamp-1 text-xs text-slate-600">{product.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-indigo-600">${product.price?.toFixed(2)}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-amber-500">★ {rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-2">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={images[currentImageIndex]}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500"
        />

        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 transition group-hover:opacity-100">
            <button
              onClick={handlePrevImage}
              className="rounded-full bg-white/90 p-2 shadow-md hover:bg-white"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={handleNextImage}
              className="rounded-full bg-white/90 p-2 shadow-md hover:bg-white"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex gap-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-2 flex-1 rounded-full transition ${
                idx === currentImageIndex ? "bg-indigo-600" : "bg-white/50"
              }`}
              aria-label={`Image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description}</p>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-amber-500">★ {rating.toFixed(1)}</span>
            <span className="text-xs text-slate-500">({reviews} reviews)</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-slate-900">${product.price?.toFixed(2)}</span>
          {product.category && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
              {product.category}
            </span>
          )}
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 rounded-full border border-indigo-600 bg-white px-4 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Add to Cart
          </button>
          <Link
            href={`/product/${product._id}`}
            className="flex-1 rounded-full bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
