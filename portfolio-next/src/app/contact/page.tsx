"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";

/* ── Live clock ─────────────────────────────────────────────── */
function LiveTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-PK", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }) + " PKT"
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

/* ── Form field ─────────────────────────────────────────────── */
function Field({
  num,
  label,
  children,
  delay = 0,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.62, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: "flex",
        gap: "clamp(1rem, 3vw, 2.5rem)",
        alignItems: "flex-start",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "2.25rem 0",
      }}
    >
      {/* Number */}
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono, monospace)",
          fontSize: "0.68rem",
          opacity: 0.65,
          letterSpacing: "0.06em",
          lineHeight: 1,
          paddingTop: "0.2rem",
          width: 28,
          flexShrink: 0,
        }}
      >
        {num}
      </span>

      {/* Label + field */}
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            opacity: 0.72,
            marginBottom: "0.85rem",
            fontFamily: "var(--font-jetbrains-mono, monospace)",
          }}
        >
          {label}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

/* ── Shared input / textarea style ──────────────────────────── */
const fieldStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  background: "none",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  color: "var(--cream)",
  fontFamily: "var(--font-plus-jakarta, sans-serif)",
  fontSize: "clamp(1.15rem, 2.2vw, 1.55rem)",
  fontWeight: 300,
  letterSpacing: "-0.01em",
  lineHeight: 1.4,
  padding: "0.6rem 0 0.75rem",
  outline: "none",
  resize: "none",
  transition: "border-color 0.25s",
};

/* ── Page ────────────────────────────────────────────────────── */
type FormData = {
  name: string;
  email: string;
  organization: string;
  services: string[];
  message: string;
};

const SERVICE_OPTIONS = [
  "Data Engineering",
  "Machine Learning & AI",
  "Analytics & BI",
  "Data Consulting",
];

const CONTACT_DETAILS = [
  { label: "Email", value: "mujtabasaqib654@gmail.com", href: "mailto:mujtabasaqib654@gmail.com" },
  { label: "Location", value: "Pakistan" },
];

