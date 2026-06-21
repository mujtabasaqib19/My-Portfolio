"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
        <div className="hero-globe" aria-hidden="true" />
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
            <h1 key={i} className="ds-h1">
              Mujtaba Saqib
              <span style={{ opacity: 0.18, margin: "0 0.4em" }}>—</span>
            </h1>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
