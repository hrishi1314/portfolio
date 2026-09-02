"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Eye } from "lucide-react";
import { personal } from "@/data/portfolio";

export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="resume"
      className="section"
      ref={ref}
      aria-label="Resume section"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="section-inner">
        {/* Full-width CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="card"
          style={{
            padding: "52px 48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(17,19,24,0.8) 100%)",
          }}
        >
          {/* Subtle glow */}
          <div aria-hidden="true" style={{
            position: "absolute",
            top: "-30%", left: "50%",
            transform: "translateX(-50%)",
            width: "400px", height: "200px",
            background: "radial-gradient(ellipse, rgba(208,138,75,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Top line */}
          <div aria-hidden="true" style={{
            position: "absolute",
            top: 0, left: "20%", right: "20%", height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(208,138,75,0.30), transparent)",
          }} />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "14px",
              lineHeight: 1.2,
              position: "relative",
            }}
          >
            Want the complete picture?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "420px",
              marginBottom: "36px",
              position: "relative",
            }}
          >
            Full overview of my education, technical skills, projects, and
            certificates — all in one document.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", position: "relative" }}
          >
            <a
              href={personal.resumePath}
              download
              className="btn-primary"
              aria-label="Download Resume PDF"
            >
              <Download size={16} />
              Download Resume
            </a>
            <a
              href={personal.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              aria-label="View Resume in browser"
            >
              <Eye size={16} />
              View Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
