"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olá",
  "Hallå",
  "Guten tag",
  "Hallo",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [wordIdx, setWordIdx] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setProgress(Math.round((current / WORDS.length) * 100));
      if (current >= WORDS.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 950);
        }, 360);
      } else {
        setWordIdx(current);
      }
    }, 310);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      animate={exiting ? { y: "-100%" } : { y: "0%" }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
      style={{ position: "fixed", inset: 0, zIndex: 9998 }}
    >
      {/* Word */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={wordIdx}
          className="loading-word"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {WORDS[wordIdx]}
          <span className="loading-dot">.</span>
        </motion.h2>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="loading-bar" style={{ width: "100%" }} />
      <motion.div
        className="loading-bar-fill"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
