import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Art Arca — 예술들의 집합체",
    template: "%s — Art Arca",
  },
  description: "예술들의 집합체, 예술과 대중, 대중과 예술. Art Hub Spring 2026 Edition.",
  openGraph: {
    siteName: "Art Arca",
    locale: "ko_KR",
    type: "website",
    title: "Art Arca — 예술들의 집합체",
    description: "예술들의 집합체, 예술과 대중, 대중과 예술. Art Hub Spring 2026 Edition.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Arca — 예술들의 집합체",
    description: "Art Hub Spring 2026 Edition",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
