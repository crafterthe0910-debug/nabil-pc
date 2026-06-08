import "@/app/globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartNotification from "@/components/CartNotification";

export const metadata = {
  title: "Nabil PC — Custom Hardware Engine",
  description: "Next-generation catalog systems for pre-built configurations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <CartProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <CartNotification />
        </CartProvider>
      </body>
    </html>
  );
}