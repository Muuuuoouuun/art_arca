"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageCurtain() {
  const [visible, setVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(true);

  useEffect(() => {
    // Only show once per session
    const shown = sessionStorage.getItem("art-hub-curtain");
    if (shown) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem("art-hub-curtain", "1");

    // Logo fades out before curtain rises
    const logoTimer = setTimeout(() => setLogoVisible(false), 700);
    // Curtain fully gone after animation
    const curtainTimer = setTimeout(() => setVisible(false), 2000);
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(curtainTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{}}
          transition={{ duration: 1.0, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[2000] pointer-events-none flex items-center justify-center"
          style={{ transformOrigin: "top", background: "#0A0A0A" }}
        >
          <AnimatePresence>
            {logoVisible && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center gap-5 select-none"
              >
                {/* Gold medallion */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="2" y="2" width="36" height="36" transform="rotate(45 20 20)" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.8" />
                  <rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.5" />
                  <rect x="15" y="15" width="10" height="10" transform="rotate(45 20 20)" fill="#C9A96E" opacity="0.9" />
                </svg>
                <span
                  className="tracking-[0.8em] text-sm uppercase font-serif"
                  style={{ color: "#C9A96E" }}
                >
                  Art Hub 4.2
                </span>
                <span
                  className="tracking-[0.4em] text-[9px] uppercase font-sans"
                  style={{ color: "#C9A96E40" }}
                >
                  Synergy Edition
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
