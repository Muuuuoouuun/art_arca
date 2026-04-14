"use client";

import { useEffect, useState } from "react";
import BackgroundGlow from "../components/BackgroundGlow";
import FilmGrain from "../components/FilmGrain";
import HomeNav from "../components/home/HomeNav";
import HeroSection from "../components/home/HeroSection";
import EditorialBand from "../components/home/EditorialBand";
import BentoSection from "../components/home/BentoSection";
import ArchiveSection from "../components/home/ArchiveSection";
import HomeFooter from "../components/home/HomeFooter";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "salon", "bento", "curation", "footer"];
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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white font-sans selection:bg-white selection:text-black relative overflow-hidden">
      <FilmGrain />

      <BackgroundGlow color="bg-amber-700" size="w-[760px] h-[760px]" className="top-[-180px] left-[-180px]" opacity={0.16} />
      <BackgroundGlow color="bg-emerald-700" size="w-[560px] h-[560px]" className="top-[36vh] right-[-60px]" opacity={0.12} />
      <BackgroundGlow color="bg-sky-800" size="w-[900px] h-[900px]" className="bottom-[-320px] left-[14%]" opacity={0.12} />
      <BackgroundGlow color="bg-orange-800" size="w-[520px] h-[520px]" className="top-[12vh] left-[28%]" opacity={0.06} />

      <HomeNav activeSection={activeSection} />
      
      <HeroSection />
      <EditorialBand />
      <BentoSection />
      <ArchiveSection />
      <HomeFooter />
    </div>
  );
}
