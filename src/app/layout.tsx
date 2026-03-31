import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import AmbientSound from "@/components/AmbientSound";

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
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#030303] text-white antialiased selection:bg-white selection:text-black overflow-x-hidden font-sans">
        <CustomCursor />
        <AmbientSound />
        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
