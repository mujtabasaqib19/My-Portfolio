"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCE } from "@/data/portfolio";

const EXPO = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div style={{ marginTop: "0" }}>
      {EXPERIENCE.map((job, i) => {
        const isOpen = openIdx === i;
        return (
          <motion.div
            key={job.title + job.date}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ delay: i * 0.09, duration: 0.62, ease: EXPO }}
            whileHover={{ y: isOpen ? 0 : -2 }}
            style={{
              marginBottom: "1rem",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.72)",
              boxShadow: isOpen
                ? "0 8px 32px rgba(28,29,32,0.12), 0 2px 8px rgba(28,29,32,0.08)"
                : "0 2px 12px rgba(28,29,32,0.07), 0 1px 3px rgba(28,29,32,0.05)",
              transition: "box-shadow 0.25s ease",
              overflow: "hidden",
            }}
          >

            {/* Row */}
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? -1 : i)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "none",
                fontFamily: "inherit",
                color: "inherit",
                padding: "2rem 2rem",
                display: "grid",
                gridTemplateColumns: "200px 1fr auto",
                gap: "2rem",
                alignItems: "start",
              }}
            >
              {/* Left — date */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono, monospace)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.06em",
                    opacity: 0.6,
                    display: "block",
                    paddingTop: "0.2rem",
                    lineHeight: 1.6,
                  }}
                >
                  {job.date}
                </span>
              </div>

              {/* Center — logo + title + company + tags */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                  {job.logo && (
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 6,
                        overflow: "hidden",
                        border: "1px solid rgba(28,29,32,0.1)",
                        flexShrink: 0,
                        background: "#fff",
                      }}
                    >
                      <Image
                        src={job.logo}
                        alt={job.company}
                        width={36}
                        height={36}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>
                  )}
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        color: "var(--dark)",
                        lineHeight: 1.2,
                      }}
                    >
                      {job.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        opacity: 0.62,
                        marginTop: "0.2rem",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {job.company}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.85rem" }}>
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-jetbrains-mono, monospace)",
                        fontSize: "0.58rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.22rem 0.65rem",
                        border: "1px solid rgba(28,29,32,0.15)",
                        borderRadius: "2rem",
                        color: isOpen ? "var(--dark)" : "rgba(28,29,32,0.65)",
                        background: isOpen ? "rgba(28,29,32,0.05)" : "transparent",
                        transition: "color 0.22s, background 0.22s",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — expand indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "0.3rem",
                  gap: "0.5rem",
                }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.38, ease: EXPO }}
                  style={{
                    width: 28,
                    height: 28,
                    border: "1px solid rgba(28,29,32,0.18)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: isOpen ? "var(--dark)" : "transparent",
                    transition: "background 0.22s",
                  }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="5" y1="1" x2="5" y2="9"
                      stroke={isOpen ? "var(--cream)" : "var(--dark)"}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1" y1="5" x2="9" y2="5"
                      stroke={isOpen ? "var(--cream)" : "var(--dark)"}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </button>

            {/* Expanded bullets */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="bullets"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: EXPO }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "200px 1fr auto",
                      gap: "2rem",
                      paddingBottom: "2rem",
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                    }}
                  >
                    <div />
                    <ul
                      style={{
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.9rem",
                        borderLeft: "1px solid rgba(28,29,32,0.1)",
                        paddingLeft: "1.5rem",
                      }}
                    >
                      {job.bullets.map((b, bi) => (
                        <motion.li
                          key={bi}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: bi * 0.05, duration: 0.42, ease: EXPO }}
                          style={{
                            fontSize: "0.9rem",
                            lineHeight: 1.75,
                            color: "rgba(28,29,32,0.8)",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: "-1.72rem",
                              top: "0.62rem",
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              background: "#38BDF8",
                              flexShrink: 0,
                            }}
                          />
                          {b}
                        </motion.li>
                      ))}
                    </ul>
                    <div />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
