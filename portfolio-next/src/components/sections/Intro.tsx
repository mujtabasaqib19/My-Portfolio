"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function LineReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className="line-overflow" style={{ display: "block" }}>
      <motion.div
        className={className}
        initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
        whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 0.82, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Intro() {
  return (
    <section className="intro-section" id="about">
      {/* Rounded top — continues from dark hero */}
      <div
        style={{
          height: "4rem",
          background: "#1C1D20",
          borderRadius: "0 0 3rem 3rem",
          marginTop: "-4rem",
          marginBottom: "6rem",
        }}
        aria-hidden="true"
      />

      <div className="ds-container medium">
        <div className="intro-grid">

          {/* Left — profile photo */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ delay: 0.05, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              borderRadius: "0.75rem",
              overflow: "hidden",
              width: "100%",
              maxHeight: "600px",
            }}
          >
            <Image
              src="/about_photo.svg"
              alt="Mujtaba Saqib"
              width={810}
              height={1012}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              priority
            />
          </motion.div>

          {/* Right — statement + paragraph + CTA */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "2rem",
              paddingTop: "1rem",
            }}
          >
            <h4 className="ds-h4" style={{ lineHeight: 1.3 }}>
              <LineReveal delay={0.1}>
                Helping data teams to build
              </LineReveal>
              <LineReveal delay={0.2}>
                reliable infrastructure. Scalable
              </LineReveal>
              <LineReveal delay={0.3}>
                ETL pipelines, cloud warehouses,
              </LineReveal>
              <LineReveal delay={0.4}>
                and AI-powered analytics.
              </LineReveal>
            </h4>

            <motion.p
              className="ds-p"
              style={{ opacity: 0.65, maxWidth: "38ch" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 0.65, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ delay: 0.45, duration: 0.75 }}
            >
              The combination of my passion for data engineering, machine
              learning &amp; system design positions me in a unique place in
              the data world. I build things teams actually rely on.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ delay: 0.55, duration: 0.65, ease: "backOut" }}
            >
              <Link href="/about" className="btn-circle">
                <span className="btn-circle-text">
                  More
                  <br />
                  about me
                </span>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
