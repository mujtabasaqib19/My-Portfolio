"use client";

import { useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export function MagneticWrap({
  children,
  strength = 40,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left - r.width / 2) / r.width) * strength);
    y.set(((e.clientY - r.top - r.height / 2) / r.height) * strength);
  };

  const onLeave = () => {
    /* Elastic snap-back — same as Dennis's Elastic.easeOut */
    animate(x, 0, { type: "spring", stiffness: 160, damping: 10, mass: 0.8 });
    animate(y, 0, { type: "spring", stiffness: 160, damping: 10, mass: 0.8 });
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
