import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import AmbientSound from "@/components/AmbientSound";
import PageCurtain from "@/components/PageCurtain";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — Seoul Exhibition Archive`,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`dark scroll-smooth ${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
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
