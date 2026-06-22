"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroParticles } from "@/components/ui/HeroParticles";

const EXPO = [0.16, 1, 0.3, 1] as const;

function onceIn(delay = 0) {
  return {
    initial: { y: "40vh" },
    animate: { y: "0vh" },
    transition: { delay, duration: 1.6, ease: EXPO },
  } as const;
}

export function Hero() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const dirRef = useRef<"normal" | "reverse">("normal");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dir: "normal" | "reverse" = y > lastY.current ? "normal" : "reverse";
      if (dir !== dirRef.current && marqueeRef.current) {
        dirRef.current = dir;
        marqueeRef.current.style.animationDirection = dir;
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className="hero-section theme-dark">

      {/* Particle network background */}
      <HeroParticles />

      {/* Photo */}
      <motion.div
        className="hero-photo-wrap"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.05, duration: 1.8, ease: EXPO }}
      >
        <Image
          src="/mujidon.svg"
          alt="Mujtaba Saqib"
          width={700}
          height={1050}
          priority
          className="hero-photo-img"
        />
      </motion.div>

      {/* Location badge */}
      <motion.div className="hero-location" {...onceIn(0.0)}>
        <svg
          aria-hidden="true"
          width="16" height="19"
          viewBox="0 0 16 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M8 0C4.13 0 1 3.13 1 7c0 5.25 7 12 7 12s7-6.75 7-12c0-3.87-3.13-7-7-7z"
            fill="rgba(255,255,255,0.85)"
          />
          <circle cx="8" cy="7" r="2.5" fill="rgba(26,18,16,0.55)" />
        </svg>
        <span>Located in Pakistan</span>
      </motion.div>

      {/* Available badge */}
      <motion.div className="hero-available" {...onceIn(0.1)}>
        <span
          className="hero-available-dot"
          style={{ animation: "dot-pulse 2.4s ease-in-out infinite" }}
        />
        Available for opportunities
      </motion.div>

      {/* Role text */}
      <motion.div className="hero-role" {...onceIn(0.22)}>
        <p>Data Engineer</p>
        <p>Data Scientist</p>
      </motion.div>

      {/* Big name marquee */}
      <motion.div className="big-name" {...onceIn(0.34)}>
        <div ref={marqueeRef} className="marquee-track">
          {[0, 1, 2, 3].map((i) => (
            <h1 key={i} className="ds-h1" style={{ paddingBottom: "0.2em" }}>
              Mujtaba Saqib
              <span style={{ opacity: 0.18, margin: "0 0.4em"}}>—</span>
            </h1>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
