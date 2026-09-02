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
            maxWidth: "680px",
            padding: "36px",
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {/* Left accent line */}
          <div aria-hidden="true" style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: "3px",
            background: "linear-gradient(to bottom, var(--accent), rgba(208,138,75,0.15))",
            borderRadius: "0 2px 2px 0",
          }} />

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "28px" }}>
            <div style={{
              width: "50px", height: "50px", borderRadius: "12px",
              background: "var(--accent-dim)",
              border: "1px solid var(--accent-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <GraduationCap size={22} color="var(--accent)" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "5px",
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}>
                {education.institution}
              </h3>
              <p style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                marginBottom: "12px",
                lineHeight: 1.5,
              }}>
                {education.degree}
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  fontSize: "0.78rem", color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}>
                  <Calendar size={12} /> {education.period}
                </span>
                <span style={{
                  padding: "3px 10px",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                }}>
                  CGPA {education.cgpa}
                </span>
              </div>
            </div>
          </div>

          {/* Focus */}
          <div style={{
            padding: "14px 16px",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            marginBottom: "24px",
          }}>
            <p style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}>
              Academic Focus
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 500, lineHeight: 1.5 }}>
              {education.focus}
            </p>
          </div>

          {/* Coursework */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
              <BookOpen size={13} color="var(--text-muted)" />
              <p style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>
                Relevant Coursework
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {education.coursework.map((course) => (
                <span key={course} className="badge badge-neutral">{course}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
