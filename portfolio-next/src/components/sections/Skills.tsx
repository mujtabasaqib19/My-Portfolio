"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/data/portfolio";

const EXPO = [0.16, 1, 0.3, 1] as const;

export function Skills() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "2.5rem 3rem",
      }}
    >
      {SKILLS.map((group, i) => (
        <div key={group.title}>
          <motion.p
            initial={{ x: -16, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ delay: (i % 3) * 0.07, duration: 0.48, ease: EXPO }}
            style={{
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              opacity: 0.65,
              marginBottom: "0.9rem",
              color: "var(--dark)",
            }}
          >
            {group.title}
          </motion.p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {group.items.map((item, pi) => (
              <motion.span
                key={item}
                initial={{ scale: 0.72, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: (i % 3) * 0.07 + pi * 0.035,
                }}
                style={{
                  fontSize: "0.82rem",
                  padding: "0.3rem 0.75rem",
                  border: "1px solid rgba(28,29,32,0.22)",
                  borderRadius: "2rem",
                  color: "rgba(28,29,32,0.85)",
                  letterSpacing: "0.01em",
                  cursor: "default",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(28,29,32,0.5)";
                  el.style.color = "var(--dark)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(28,29,32,0.22)";
                  el.style.color = "rgba(28,29,32,0.85)";
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
