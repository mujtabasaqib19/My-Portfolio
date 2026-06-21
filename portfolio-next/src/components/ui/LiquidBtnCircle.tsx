"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";

/* Dennis's exact liquid fill ease — Power2.easeInOut */
const LIQUID = [0.25, 0.25, 0, 1] as const;

/**
 * Circle CTA button with Dennis-style bidirectional liquid fill:
 * - Enter: fill sweeps UP from 76% below
 * - Leave: fill exits UP through the top (not back down)
 *
 * darkFill=true  → used on light (cream) backgrounds — fill is dark
 * darkFill=false → used on dark backgrounds — fill is cream
 */
export function LiquidBtnCircle({
  href,
  size = 130,
  darkFill = false,
  children,
  style: extraStyle,
}: {
  href: string;
  size?: number;
  darkFill?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const fill = useAnimation();
  const [hovered, setHovered] = useState(false);

  const onEnter = () => {
    setHovered(true);
    fill.set({ y: "76%" });
    fill.start({ y: "0%", transition: { duration: 0.52, ease: LIQUID } });
  };

  const onLeave = () => {
    setHovered(false);
    fill.start({ y: "-76%", transition: { duration: 0.52, ease: LIQUID } });
  };

  /* Text inverts once fill arrives */
  const baseColor  = darkFill ? "var(--dark)"  : "var(--cream)";
  const hoverColor = darkFill ? "var(--cream)"  : "var(--dark)";

  return (
    <a
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      suppressHydrationWarning
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid ${darkFill ? "rgba(28,29,32,0.35)" : "rgba(250,249,246,0.3)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        overflow: "hidden",
        flexShrink: 0,
        cursor: "none",
        ...extraStyle,
      }}
    >
      {/* Liquid fill — translates vertically */}
      <motion.div
        animate={fill}
        initial={{ y: "100%" }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: darkFill ? "var(--dark)" : "var(--cream)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Text — color inverts with transition */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          fontSize: "0.72rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          textAlign: "center",
          lineHeight: 1.45,
          pointerEvents: "none",
          color: hovered ? hoverColor : baseColor,
          transition: "color 0.18s",
        }}
      >
        {children}
      </span>
    </a>
  );
}
