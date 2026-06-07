"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.slice(0, 5));
          setShowResults(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative flex-1">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </form>

      {showResults && (results.length > 0 || loading) && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-slate-200 bg-white shadow-lg z-50">
          {loading ? (
            <div className="p-4 text-sm text-slate-500">Searching...</div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {results.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  onClick={() => {
                    setQuery("");
                    setShowResults(false);
                  }}
                  className="flex items-center gap-3 border-b border-slate-100 p-3 last:border-b-0 hover:bg-slate-50"
                >
                  <img
                    src={Array.isArray(product.image) ? product.image[0] : product.image}
                    alt={product.title}
                    className="h-10 w-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-1 text-sm font-semibold text-slate-900">{product.title}</p>
                    <p className="text-xs text-indigo-600 font-bold">${product.price?.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
