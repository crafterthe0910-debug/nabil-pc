"use client";

export default function CartNotification() {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 animate-pulse">
      <div className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
        ✓ Added to cart
      </div>
    </div>
  );
}
