"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { LoadingScreen }  from "@/components/ui/LoadingScreen";
import { CustomCursor }   from "@/components/ui/CustomCursor";
import { Navbar }         from "@/components/sections/Navbar";
import { Hero }           from "@/components/sections/Hero";
import { Intro }          from "@/components/sections/Intro";
import { WorkList }       from "@/components/sections/WorkList";
import { WorkTiles }      from "@/components/sections/WorkTiles";
import { Experience }     from "@/components/sections/Experience";
import { Skills }         from "@/components/sections/Skills";
import { ContactFooter }  from "@/components/sections/ContactFooter";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {/* Noise grain */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Fixed nav — always visible above loading */}
      {loaded && <Navbar />}

      {/* Main content */}
      {loaded && (
        <main>
          {/* ── Dark hero ─────────────────────────────── */}
          <Hero />

          {/* ── Light intro ───────────────────────────── */}
          <Intro />

          {/* ── Work list (hover image) ───────────────── */}
          <WorkList />

          {/* ── Work tiles ────────────────────────────── */}
          <WorkTiles />

          {/* ── More projects link ─────────────────────── */}
          <section className="more-work-row">
            <div className="ds-container">
              <motion.div
                className="more-work-inner"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.72, ease: EXPO }}
              >
                <a
                  href="https://github.com/mujtabasaqib19"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontSize: "0.85rem",
                    color: "var(--dark)",
                    textDecoration: "none",
                    border: "1px solid var(--dark)",
                    padding: "0.75rem 1.75rem",
                    borderRadius: "2rem",
                    letterSpacing: "0.03em",
                    transition: "background 0.3s, color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--dark)";
                    (e.currentTarget as HTMLElement).style.color = "var(--cream)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--dark)";
                  }}
                >
                  More projects
                  <span style={{ opacity: 0.5 }}>
                    {/* count */}
                    {11}
                  </span>
                </a>
              </motion.div>
            </div>
          </section>

          {/* ── Rolling text strip — Dennis's signature ── */}
          <motion.div
            className="rolling-strip"
            aria-hidden="true"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.82, ease: EXPO }}
          >
            <div className="rolling-strip-track">
              {/* Two identical copies so the -50% translateX loops seamlessly */}
              {[0, 1].map((copy) =>
                ["Data Engineering", "Machine Learning", "RAG Pipelines", "Analytics & BI", "Agentic AI", "Python · SQL", "Data Warehousing", "LLMs"].map((label) => (
                  <span key={`${copy}-${label}`} style={{ display: "flex", alignItems: "center" }}>
                    <span className="rolling-strip-item">{label}</span>
                    <span className="rolling-strip-dot">✦</span>
                  </span>
                ))
              )}
            </div>
          </motion.div>

          {/* ── Experience ────────────────────────────── */}
          <section id="experience" className="about-section">
            <div className="ds-container">
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
                <motion.p
                  className="ds-h5"
                  style={{ color: "var(--dark)" }}
                  initial={{ x: -16, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.52, ease: EXPO }}
                >
                  Experience
                </motion.p>
                <motion.div
                  className="stripe"
                  style={{ flex: 1, background: "var(--dark)" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ delay: 0.08, duration: 0.78, ease: EXPO }}
                />
              </div>
              <Experience />
            </div>
          </section>

          {/* ── Skills ────────────────────────────────── */}
          <section style={{ background: "var(--cream)", color: "var(--dark)", padding: "4rem 0 7rem" }}>
            <div className="ds-container">
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
                <motion.p
                  className="ds-h5"
                  style={{ color: "var(--dark)" }}
                  initial={{ x: -16, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.52, ease: EXPO }}
                >
                  Skills &amp; Tools
                </motion.p>
                <motion.div
                  className="stripe"
                  style={{ flex: 1, background: "var(--dark)" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ delay: 0.08, duration: 0.78, ease: EXPO }}
                />
              </div>
              <Skills />
            </div>
          </section>

          {/* ── Rounded divider into dark footer ─────── */}
          <div className="rounded-divider-top" aria-hidden="true" />

          {/* ── Contact + footer ──────────────────────── */}
          <ContactFooter />
        </main>
      )}
    </>
  );
}
