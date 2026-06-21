"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { MagneticWrap } from "@/components/ui/MagneticWrap";
import { LiquidBtnCircle } from "@/components/ui/LiquidBtnCircle";
import { DataOrbit } from "@/components/ui/DataOrbit";

const EXPO = [0.16, 1, 0.3, 1] as const;

/* ─── Text reveal — clips inner div, blurs in ───────────────── */
function LineReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <div ref={ref} className="line-overflow">
      <motion.div
        initial={{ y: "108%", filter: "blur(6px)" }}
        animate={{
          y: isInView ? "0%" : "108%",
          filter: isInView ? "blur(0px)" : "blur(6px)",
        }}
        transition={{ duration: 0.78, delay, ease: EXPO }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Section label + expanding stripe ──────────────────────── */
function SectionLabel({
  children,
  delay = 0,
  light = true,
}: {
  children: React.ReactNode;
  delay?: number;
  light?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
      <motion.span
        className="ds-h5"
        initial={{ x: -14, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.48, ease: EXPO }}
        style={{ color: light ? "var(--dark)" : "var(--cream)" }}
      >
        {children}
      </motion.span>
      <motion.div
        className="stripe"
        style={{ flex: 1, background: light ? "var(--dark)" : "var(--cream)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.08, duration: 0.78, ease: EXPO }}
      />
    </div>
  );
}

/* ─── Animated count-up number ───────────────────────────────── */
function CountUp({
  target,
  suffix = "",
  delay = 0,
}: {
  target: number;
  suffix?: string;
  delay?: number;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const isInView = useInView(spanRef, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(mv, target, {
      duration: 2.0,
      delay,
      ease: EXPO,
    });
    const unsub = mv.on("change", (v) => {
      if (spanRef.current) spanRef.current.textContent = Math.round(v) + suffix;
    });
    return () => { ctrl.stop(); unsub(); };
  }, [isInView, mv, target, suffix, delay]);

  return <span ref={spanRef}>0{suffix}</span>;
}

/* ─── Rolling text strip ─────────────────────────────────────── */
const STRIP_ITEMS = [
  "Available for Work",
  "Open to Remote",
  "Data Engineering",
  "Machine Learning",
  "Agentic AI",
  "RAG Pipelines",
  "Python · SQL",
  "Pakistan-Based",
];

function RollingStrip({ dark = true }: { dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        background: dark ? "var(--dark)" : "var(--cream)",
        padding: "1.6rem 0",
        overflow: "hidden",
        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(28,29,32,0.08)"}`,
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(28,29,32,0.08)"}`,
      }}
    >
      <div className="rolling-strip-track">
        {[0, 1].map((copy) =>
          STRIP_ITEMS.map((label) => (
            <span
              key={`${copy}-${label}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                className="rolling-strip-item"
                style={{ color: dark ? "var(--cream)" : "var(--dark)" }}
              >
                {label}
              </span>
              <span
                className="rolling-strip-dot"
                style={{ color: dark ? "var(--cream)" : "var(--dark)" }}
              >
                ✦
              </span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}

const STATS = [
  { target: 2, suffix: "+", label: "Years of Experience" },
  { target: 10, suffix: "+", label: "Projects Built" },
  { target: 5, suffix: "", label: "Stacks Mastered" },
];

const SERVICES = [
  {
    num: "01",
    title: "Data Engineering",
    desc: "Designing and building robust ETL pipelines, data warehouses, and lakehouse architectures. From Apache Airflow and dbt to Snowflake, ClickHouse, and cloud-native stacks — I engineer data systems that scale.",
  },
  {
    num: "02",
    title: "Machine Learning & AI",
    desc: "Developing ML models, NLP systems, RAG pipelines, and Agentic AI workflows. I turn raw data into intelligent applications that automate analysis and surface actionable insights.",
  },
  {
    num: "03",
    title: "Analytics & BI",
    desc: "Building interactive dashboards and reporting solutions in Power BI and Tableau. From KPI frameworks to executive reporting, I help teams make confident, data-driven decisions.",
  },
];

export default function About() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />

      <main>

        {/* ══════════════════════════════════════════════════
            01  HEADER
        ══════════════════════════════════════════════════ */}
        <section className="about-page-header theme-light">
          <div className="ds-container">

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
              <motion.span
                className="ds-h5"
                initial={{ x: -18, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.48, ease: EXPO }}
              >
                About
              </motion.span>
              <motion.div
                className="stripe"
                style={{ flex: 1 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.9, ease: EXPO }}
              />
            </div>

            <h2 className="ds-h2" style={{ maxWidth: "860px" }}>
              <LineReveal delay={0.14}>Helping data teams build</LineReveal>
              <LineReveal delay={0.30}>reliable infrastructure.</LineReveal>
            </h2>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            02  DATA ORBIT ANIMATION
        ══════════════════════════════════════════════════ */}
        <section className="about-orbit-section theme-light">
          <motion.div
            className="about-orbit-stage"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.1, ease: EXPO }}
          >
            {/* Corner labels */}
            <span className="orbit-corner-label orbit-corner-tl">Data Pipeline</span>
            <span className="orbit-corner-label orbit-corner-tr">ML · RAG · BI</span>
            <span className="orbit-corner-label orbit-corner-bl">ETL · Warehousing</span>
            <span className="orbit-corner-label orbit-corner-br">Agentic AI</span>
            <DataOrbit />
          </motion.div>
          <div className="ds-container">
            <motion.div
              className="stripe"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.82, ease: EXPO }}
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            03  BIO + PHOTO
        ══════════════════════════════════════════════════ */}
        <section className="about-image-section theme-light">
          <div className="ds-container">
            <div className="about-image-grid">

              {/* Left — bio text */}
              <div>
                <LineReveal delay={0.06}>
                  <p className="ds-p" style={{ opacity: 0.65 }}>
                    I am Mujtaba Saqib. A Data Scientist and Engineer
                    with deep interest about building scalable data systems and
                    intelligent applications that solve real problems.
                  </p>
                </LineReveal>

                <LineReveal delay={0.2}>
                  <p className="ds-p" style={{ opacity: 0.65, marginTop: "1.5rem" }}>
                    With practical experience in ETL orchestration, data
                    warehousing, RAG pipelines, and agentic AI, I help teams
                    turn messy raw data into reliable, automated systems.
                  </p>
                </LineReveal>

                <LineReveal delay={0.34}>
                  <p className="ds-p" style={{ opacity: 0.65, marginTop: "1.5rem" }}>
                    Based in Pakistan — open to remote opportunities worldwide.
                  </p>
                </LineReveal>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.75 }}
                  style={{ marginTop: "3rem" }}
                >
                  <MagneticWrap strength={35}>
                    <LiquidBtnCircle href="/contact" size={120} darkFill>
                      Work with
                      <br />
                      me
                    </LiquidBtnCircle>
                  </MagneticWrap>
                </motion.div>
              </div>

              {/* Right — clip-path curtain wipe */}
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: "relative", width: "100%", borderRadius: "0.5rem", overflow: "hidden", maxHeight: "520px" }}
              >
                <Image
                  src="/about_photo.svg"
                  alt="Mujtaba Saqib"
                  width={810}
                  height={1012}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
                  priority
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            04  STATS
        ══════════════════════════════════════════════════ */}
        <section className="theme-light" style={{ padding: "3rem 0", borderTop: "1px solid rgba(28,29,32,0.08)" }}>
          <div className="ds-container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem",
                textAlign: "center",
              }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ delay: i * 0.12, duration: 0.72, ease: EXPO }}
                >
                  <div
                    style={{
                      fontSize: "clamp(3.5rem, 7vw, 6rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      color: "var(--dark)",
                    }}
                  >
                    <CountUp target={stat.target} suffix={stat.suffix} delay={i * 0.22} />
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      opacity: 0.4,
                      marginTop: "0.75rem",
                      color: "var(--dark)",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            05  ROLLING STRIP
        ══════════════════════════════════════════════════ */}
        <RollingStrip dark />

        {/* ══════════════════════════════════════════════════
            06  SERVICES
        ══════════════════════════════════════════════════ */}
        <section className="about-services-section theme-light">
          <div className="ds-container">

            <SectionLabel delay={0}>I can help you with…</SectionLabel>

            {SERVICES.map((service, i) => (
              <div key={service.num} className="about-service-item">
                <motion.div
                  className="stripe"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.68, delay: i * 0.11, ease: EXPO }}
                />
                <div className="about-service-content">
                  <motion.span
                    className="about-service-num"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.11 + 0.16, duration: 0.4 }}
                  >
                    {service.num}
                  </motion.span>
                  <motion.h4
                    className="about-service-title"
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.11 + 0.08, duration: 0.58, ease: EXPO }}
                  >
                    {service.title}
                  </motion.h4>
                  <motion.p
                    className="about-service-desc"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.11 + 0.26, duration: 0.52 }}
                  >
                    {service.desc}
                  </motion.p>
                </div>
              </div>
            ))}

            <motion.div
              className="stripe"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EXPO }}
            />

          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            07  EXPERIENCE
        ══════════════════════════════════════════════════ */}
        <section className="about-section">
          <div className="ds-container">
            <SectionLabel>Experience</SectionLabel>
            <Experience />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            08  ROLLING STRIP (light)
        ══════════════════════════════════════════════════ */}
        <RollingStrip dark={false} />

        {/* ══════════════════════════════════════════════════
            09  EDUCATION
        ══════════════════════════════════════════════════ */}
        <section style={{ background: "var(--cream)", color: "var(--dark)", padding: "3rem 0" }}>
          <div className="ds-container">
            <SectionLabel>Education</SectionLabel>
            <Education />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            10  SKILLS
        ══════════════════════════════════════════════════ */}
        <section style={{ background: "var(--cream)", padding: "3rem 0 4rem" }}>
          <div className="ds-container">
            <SectionLabel>Skills &amp; Tools</SectionLabel>
            <Skills />
          </div>
        </section>

        <div className="rounded-divider-top" aria-hidden="true" />
        <ContactFooter />

      </main>
    </>
  );
}
