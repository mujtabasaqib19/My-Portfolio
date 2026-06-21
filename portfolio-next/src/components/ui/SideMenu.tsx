"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects",   href: "/#projects" },
  { label: "Contact",    href: "/contact" },
];

const SOCIALS = [
  { label: "LinkedIn",     href: "https://www.linkedin.com/in/mujtaba-saqib" },
  { label: "GitHub",       href: "https://github.com/mujtabasaqib19" },
  { label: "DS Portfolio", href: "https://www.datascienceportfol.io/mujtabasaqib654" },
  { label: "Email",        href: "mailto:mujtabasaqib654@gmail.com" },
];

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

export function SideMenu({ open, onClose }: SideMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const glow = glowRef.current;
    const panel = panelRef.current;
    if (!glow || !panel) return;
    const rect = panel.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left}px`;
    glow.style.top  = `${e.clientY - rect.top}px`;
    glow.style.opacity = "1";
  }, []);

  const onMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  return (
    <>
      {/* Overlay — CSS opacity transition, zero JS */}
      <div
        className={`side-menu-overlay${open ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — CSS transform transition, zero JS */}
      <div
        ref={panelRef}
        className={`side-menu${open ? " is-open" : ""}`}
        aria-modal="true"
        role="dialog"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Mouse-follow glow blob */}
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            width: 280, height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(250,249,246,0.04) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.3s ease",
            zIndex: 0,
          }}
        />

        <button className="side-menu-close" onClick={onClose} style={{ position: "relative", zIndex: 1 }}>
          Close ✕
        </button>

        {/* Navigation */}
        <div style={{ marginTop: "2rem", marginBottom: "3rem", position: "relative", zIndex: 1 }}>
          <p className="side-menu-section-label">Navigation</p>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.5rem" }} />
          {NAV_LINKS.map((link, i) => (
            <div
              key={link.label}
              className="side-menu-link-row"
              style={{ transitionDelay: open ? `${i * 0.04}s` : "0s" }}
            >
              <Link
                href={link.href}
                className="side-menu-nav-link"
                onClick={onClose}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div style={{ marginTop: "auto", position: "relative", zIndex: 1 }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.5rem" }} />
          <p className="side-menu-section-label">Socials</p>
          <div style={{ marginTop: "0.75rem" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="side-menu-social-link"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
