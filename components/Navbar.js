"use client";

import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
            Nabil PC
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/prebuilt" className="hover:text-indigo-600 transition">Prebuilt Units</Link>
            <Link href="/custom-built" className="hover:text-indigo-600 transition">Custom Builder</Link>
            <Link href="/pc-accessories" className="hover:text-indigo-600 transition">Components</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4 w-full max-w-md justify-end">
          <div className="w-full max-w-xs hidden sm:block">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white ring-2 ring-white animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}