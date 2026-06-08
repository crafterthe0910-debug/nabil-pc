"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import ProductCard2 from "@/components/ProductCard2";
import { useCart } from "@/context/CartContext";

export default function SearchPage({ searchParams: searchParamsPromise }) {
  // Safe Next.js 15+ execution unwrapping using React 19 use API
  const searchParams = use(searchParamsPromise);
  const query = searchParams?.q || "";
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useCart();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    const controller = new AbortController();

    fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Search execution failed");
        return res.json();
      })
      .then((data) => {
        setResults(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [query]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
        <p className="mt-2 text-sm text-slate-600">
          {loading
            ? "Executing catalog query..."
            : `Returned ${results.length} item${results.length !== 1 ? "s" : ""} matching "${query}"`}
        </p>

        {!loading && results.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard2 key={product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && results.length === 0 && query && (
          <div className="mt-12 text-center rounded-3xl border border-dashed border-slate-300 p-12 bg-white">
            <p className="text-slate-500">No stock configurations found matching your search term.</p>
            <Link href="/" className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              Return to central catalog &rarr;
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}