const SOCIALS = [
  { label: "LinkedIn",     href: "https://www.linkedin.com/in/mujtaba-saqib" },
  { label: "GitHub",       href: "https://github.com/mujtabasaqib19" },
  { label: "DS Portfolio", href: "https://www.datascienceportfol.io/mujtabasaqib654" },
];

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    services: [],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (s: string) =>
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry from ${form.name || "your website"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Organization: ${form.organization || "—"}`,
        `Services: ${form.services.join(", ") || "—"}`,
        "",
        form.message,
      ].join("\n")
    );
    window.location.href = `mailto:mujtabasaqib654@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />

      <main style={{ background: "var(--dark)", minHeight: "100vh", color: "var(--cream)" }}>

        {/* ── Page header ───────────────────────────────── */}
        <section
          style={{
            padding: "clamp(7rem, 14vh, 11rem) clamp(1.5rem, 5vw, 4rem) 5rem",
            maxWidth: 1380,
            margin: "0 auto",
          }}
        >
          {/* Label */}
          <motion.p
            style={{
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              opacity: 0.75,
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              marginBottom: "2.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.22, duration: 0.72 }}
          >
            Contact
          </motion.p>

          {/* Heading + avatar row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <motion.h1
              className="ds-h2"
              style={{ maxWidth: 720 }}
              initial={{ opacity: 0, y: 55 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Let&apos;s start a&nbsp;project
              <br />
              together
            </motion.h1>

            {/* Avatar — photo placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.72, ease: "backOut" }}
              style={{
                width: "clamp(64px, 8vw, 96px)",
                height: "clamp(64px, 8vw, 96px)",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                flexShrink: 0,
                marginTop: "0.5rem",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src="/about_photo.svg"
                alt="Mujtaba Saqib"
                fill
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
              />
            </motion.div>
          </div>
        </section>

        {/* ── Two-column: form + details ────────────────── */}
        <section
          style={{
            padding: "0 clamp(1.5rem, 5vw, 4rem) 7rem",
            maxWidth: 1380,
            margin: "0 auto",
            display: "grid",
            gap: "clamp(2.5rem, 5vw, 5rem)",
            alignItems: "start",
          }}
          className="contact-cols"
        >
          {/* ── Form column ─────────────────────────────── */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ padding: "4rem 0" }}
            >
              <h3
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  marginBottom: "1rem",
                }}
              >
                Message sent!
              </h3>
              <p style={{ opacity: 0.85, fontSize: "1rem", lineHeight: 1.7 }}>
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* 01 Name */}
              <Field num="01" label="What's your name?" delay={0.6}>
                <input
                  type="text"
                  placeholder="John, nice to meet you *"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  style={fieldStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.35)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.1)")}
                />
              </Field>

              {/* 02 Email */}
              <Field num="02" label="What's your email?" delay={0.75}>
                <input
                  type="email"
                  placeholder="hello@company.com *"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                  style={fieldStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.35)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.1)")}
                />
              </Field>

              {/* 03 Organization */}
              <Field num="03" label="What's your organization?" delay={0.9}>
                <input
                  type="text"
                  placeholder="Company Inc."
                  value={form.organization}
                  onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))}
                  style={fieldStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.35)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.1)")}
                />
              </Field>

              {/* 04 Services */}
              <Field num="04" label="What are you looking for?" delay={1.05}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingTop: "0.25rem" }}>
                  {SERVICE_OPTIONS.map((s) => {
                    const active = form.services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        style={{
                          padding: "0.45rem 1.1rem",
                          borderRadius: "2rem",
                          border: "1px solid",
                          borderColor: active ? "var(--cream)" : "rgba(255,255,255,0.18)",
                          background: active ? "var(--cream)" : "transparent",
                          color: active ? "var(--dark)" : "rgba(250,249,246,0.88)",
                          fontSize: "0.82rem",
                          fontFamily: "inherit",
                          letterSpacing: "0.02em",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (!active) {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.45)";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--cream)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!form.services.includes(s)) {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
                            (e.currentTarget as HTMLButtonElement).style.color = "rgba(250,249,246,0.88)";
                          }
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </Field>

              {/* 05 Message */}
              <Field num="05" label="Your message" delay={1.2}>
                <textarea
                  rows={5}
                  placeholder="Hello Mujtaba, can you help me with ..."
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  style={fieldStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.35)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.1)")}
                />
              </Field>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.62 }}
                style={{ paddingTop: "2rem", paddingBottom: "2rem", display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  type="submit"
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: "50%",
                    border: "1px solid rgba(250,249,246,0.3)",
                    background: "none",
                    color: "var(--cream)",
                    fontFamily: "inherit",
                    fontSize: "0.8rem",
                    letterSpacing: "0.04em",
                    position: "relative",
                    overflow: "hidden",
                    transition: "color 0.4s",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget;
                    btn.style.color = "var(--dark)";
                    const fill = btn.querySelector(".btn-fill") as HTMLElement;
                    if (fill) fill.style.height = "100%";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget;
                    btn.style.color = "var(--cream)";
                    const fill = btn.querySelector(".btn-fill") as HTMLElement;
                    if (fill) fill.style.height = "0%";
                  }}
                >
                  <span
                    className="btn-fill"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "0%",
                      background: "var(--cream)",
                      transition: "height 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                    }}
                  />
                  <span style={{ position: "relative", zIndex: 1 }}>Send it!</span>
                </button>
              </motion.div>
            </form>
          )}

          {/* ── Contact details sidebar ──────────────────── */}
          <motion.aside
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.82 }}
            style={{ paddingTop: "0.5rem" }}
          >
            {/* Contact details */}
            <div style={{ marginBottom: "3rem" }}>
              <p
                style={{
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  opacity: 0.72,
                  fontFamily: "var(--font-jetbrains-mono, monospace)",
                  marginBottom: "1.25rem",
                }}
              >
                Contact Details
              </p>
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: "1.25rem",
                }}
              >
                {CONTACT_DETAILS.map((d) => (
                  <div key={d.label} style={{ marginBottom: "1rem" }}>
                    <p
                      style={{
                        fontSize: "0.62rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        opacity: 0.68,
                        marginBottom: "0.2rem",
                      }}
                    >
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--cream)",
                          textDecoration: "none",
                          opacity: 0.92,
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.opacity = "1")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.opacity = "0.92")
                        }
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: "0.9rem", opacity: 0.92 }}>{d.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div style={{ marginBottom: "3rem" }}>
              <p
                style={{
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  opacity: 0.72,
                  fontFamily: "var(--font-jetbrains-mono, monospace)",
                  marginBottom: "1.25rem",
                }}
              >
                Socials
              </p>
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--cream)",
                      textDecoration: "none",
                      opacity: 0.88,
                      transition: "opacity 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.opacity = "1")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.opacity = "0.88")
                    }
                  >
                    {s.label}
                    <span style={{ opacity: 0.4, fontSize: "0.75rem" }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Local time */}
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  opacity: 0.72,
                  fontFamily: "var(--font-jetbrains-mono, monospace)",
                  marginBottom: "0.5rem",
                }}
              >
                Local time
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.88,
                  fontFamily: "var(--font-jetbrains-mono, monospace)",
                }}
              >
                <LiveTime />
              </p>
            </div>
          </motion.aside>
        </section>

        {/* ── Footer bar ───────────────────────────────── */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "2rem clamp(1.5rem, 5vw, 4rem)",
            maxWidth: 1380,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: "0.78rem",
              opacity: 0.72,
              letterSpacing: "0.01em",
            }}
          >
            2024 © Edition
          </p>
          <p
            style={{
              fontSize: "0.78rem",
              opacity: 0.72,
              letterSpacing: "0.01em",
            }}
          >
            Mujtaba Saqib — Data Engineer &amp; AI Specialist
          </p>
        </footer>
      </main>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 860px) {
          .contact-cols {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </>
  );
}
