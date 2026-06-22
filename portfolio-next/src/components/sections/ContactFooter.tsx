"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { LiquidBtnCircle } from "@/components/ui/LiquidBtnCircle";
import { MagneticWrap } from "@/components/ui/MagneticWrap";

const EXPO = [0.16, 1, 0.3, 1] as const;

function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <div ref={ref} style={{ overflow: "hidden", paddingBottom: "0.12em" }}>
      <motion.div
        initial={{ y: "108%" }}
        animate={{ y: inView ? "0%" : "108%" }}
        transition={{ duration: 0.95, delay, ease: EXPO }}
      >
        {children}
      </motion.div>
    </div>
  );
}


function LiveTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-PK", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }) + " PKT"
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

const SOCIALS = [
  { label: "LinkedIn",     href: "https://www.linkedin.com/in/mujtaba-saqib" },
  { label: "GitHub",       href: "https://github.com/mujtabasaqib19" },
  { label: "DS Portfolio", href: "https://www.datascienceportfol.io/mujtabasaqib654" },
];

export function ContactFooter() {
  return (
    <section id="contact" className="contact-footer theme-dark">
      <div className="ds-container medium">

        {/* Heading */}
        <div className="contact-heading-row">
          <h2 className="ds-h2">
            <span style={{ display: "flex", alignItems: "center", gap: "clamp(0.6rem, 1.2vw, 1rem)" }}>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.14 }}
                style={{
                  display: "inline-block",
                  width: "clamp(48px, 4.5vw, 72px)",
                  height: "clamp(48px, 4.5vw, 72px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  verticalAlign: "middle",
                  position: "relative",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                }}
              >
                <Image
                  src="/about_photo.svg"
                  alt=""
                  fill
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  aria-hidden="true"
                />
              </motion.span>
              <LineReveal delay={0.05}>Let&apos;s work</LineReveal>
            </span>
            <LineReveal delay={0.2}>together</LineReveal>
          </h2>
        </div>

        {/* Stripe + CTA */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: "2rem",
            margin: "2rem 0",
          }}
        >
          <motion.div
            className="stripe"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.82, ease: EXPO }}
          />

          <MagneticWrap strength={30}>
            <LiquidBtnCircle href="mailto:mujtabasaqib654@gmail.com" size={130} darkFill={false}>
              Get in
              <br />
              touch
            </LiquidBtnCircle>
          </MagneticWrap>
        </div>

        {/* Email + LinkedIn */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "2.5rem" }}>
          <motion.a
            href="mailto:mujtabasaqib654@gmail.com"
            suppressHydrationWarning
            style={{
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              color: "var(--cream)",
              textDecoration: "none",
              opacity: 0.7,
              letterSpacing: "0.01em",
              transition: "opacity 0.2s",
            }}
            whileHover={{ opacity: 1 }}
          >
            mujtabasaqib654@gmail.com
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/mujtaba-saqib"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
            style={{
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              color: "var(--cream)",
              textDecoration: "none",
              opacity: 0.7,
              letterSpacing: "0.01em",
              transition: "opacity 0.2s",
            }}
            whileHover={{ opacity: 1 }}
          >
            LinkedIn →
          </motion.a>
        </div>

        {/* Footer bottom */}
        <div className="contact-footer-bottom">
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <p className="footer-meta-label">Version</p>
              <p className="footer-meta-value">2026 © Edition</p>
            </div>
            <div>
              <p className="footer-meta-label">Local time</p>
              <p className="footer-meta-value"><LiveTime /></p>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p className="footer-meta-label">Socials</p>
            <div style={{ marginTop: "0.35rem" }}>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginBottom: "0.75rem" }} />
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "var(--cream)",
                    textDecoration: "none",
                    opacity: 0.5,
                    marginBottom: "0.3rem",
                    transition: "opacity 0.2s",
                    letterSpacing: "0.01em",
                  }}
                  suppressHydrationWarning
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "0.5")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
