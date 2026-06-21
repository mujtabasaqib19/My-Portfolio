"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { PROJECTS } from "@/data/portfolio";

const FEATURED = PROJECTS.slice(0, 5);

const W = 280;
const H = 210;

function AnimatedStripe() {
  return (
    <motion.div
      className="stripe"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

export function WorkList() {
  const [hovered, setHovered] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX - W / 2, y: e.clientY - H * 0.65 };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const loop = () => {
      x.set(x.get() + (mouseRef.current.x - x.get()) / 12);
      y.set(y.get() + (mouseRef.current.y - y.get()) / 12);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [x, y]);

  return (
    <section id="projects" className="work-section">
      <div className="ds-container">
        <motion.p
          className="work-list-label"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Recent work
        </motion.p>

        <ul className="work-list">
          {FEATURED.map((project, i) => (
            <li
              key={project.title}
              className="work-list-item"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <AnimatedStripe />
              <motion.a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ x: -28, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.08, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              >
                <h4>{project.title}</h4>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span className="work-discipline">{project.discipline}</span>
                  <span className="work-arrow">↗</span>
                </div>
              </motion.a>
            </li>
          ))}
          <AnimatedStripe />
        </ul>
      </div>

      {/* Floating preview */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x,
              y,
              width: W,
              height: H,
              borderRadius: 4,
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 300,
              background: FEATURED[hovered]?.bgColor ?? "#1a1a2e",
            }}
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.78 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {FEATURED[hovered]?.image ? (
              <Image
                src={FEATURED[hovered]!.image!}
                alt={FEATURED[hovered]!.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="280px"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono, monospace)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    textAlign: "center",
                    padding: "1rem",
                  }}
                >
                  {FEATURED[hovered]?.title}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
