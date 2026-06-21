"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* Color palettes for placeholder tiles */
const ROW1_COLORS = ["#1a1f2e", "#1e2318", "#241a18", "#181f24", "#1e1a2e"];
const ROW2_COLORS = ["#1f2318", "#1a1c28", "#201818", "#1c2420", "#211e18"];

function HItem({ bg }: { bg: string }) {
  return (
    <div className="h-item">
      <div
        style={{
          background: bg,
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
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(250,249,246,0.12)",
          }}
        >
          Photo
        </span>
      </div>
    </div>
  );
}

export function HorizontalItems() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Row 1 moves left, row 2 moves right */
  const x1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={ref}
      className="horizontal-items-section"
      style={{ paddingTop: "3rem", paddingBottom: "3rem", overflow: "hidden" }}
    >
      <motion.div className="h-row" style={{ x: x1 }}>
        {ROW1_COLORS.map((c, i) => (
          <HItem key={i} bg={c} />
        ))}
      </motion.div>

      <motion.div className="h-row" style={{ x: x2 }}>
        {ROW2_COLORS.map((c, i) => (
          <HItem key={i} bg={c} />
        ))}
      </motion.div>
    </section>
  );
}
