"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { about } from "@/data/portfolio";
import { Zap } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <section id="about" className="section" ref={ref} aria-label="About section">
      <div className="section-inner">
        <div className="section-header">
          <motion.span
            className="section-label"
            {...item(0)}
            style={{ display: "block", marginBottom: "14px" }}
          >
            About
          </motion.span>
          <motion.h2
            {...item(0.08)}
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}
          >
            About Me
          </motion.h2>
        </div>

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "56px",
            alignItems: "start",
          }}
        >
          {/* Text column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {about.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                {...item(0.14 + i * 0.1)}
                style={{
                  fontSize: "1.025rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  letterSpacing: "0.01em",
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Focus card */}
          <motion.div
            {...item(0.38)}
            className="card card-glow"
            style={{
              padding: "26px",
              position: "sticky",
              top: "88px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "9px",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Zap size={15} color="var(--accent)" />
              </div>
              <span style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}>
                Currently focused on
              </span>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {about.currentFocus.map((focusItem) => (
                <li
                  key={focusItem}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "0.88rem",
                    color: "var(--text-primary)",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0, marginTop: "6px",
                  }} aria-hidden="true" />
                  {focusItem}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
