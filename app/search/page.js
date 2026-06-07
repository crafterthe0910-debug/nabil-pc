"use client";

import { useState, useEffect } from "react";
import ProductCard2 from "@/components/ProductCard2";

export default function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }

    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      });
  }, [query]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="mt-2 text-slate-600">
          {loading ? "Searching..." : `Found ${results.length} product${results.length !== 1 ? "s" : ""} for "${query}"`}
        </p>

        {!loading && results.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard2 key={product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-slate-600">No products found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
