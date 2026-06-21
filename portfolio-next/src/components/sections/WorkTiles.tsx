"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/portfolio";

const TILES = PROJECTS.slice(0, 4);
const EXPO = [0.16, 1, 0.3, 1] as const;

export function WorkTiles() {
  return (
    <section className="work-tiles">
      <div className="ds-container">
        <div className="tiles-grid">
          {TILES.map((project, i) => (
            <motion.div
              key={project.title}
              className="tile-wrap"
              initial={{ x: i % 2 === 0 ? -50 : 50, y: 80, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{
                delay: (i % 2) * 0.12,
                duration: 1.1,
                ease: EXPO,
                opacity: { duration: 0.3, delay: (i % 2) * 0.12 },
              }}
            >
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                {/* Image block */}
                <div className="tile-image-block">
                  <div
                    style={{
                      background: project.bgColor,
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 600px) 100vw, 50vw"
                      />
                    ) : (
                      <span
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-jetbrains-mono, monospace)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.2)",
                          textAlign: "center",
                          padding: "1rem",
                        }}
                      >
                        {project.title}
                      </span>
                    )}
                  </div>
                </div>

                {/* Meta */}
                <div className="tile-meta">
                  <div>
                    <h4 className="tile-title">{project.title}</h4>
                    <motion.div
                      className="stripe"
                      style={{ marginTop: "0.7rem", marginBottom: "0.5rem" }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.16 + (i % 2) * 0.12, duration: 0.7, ease: EXPO }}
                    />
                    <p className="tile-sub">{project.discipline}</p>
                  </div>
                  <p className="tile-sub" style={{ marginTop: "0.15rem" }}>
                    {project.year}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
