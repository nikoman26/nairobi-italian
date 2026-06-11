import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { PwaRegister } from "@/components/pwa-register";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Nairobi Italian Ice & Eats",
  description: "Order Italian ice, gelato, office boxes, gift cards, loyalty rewards, and catering in Nairobi.",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://nairobi-italian.example"),
  openGraph: {
    title: "Nairobi Italian Ice & Eats",
    description: "A mobile-first frozen dessert webstore for Nairobi.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#e93d63",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <PwaRegister />
          <SiteNav />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
