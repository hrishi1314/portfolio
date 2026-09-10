"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BookOpen, Calendar } from "lucide-react";
import { education } from "@/data/portfolio";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <section id="education" className="section" ref={ref} aria-label="Education section">
      <div className="section-inner">
        <div className="section-header">
          <motion.span
            className="section-label"
            {...item(0)}
            style={{ display: "block", marginBottom: "14px" }}
          >
            Education
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
            Education
          </motion.h2>
        </div>

        <motion.div
          {...item(0.18)}
          className="card"
          style={{
            padding: "36px",
            position: "relative",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
            gap: "36px",
            alignItems: "start",
          }}
        >
          {/* Left accent line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "3px",
              background: "linear-gradient(to bottom, var(--accent), var(--accent-dim))",
              borderRadius: "0 2px 2px 0",
            }}
          />

          {/* Left Side: Institution & Academic Focus */}
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "24px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <GraduationCap size={22} color="var(--accent)" />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "5px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {education.institution}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    marginBottom: "12px",
                    lineHeight: 1.5,
                  }}
                >
                  {education.degree}
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <Calendar size={12} /> {education.period}
                  </span>
                  <span
                    style={{
                      padding: "4px 12px",
                      background: "rgba(16, 185, 129, 0.08)",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                      borderRadius: "20px",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--accent-emerald)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    CGPA: {education.cgpa} / 10.0
                  </span>
                </div>
              </div>
            </div>

            {/* Focus */}
            <div
              style={{
                padding: "16px 18px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Academic Specialization:
              </p>
              <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600, lineHeight: 1.5 }}>
                {education.focus}
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px", lineHeight: 1.5 }}>
                Rigorous training in algorithm design, machine learning foundations, and system software engineering.
              </p>
            </div>
          </div>

          {/* Right Side: Coursework Matrix */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <BookOpen size={16} color="var(--accent)" />
              <p
                style={{
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Verified Coursework &amp; Core Computer Science
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "18px" }}>
              {education.coursework.map((course) => (
                <div
                  key={course}
                  style={{
                    padding: "10px 14px",
                    background: "var(--bg-secondary)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
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
                  />
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {course}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "12px 16px",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-border)",
                borderRadius: "8px",
              }}
            >
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Academic coursework directly backed by the practical implementations showcased above.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
