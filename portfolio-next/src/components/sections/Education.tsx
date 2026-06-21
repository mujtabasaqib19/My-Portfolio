"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EDUCATION } from "@/data/portfolio";

const EXPO = [0.16, 1, 0.3, 1] as const;

export function Education() {
  return (
    <div>
      {EDUCATION.map((edu, i) => {
        const isLast = i === EDUCATION.length - 1;
        return (
          <div
            key={edu.institution + edu.period}
            className="edu-item"
            style={{
              display: "grid",
              gridTemplateColumns: "64px 1fr",
              gap: "2rem",
            }}
          >
            {/* Left — logo + connecting line */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Logo — spring pop-in */}
              <motion.div
                className="edu-logo"
                initial={{ scale: 0.35, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 20,
                  delay: i * 0.16,
                }}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {edu.logo ? (
                  <Image
                    src={edu.logo}
                    alt={edu.institution}
                    width={38}
                    height={38}
                    style={{
                      objectFit: "contain",
                      width: "68%",
                      height: "68%",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--dark)",
                      opacity: 0.3,
                    }}
                  >
                    {edu.institution[0]}
                  </span>
                )}
              </motion.div>

              {/* Connecting line — draws downward */}
              {!isLast && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.16 + 0.28,
                    duration: 0.65,
                    ease: EXPO,
                  }}
                  style={{
                    width: 1,
                    flex: 1,
                    minHeight: "2.5rem",
                    marginTop: "0.65rem",
                    marginBottom: "0.65rem",
                    transformOrigin: "top",
                    background:
                      "linear-gradient(to bottom, rgba(28,29,32,0.18) 0%, rgba(28,29,32,0.04) 100%)",
                  }}
                />
              )}
            </div>

            {/* Right — content slides in */}
            <motion.div
              initial={{ x: 36, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.16 + 0.1,
                duration: 0.65,
                ease: EXPO,
              }}
              style={{
                paddingBottom: isLast ? 0 : "2.75rem",
                paddingTop: "0.2rem",
              }}
            >
              <div className="edu-content-inner">
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono, monospace)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(28,29,32,0.72)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {edu.period}
                </span>

                <p
                  style={{
                    fontSize: "clamp(1rem, 1.7vw, 1.18rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "var(--dark)",
                    lineHeight: 1.25,
                    marginBottom: "0.3rem",
                  }}
                >
                  {edu.degree}
                </p>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(28,29,32,0.85)",
                    letterSpacing: "0.01em",
                    lineHeight: 1.5,
                  }}
                >
                  {edu.institution}
                </p>

                {edu.detail && (
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(28,29,32,0.72)",
                      marginTop: "0.5rem",
                      lineHeight: 1.65,
                      fontStyle: "italic",
                    }}
                  >
                    {edu.detail}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
