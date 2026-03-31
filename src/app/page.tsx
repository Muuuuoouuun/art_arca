import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import AnimatedContainer from "../components/AnimatedContainer";
import ParallaxImage from "../components/ParallaxImage";
import GlassCard from "../components/GlassCard";
import BackgroundGlow from "../components/BackgroundGlow";
import FilmGrain from "../components/FilmGrain";
import { FloatingIconicObject, GlyphArtifact } from "../components/FloatingIconicObject";
import { exhibitions } from "../lib/data";
import BookmarkButton from "../components/BookmarkButton";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [hoveredExhibition, setHoveredExhibition] = useState<string | null>(null);

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
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-white selection:text-black relative overflow-hidden">
      <FilmGrain />
      
      <BackgroundGlow color="bg-purple-600" size="w-[800px] h-[800px]" className="top-[-200px] left-[-200px]" opacity={0.1} />
      <BackgroundGlow color="bg-blue-600" size="w-[600px] h-[600px]" className="top-[40vh] right-[-100px]" opacity={0.08} />
      <BackgroundGlow color="bg-indigo-800" size="w-[1000px] h-[1000px]" className="bottom-[-300px] left-[10%]" opacity={0.12} />

      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6">
        <GlassCard className="max-w-[1800px] mx-auto px-10 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <span className="text-white tracking-[0.5em] font-serif text-lg font-bold">ART HUB 4.2</span>
            <span className="text-zinc-500 font-sans text-[9px] tracking-[0.2em] border-l border-zinc-800 pl-4 py-1 uppercase font-bold">Synergy Update<br/>Edition</span>
          </motion.div>
          
          <div className="hidden md:flex gap-12 items-center text-[10px] uppercase tracking-[0.2em] font-bold">
            {["Origins", "The Grid", "Archive", "Saved"].map((item, idx) => {
              const hrefs = ["#hero", "#bento", "#curation", "/bookmarks"];
              const sections = ["hero", "bento", "curation", "bookmarks"];
              return (
                <Link 
                  key={item}
                  href={hrefs[idx]} 
                  className={`hover:text-white transition-colors duration-500 relative py-2 ${activeSection === sections[idx] ? "text-white" : "text-zinc-500"}`}
                >
                  {item}
                  {activeSection === sections[idx] && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>

          <Link href="/exhibitions" className="group relative px-8 py-3 overflow-hidden rounded-full border border-white/20 text-[10px] tracking-[0.2em] font-bold transition-all duration-700 hover:border-white">
            <span className="relative z-10 group-hover:text-black transition-colors duration-700 uppercase">Enter Gallery</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </Link>
        </GlassCard>
      </nav>

      <section ref={heroRef} id="hero" className="relative min-h-[100vh] flex flex-col justify-center px-8 md:px-16 overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="absolute right-[-10vw] top-[10vh] w-[60vw] h-[80vh] z-0 pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image 
              src="/images/exhibitions/afrofuturism-disco-hero.jpg" 
              alt="Hero Visual Asset" 
              fill 
              className="object-contain drop-shadow-[0_0_100px_rgba(255,255,255,0.1)]"
              priority
            />
          </div>
        </motion.div>

        <div className="absolute left-10 top-[25%] hidden xl:flex flex-col gap-12 z-20">
          <GlyphArtifact label="Ref. Code" value="AH-4.2-SYN" />
          <GlyphArtifact label="Coord" value="37.5665° N / 126.9780° E" />
          <GlyphArtifact label="Visual Engine" value="Octane 2026.4" />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-zinc-500 text-sm tracking-[0.8em] uppercase mb-12 font-bold flex items-center gap-6">
              <span className="w-16 h-[2px] bg-white shadow-[0_0_10px_white]" />
              Volume 04 / Iconic
            </p>
            <h1 className="text-[14vw] md:text-[10vw] font-serif leading-[0.8] tracking-[-0.05em] font-bold">
              <span className="block overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-shadow-glow"
                >
                  ARTISTIC
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="block italic text-zinc-600"
                >
                  SOUL.
                </motion.span>
              </span>
            </h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-20 max-w-xl"
            >
              <GlassCard className="p-8 border-l-4 border-l-white">
                <p className="text-lg md:text-xl font-serif text-zinc-300 font-light leading-relaxed">
                  Art Hub 4.2: Team Synergy Update. We merge the high-end aesthetic with social connectivity. Bookmarks, reviews, and reservations now integrate seamlessly into the digital void.
                </p>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>

        <FloatingIconicObject 
          src="/images/objects/chrome-mask.webp" 
          alt="Chrome Afrofuturist Mask" 
          side="left"
          className="top-[40%] translate-x-[-20%]"
        />

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase font-bold">Discover</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-white to-transparent shadow-[0_0_8px_white]" />
        </motion.div>
      </section>

      <section id="bento" className="px-4 md:px-8 py-40 relative">
        <div className="max-w-[1800px] mx-auto">
          <AnimatedContainer className="mb-24 flex justify-between items-end">
            <div>
               <p className="text-zinc-600 font-mono text-xs mb-4 tracking-[0.4em] uppercase font-bold">Featured Collections</p>
               <h2 className="text-6xl md:text-8xl font-serif tracking-tighter leading-none">
                THE <span className="italic text-zinc-500">ICONIC</span><br/>COLLECTION
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <GlassCard className="px-8 py-4 border-b-2 border-b-white/20">
                <p className="text-zinc-500 text-[10px] tracking-[0.2em] mb-1 uppercase font-bold">Archive Depth</p>
                <p className="text-4xl font-serif tabular-nums tracking-tighter">10 / 2026</p>
              </GlassCard>
            </div>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[400px]">
            <div className="md:col-span-8 md:row-span-2 relative group rounded-[40px] overflow-hidden bg-black bento-hover border border-white/5">
                <div className="absolute inset-0 z-0">
                  <ParallaxImage src={exhibitions[6].heroImage!} alt={exhibitions[6].title} className="opacity-70 group-hover:scale-105 transition-transform duration-1000 ease-out" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                
                <div className="absolute top-8 right-8 z-30">
                  <BookmarkButton exhibitionId={exhibitions[6].id} variant="card" />
                </div>

                <motion.div 
                  whileHover={{ y: -30, rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="absolute right-[-5%] top-[5%] w-[500px] h-[500px] z-20 pointer-events-none drop-shadow-[0_0_80px_rgba(255,255,255,0.3)]"
                >
                   <Image src="/images/objects/marble-david.webp" alt="Abstract Marble David Head" fill className="object-contain" />
                </motion.div>

                <div className="absolute bottom-0 left-0 p-16 z-30 w-full flex justify-between items-end">
                  <Link href={`/exhibitions/${exhibitions[6].id}`} className="max-w-2xl">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block font-bold">Masterpiece Exhibition</span>
                    <h3 className="text-6xl md:text-7xl font-serif mb-8 leading-none tracking-tighter group-hover:text-shadow-glow transition-all duration-700">{exhibitions[6].title}</h3>
                    <p className="text-zinc-400 text-xl font-light line-clamp-2 max-w-lg leading-relaxed">{exhibitions[6].description}</p>
                  </Link>
                  <Link href={`/exhibitions/${exhibitions[6].id}`} className="w-24 h-24 rounded-full border border-white/20 backdrop-blur-xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 transform group-hover:rotate-45">
                    <span className="text-2xl">→</span>
                  </Link>
                </div>
            </div>

            <div className="md:col-span-4 md:row-span-2 relative group rounded-[40px] overflow-hidden border border-white/10 bento-hover">
                <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-xl z-0" />
                <div className="absolute top-8 right-8 z-30">
                  <BookmarkButton exhibitionId={exhibitions[4].id} variant="card" />
                </div>
                <div className="absolute inset-0 z-10 p-12 flex flex-col justify-between">
                  <Link href={`/exhibitions/${exhibitions[4].id}`} className="relative">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 block font-bold">{exhibitions[4].artist}</span>
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
                       <Image src={exhibitions[4].image!} alt={exhibitions[4].title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -right-4 -bottom-4 w-24 h-24 z-20 pointer-events-none filter drop-shadow-xl"
                    >
                      <Image src="/images/objects/neon-norigae.webp" alt="Norigae Artifact" fill className="object-contain" />
                    </motion.div>
                  </Link>
                  <Link href={`/exhibitions/${exhibitions[4].id}`}>
                    <h3 className="text-4xl font-serif mb-6 leading-tight tracking-tight">{exhibitions[4].titleKo}</h3>
                    <div className="flex flex-wrap gap-2">
                      {exhibitions[4].tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-zinc-400 uppercase font-bold">{tag}</span>
                      ))}
                    </div>
                  </Link>
                </div>
            </div>

            <div className="md:col-span-6 md:row-span-1 relative group rounded-[40px] overflow-hidden bg-black bento-hover border border-white/5">
              <div className="absolute top-6 right-6 z-30">
                <BookmarkButton exhibitionId={exhibitions[0].id} variant="card" />
              </div>
              <Link href={`/exhibitions/${exhibitions[0].id}`}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                   <div className="relative w-[300px] h-[300px] z-10">
                      <Image src="/images/objects/chrome-mask.webp" alt="Chrome Mask" fill className="object-contain group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-10 left-10 z-20">
                   <h3 className="text-3xl font-serif mb-1 tracking-tight">{exhibitions[0].title}</h3>
                   <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-bold">{exhibitions[0].category}</span>
                </div>
              </Link>
            </div>

            <div className="md:col-span-3 md:row-span-1 relative group rounded-[40px] overflow-hidden bg-zinc-900 bento-hover border border-white/5">
              <div className="absolute top-6 right-6 z-30">
                <BookmarkButton exhibitionId={exhibitions[7].id} variant="card" />
              </div>
              <Link href={`/exhibitions/${exhibitions[7].id}`}>
                <ParallaxImage src={exhibitions[7].heroImage!} alt={exhibitions[7].title} className="opacity-30 group-hover:opacity-60 transition-all duration-700" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                   <h3 className="text-3xl font-serif mb-4 group-hover:scale-110 transition-all duration-700">{exhibitions[7].title}</h3>
                   <div className="w-8 h-[1px] bg-white/30 group-hover:w-20 transition-all duration-700" />
                </div>
              </Link>
            </div>

            <div className="md:col-span-3 md:row-span-1 relative group rounded-[40px] overflow-hidden border border-white/5 bento-hover bg-gradient-to-br from-zinc-800 to-black p-8 flex flex-col justify-between">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-white/40 font-mono text-xs">05</span>
               </div>
               <div>
                  <h3 className="text-2xl font-serif mb-2">Live Stream</h3>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Ambient Gallery Lab</p>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-400 uppercase font-mono">Status: Online</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section id="curation" className="px-8 md:px-16 py-40 border-t border-white/5 relative bg-[#050505]">
        <div className="max-w-[1800px] mx-auto">
          <AnimatedContainer className="mb-32">
            <p className="text-zinc-600 font-mono text-[10px] mb-6 tracking-[0.6em] uppercase font-bold">Collection Registry</p>
            <h2 className="text-7xl md:text-9xl font-serif tracking-tighter leading-none">ARCHIVE <span className="italic text-zinc-600">4.0</span></h2>
          </AnimatedContainer>

          <div className="flex flex-col">
            {exhibitions.map((exhibition, idx) => (
              <motion.div 
                key={exhibition.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredExhibition(exhibition.id)}
                onMouseLeave={() => setHoveredExhibition(null)}
              >
                <div className="group relative block py-16 border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-500">
                  <div className={`hidden xl:block absolute left-[35%] top-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none z-50 transition-all duration-700 transform ${hoveredExhibition === exhibition.id ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-75 -translate-x-20"}`}>
                    <GlassCard className="relative w-full h-full p-1 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-white/20 backdrop-blur-3xl bg-white/5">
                      <Image src={exhibition.heroImage!} alt={exhibition.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute bottom-6 left-6">
                         <p className="text-[8px] font-mono tracking-[0.4em] text-white/40 uppercase mb-1">Preview // Archive</p>
                         <h4 className="text-xl font-serif text-white tracking-tighter">{exhibition.titleKo}</h4>
                      </div>
                    </GlassCard>
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 px-8">
                    <Link href={`/exhibitions/${exhibition.id}`} className="flex items-center gap-16 md:w-1/2">
                      <span className="text-zinc-800 font-mono text-xl group-hover:text-white transition-colors">{(idx + 1).toString().padStart(2, '0')}</span>
                      <h3 className="text-5xl md:text-8xl font-serif tracking-tighter leading-none group-hover:italic group-hover:text-shadow-glow transition-all duration-700">{exhibition.title}</h3>
                    </Link>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-12 md:w-1/2 md:justify-end">
                      <div className="flex items-center gap-4">
                        <BookmarkButton exhibitionId={exhibition.id} variant="card" />
                      </div>
                      <Link href={`/exhibitions/${exhibition.id}`} className="text-left md:text-right">
                        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] mb-2 font-bold group-hover:text-zinc-400 transition-colors">{exhibition.artist}</p>
                        <p className="text-zinc-400 font-serif text-lg italic group-hover:text-white transition-colors">{exhibition.category}</p>
                      </Link>
                      <Link href={`/exhibitions/${exhibition.id}`} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-700 shadow-2xl">
                        <span className="text-xl">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer id="footer" className="bg-[#030303] py-80 px-8 md:px-16 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto text-center relative z-10">
          <AnimatedContainer>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block"
            >
              <h2 className="text-[30vw] font-serif font-bold text-[#080808] leading-none select-none tracking-tighter">ICONIC</h2>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-white">
                  <p className="text-[12px] tracking-[1.5em] uppercase mb-12 font-bold text-zinc-500">The New Curation Frontier</p>
                  <p className="text-3xl md:text-6xl font-serif italic max-w-4xl tracking-tighter leading-tight shadow-text-glow">Where technology and human soul become indistinguishable.</p>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-60 grid grid-cols-2 md:grid-cols-4 gap-20 text-left border-t border-white/5 pt-32">
              <div className="flex flex-col gap-6">
                <span className="text-zinc-600 text-[10px] uppercase tracking-[0.6em] font-bold">The Vision</span>
                <Link href="#" className="text-lg font-serif hover:text-zinc-400 transition-colors italic">The Manifesto</Link>
                <Link href="#" className="text-lg font-serif hover:text-zinc-400 transition-colors italic">Curator's Note</Link>
                <Link href="#" className="text-lg font-serif hover:text-zinc-400 transition-colors italic">The Process</Link>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-zinc-600 text-[10px] uppercase tracking-[0.6em] font-bold">Network</span>
                <Link href="#" className="text-lg font-serif hover:text-zinc-400 transition-colors italic">Instagram</Link>
                <Link href="#" className="text-lg font-serif hover:text-zinc-400 transition-colors italic">X / Twitter</Link>
                <Link href="#" className="text-lg font-serif hover:text-zinc-400 transition-colors italic">Discord Lab</Link>
              </div>
              <div className="md:col-span-2 text-right flex flex-col justify-end items-end gap-8">
                 <div className="px-6 py-2 border border-white/10 rounded-full inline-block backdrop-blur-xl bg-white/5">
                    <span className="text-[10px] text-zinc-400 font-mono font-bold tracking-[0.2em] uppercase leading-none">Status: Node Active</span>
                 </div>
                <p className="text-[10px] text-zinc-700 tracking-[0.4em] font-bold uppercase">
                  © 2026 Art Hub 4.2 — Synergy Integration Architect.
                </p>
              </div>
            </div>
          </AnimatedContainer>
        </div>
        
        <FloatingIconicObject src="/images/objects/porcelain-guitar.webp" alt="Porcelain Guitar" side="left" className="bottom-[10%] opacity-40" />
        <FloatingIconicObject src="/images/objects/bio-cello.webp" alt="Bio Cello" side="right" className="bottom-[20%] opacity-30" />

        <motion.div 
           style={{ x: useTransform(smoothProgress, [0, 1], ["0%", "-50%"]) }}
           className="absolute bottom-[-10vh] left-0 text-[40vh] font-serif font-black text-white/[0.01] whitespace-nowrap pointer-events-none select-none"
        >
           MASTERPIECE MASTERPIECE MASTERPIECE MASTERPIECE
        </motion.div>
      </footer>
    </div>
  );
}
