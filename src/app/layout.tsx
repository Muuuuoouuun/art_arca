import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import AmbientSound from "@/components/AmbientSound";
import PageCurtain from "@/components/PageCurtain";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Art Hub 4.2 — Synergy Edition",
  description: "High-fidelity digital art curation. Experience the evolution of 3D assets, glassmorphism, and social synergy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${playfair.variable} ${cormorant.variable}`}>
      <body className="bg-canvas text-white antialiased selection:bg-white selection:text-black overflow-x-hidden font-sans">
        <PageCurtain />
        <CustomCursor />
        <AmbientSound />
        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
