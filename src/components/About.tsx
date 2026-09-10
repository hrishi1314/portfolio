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
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "48px",
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
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  letterSpacing: "0.01em",
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Focus & Engineering Principles Card */}
          <motion.div
            {...item(0.38)}
            className="card"
            style={{
              padding: "32px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Zap size={16} color="var(--accent)" />
                </div>
                <span
                  style={{
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Active Technical Focus
                </span>
              </div>

              <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {about.currentFocus.map((focusItem) => (
                  <li
                    key={focusItem}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "0.88rem",
                      color: "var(--text-primary)",
                      fontWeight: 600,
                      padding: "8px 12px",
                      background: "var(--bg-secondary)",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--accent)",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    {focusItem}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: "12px",
                }}
              >
                Engineering Philosophy:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  &bull; <strong style={{ color: "var(--text-primary)" }}>Algorithmic Rigor:</strong> Choosing optimal data structures (e.g. HashMaps for $O(1)$ lookups, PriorityQueues for dynamic ordering) before writing UI code.
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  &bull; <strong style={{ color: "var(--text-primary)" }}>Evidence Over Buzzwords:</strong> Building measurable pipelines with concrete datasets and evaluation metrics over theoretical talk.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
