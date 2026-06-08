"use client";

import { useState } from "react";
import { useRouter } from "navigation"; // Next.js standard safe router navigation hook
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Proactive client-side validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError("All form submission inputs must contain valid parameters.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password fails to meet the 6 character configuration threshold.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An unhandled identity conflict occurred.");
      }

      // Secure redirection sequence to the login node
      router.push("/login?registered=true");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h2>
          <p className="mt-2 text-sm text-slate-600">Secure registration pipeline</p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 animate-in fade-in zoom-in-95">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm transition focus:border-indigo-600 focus:bg-white focus:outline-none"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm transition focus:border-indigo-600 focus:bg-white focus:outline-none"
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm transition focus:border-indigo-600 focus:bg-white focus:outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Registering account context..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}