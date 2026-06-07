"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard2 from "@/components/ProductCard2";
import CartNotification from "@/components/CartNotification";
import { useCart } from "@/context/CartContext";

export default function AccessoriesPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useCart();

  useEffect(() => {
    fetch(`/api/products/accessories`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.length > 0 ? data : generateFallbackProducts());
        setLoading(false);
      })
      .catch(() => {
        setProducts(generateFallbackProducts());
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Nabil PC
          </Link>
          <Link href="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            ? Back to Home
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">PC Accessories</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">Accessories & Peripherals</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Browse keyboards, mice, monitors, stands and all essential PC accessories.
          </p>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading accessories...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {products.slice(0, 5).map((product) => (
              <ProductCard2 key={product._id} product={product} isCompact={true} />
            ))}
          </div>
        )}
      </div>

      {showNotification && <CartNotification />}
    </main>
  );
}

function generateFallbackProducts() {
  return [
    {
      _id: "acc-1",
      title: "Nabil Elite Keyboard",
      description: "Mechanical keyboard with RGB lighting",
      price: 129.99,
      category: "Keyboard",
      image: "https://images.unsplash.com/photo-1587829191301-72e2e119f087?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 156,
    },
    {
      _id: "acc-2",
      title: "Nabil Precision Mouse",
      description: "Ergonomic gaming mouse with adjustable DPI",
      price: 59.99,
      category: "Mouse",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 203,
    },
    {
      _id: "acc-3",
      title: "Nabil 4K Monitor",
      description: "27-inch 4K IPS monitor for professionals",
      price: 449.99,
      category: "Monitor",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 89,
    },
    {
      _id: "acc-4",
      title: "Nabil Monitor Stand",
      description: "Adjustable stand with storage drawer",
      price: 49.99,
      category: "Stand",
      image: "https://images.unsplash.com/photo-1586253408508-37e18c0a70b4?auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      reviews: 124,
    },
    {
      _id: "acc-5",
      title: "Nabil Pro Headset",
      description: "Wireless noise-cancelling headphones",
      price: 199.99,
      category: "Headset",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 178,
    },
  ];
}