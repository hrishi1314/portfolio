"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/portfolio";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <section
      id="skills"
      className="section"
      ref={ref}
      aria-label="Skills section"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="section-inner">
        <div className="section-header">
          <motion.span
            className="section-label"
            {...item(0)}
            style={{ display: "block", marginBottom: "14px" }}
          >
            Skills
          </motion.span>
          <motion.h2
            {...item(0.08)}
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            Technical Skills
          </motion.h2>
          <motion.p
            {...item(0.15)}
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              marginTop: "14px",
              maxWidth: "480px",
              lineHeight: 1.7,
            }}
          >
            Technologies and tools I work with actively.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "16px",
          }}
        >
          {skills.map((category, ci) => (
            <motion.div
              key={category.category}
              {...item(0.18 + ci * 0.07)}
              className="card"
              style={{
                padding: "22px 24px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "var(--accent)", flexShrink: 0,
                }} aria-hidden="true" />
                <h3 style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}>
                  {category.category}
                </h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {category.skills.map((skill) => (
                  <span key={skill} className="badge badge-neutral">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
