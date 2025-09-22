import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { CartSidebar } from "@/components/cart-sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rulling Gadgets Hub - Big On Gadgets, Small On Price",
  description:
    "Discover premium products across electronics, fashion, home & office, health & beauty, and more.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              {children}
              <CartSidebar />
              <Toaster position="top-right" richColors />
            </Suspense>
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
