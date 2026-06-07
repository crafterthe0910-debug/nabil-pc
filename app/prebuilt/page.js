"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard2 from "@/components/ProductCard2";
import CartNotification from "@/components/CartNotification";
import { useCart } from "@/context/CartContext";

export default function PrebuiltPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useCart();

  useEffect(() => {
    fetch(`/api/products/prebuilt`)
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Pre-built</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">Ready-made PCs</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Browse our selection of fully configured pre-built systems, tested and ready to ship.
          </p>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading products...</p>
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
      _id: "prebuilt-1",
      title: "Nabil Pro Gamer PC",
      description: "High-performance gaming desktop with RTX 4080 graphics",
      price: 1899.99,
      category: "Pre-built",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 145,
    },
    {
      _id: "prebuilt-2",
      title: "Nabil Office Tower",
      description: "Reliable work PC for productivity and everyday use",
      price: 999.0,
      category: "Pre-built",
      image: "https://images.unsplash.com/photo-1517801541368-2f390a3341f7?auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      reviews: 98,
    },
    {
      _id: "prebuilt-3",
      title: "Nabil Creator Workstation",
      description: "Powerful content creation PC with multitasking",
      price: 2299.0,
      category: "Pre-built",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 203,
    },
    {
      _id: "prebuilt-4",
      title: "Nabil Streamer Pro",
      description: "Optimized for streaming with dual graphics",
      price: 2499.99,
      category: "Pre-built",
      image: "https://images.unsplash.com/photo-1552308995-5658671fda5d?auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 112,
    },
    {
      _id: "prebuilt-5",
      title: "Nabil Mini Compact",
      description: "Space-saving compact PC for small desks",
      price: 749.99,
      category: "Pre-built",
      image: "https://images.unsplash.com/photo-1587829191301-72e2e119f087?auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      reviews: 67,
    },
  ];
}