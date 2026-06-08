"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Monitor URL parameters for successful registration signals
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Account provisioned successfully. Proceed with system authentication.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Execute credentials validation without triggering default page-level redirects
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });

      if (result?.error) {
        throw new Error(result.error || "Authentication check returned an invalid status.");
      }

      // Enforce cache refresh before re-routing to ensure Navbar accurately syncs identity headers
      router.refresh();
      router.push("/");
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
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-slate-600">Access your configuration workbench</p>
        </div>

        {success && (
          <div className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700 animate-in fade-in zoom-in-95">
            {success}
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 animate-in fade-in zoom-in-95">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
            {loading ? "Verifying authorization profiles..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          New to Nabil PC?{" "}
          <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}

// Next.js requirement: Wrap components calling useSearchParams in a Suspense perimeter
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Loading interface...</div>}>
      <LoginForm />
    </Suspense>
  );
}