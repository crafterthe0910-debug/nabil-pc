"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useCart } from "@/context/CartContext";
import CartNotification from "@/components/CartNotification";
import ProductCard from "@/components/ProductCard2";

export default function Home() {
  const { cart, showNotification } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (mounted && Array.isArray(data)) setProducts(data);
      })
      .catch((err) => console.error("Failed to load products", err));
    return () => (mounted = false);
  }, []);

  const accessories = products.filter((p) => (p.category || "").toLowerCase().includes("access"));
  const prebuilt = products.filter((p) => (p.category || "").toLowerCase().includes("pre"));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-6">
            <span className="text-2xl font-bold text-slate-900">Nabil PC</span>
            <div className="hidden items-center gap-6 text-slate-600 md:flex">
              <a href="#prebuilt" className="transition hover:text-slate-900">
                Products
              </a>
              <a href="#custom-built" className="transition hover:text-slate-900">
                Custom Built
              </a>
              <a href="#accessories" className="transition hover:text-slate-900">
                PC Accessories
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end md:gap-4">
            <div className="w-full md:w-[420px]">
              <SearchBar />
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className="relative rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-red-500 w-5 h-5 text-xs font-bold text-white flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Signup
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div id="prebuilt" className="col-span-1 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-inner">
              <img src="/images/prebuilt-pc.svg" alt="prebuilt pc" className="h-56 w-full object-cover" />
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">PRE-BUILT</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">Pre-built PCs</h2>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-600">
                <li>Core i7-13700K</li>
                <li>RTX 4070 Ti</li>
                <li>32GB DDR5 RAM</li>
                <li>1TB NVMe SSD</li>
              </ul>
            </div>
            <Link href="/prebuilt" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
              VIEW ALL PRE-BUILT PCS
            </Link>
          </div>

          <div id="custom-built" className="col-span-2 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-6 shadow-2xl text-white relative">
            <div className="absolute -top-8 right-28 hidden h-24 w-24 rounded-full bg-emerald-500/10 blur-3xl md:block" />
            <div className="absolute bottom-10 right-10 hidden h-20 w-20 rounded-full border border-emerald-500/20 md:block" />

            <div className="relative grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-400">CUSTOM PC</p>
                  <h2 className="mt-3 text-5xl font-bold leading-tight">Configurator View</h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
                    High-quality PC with the latest components.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link href="/custom-built" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">
                    VIEW ALL CUSTOM BUILDS
                  </Link>
                  <Link href="/custom-built" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                    CONFIGURATOR VIEW
                  </Link>
                </div>
              </div>

              <div className="relative hidden h-80 w-full overflow-hidden rounded-[2rem] bg-slate-950 shadow-xl md:block">
                <div className="absolute inset-0 rounded-[2rem] border border-emerald-500/20" />
                <div className="relative flex h-full flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-300">
                      VIEW ALL CUSTOM BUILDS
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-28 w-28 rounded-full bg-emerald-500/70 shadow-xl" />
                    <div className="h-3 w-24 rounded-full bg-slate-900/50" />
                    <div className="h-3 w-14 rounded-full bg-slate-900/50" />
                  </div>
                  <div className="flex justify-end">
                    <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-300">
                      VIEW ALL CUSTOM BUILDS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="accessories" className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">PC Accessories</h3>
              <p className="mt-1 text-sm text-slate-600">Top picks to complete your setup.</p>
            </div>
            <Link href="/pc-accessories" className="inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500">
              VIEW ALL ACCESSORIES
            </Link>
          </div>

          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {accessories.length > 0
              ? accessories.slice(0, 8).map((p) => (
                  <div className="w-72 flex-none" key={p._id}>
                    <ProductCard product={p} isCompact={true} />
                  </div>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-72 flex-none rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4" />
                ))}
          </div>
        </div>
      </section>

      {showNotification && <CartNotification />}
    </main>
  );
}