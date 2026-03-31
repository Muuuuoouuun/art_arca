"use client";

import { useEffect, useState } from "react";
import BackgroundGlow from "../components/BackgroundGlow";
import FilmGrain from "../components/FilmGrain";
import HomeNav from "../components/home/HomeNav";
import HeroSection from "../components/home/HeroSection";
import BentoSection from "../components/home/BentoSection";
import ArchiveSection from "../components/home/ArchiveSection";
import HomeFooter from "../components/home/HomeFooter";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "bento", "curation", "footer"];
      let current = "hero";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white font-sans selection:bg-white selection:text-black relative overflow-hidden">
      <FilmGrain />

      <BackgroundGlow color="bg-purple-600" size="w-[800px] h-[800px]" className="top-[-200px] left-[-200px]" opacity={0.18} />
      <BackgroundGlow color="bg-blue-600" size="w-[600px] h-[600px]" className="top-[40vh] right-[-100px]" opacity={0.15} />
      <BackgroundGlow color="bg-indigo-800" size="w-[1000px] h-[1000px]" className="bottom-[-300px] left-[10%]" opacity={0.22} />

      <HomeNav activeSection={activeSection} />
      
      <HeroSection />
      <BentoSection />
      <ArchiveSection />
      <HomeFooter />
    </div>
  );
}
