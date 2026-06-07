"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl gap-4 px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Nabil PC
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="text-slate-600">Your cart is empty</p>
            <Link href="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-700">
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 border-b border-slate-200 py-6 last:border-b-0">
                  <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.title} className="h-24 w-24 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-600">${item.price.toFixed(2)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="text-slate-600 hover:text-slate-900">
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="text-slate-600 hover:text-slate-900">
                        +
                      </button>
                      <button onClick={() => removeFromCart(item._id)} className="ml-auto text-red-600 text-sm hover:text-red-700">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 h-fit">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="mt-6 w-full rounded-full bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
