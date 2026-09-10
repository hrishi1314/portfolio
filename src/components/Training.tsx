"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { trainings } from "@/data/portfolio";
import type { Training } from "@/data/portfolio";

// Accent color for the Training section — distinct from the Certificates palette
const TRAINING_ACCENT = "#6FA8C4"; // cool steel-blue: professional, distinct, harmonious

function TrainingCard({
  training,
  index,
  inView,
}: {
  training: Training;
  index: number;
  inView: boolean;
}) {
  const handleView = () => {
    if (training.fileType === "pdf") {
      window.open(training.filePath, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.08,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      style={{ width: "100%" }}
    >
      <div
        className="card"
        style={{
          padding: "32px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: "32px",
          alignItems: "center",
        }}
      >
        {/* Left: Technical Story & Competencies */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span
              className="badge"
              style={{
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                color: "var(--accent-emerald)",
                fontWeight: 700,
              }}
            >
              Grade A Distinction
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {training.date}
            </span>
          </div>

          <h3
            style={{
              fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              marginBottom: "10px",
            }}
          >
            {training.title}
          </h3>

          <p
            style={{
              fontSize: "0.86rem",
              fontWeight: 600,
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              marginBottom: "12px",
            }}
          >
            {training.organizer}
          </p>

          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: "20px",
            }}
          >
            {training.description}
          </p>

          <div>
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              Core Topics Mastered &amp; Implemented:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {[
                "Arrays & Vectors",
                "Linked Lists",
                "Stacks & Queues",
                "Priority Queues",
                "Binary Trees & BST",
                "Graph Traversals (BFS/DFS)",
                "Sorting & Search Algorithms",
                "Time & Space Complexity",
              ].map((topic) => (
                <span key={topic} className="badge-neutral" style={{ padding: "3px 9px", fontSize: "0.74rem" }}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Verified Accreditation Preview Frame */}
        <div
          onClick={handleView}
          style={{
            padding: "28px",
            background: "var(--bg-secondary)",
            borderRadius: "12px",
            border: "1px dashed var(--border)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "16px",
            cursor: "pointer",
            transition: "border-color 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BookOpen size={28} color="var(--accent)" />
          </div>

          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Official University Accreditation
            </h4>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              Issued by Centre for Professional Enhancement &bull; LPU
            </p>
            <p style={{ fontSize: "0.72rem", color: "var(--accent-emerald)", fontWeight: 600, marginTop: "2px" }}>
              Evaluation: Grade A (Highest Performance Tier)
            </p>
          </div>

          <button
            onClick={handleView}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem", padding: "10px 18px" }}
            aria-label="View official DSA Summer Course PDF certificate"
          >
            <ExternalLink size={15} />
            Inspect Verified Certificate PDF
          </button>
        </div>
      </div>
    </motion.div>
  );
}


export default function Training() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="training"
      className="section"
      ref={ref}
      aria-label="Training section"
    >
      <div className="section-inner">
        <div className="section-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ display: "block", marginBottom: "12px" }}
          >
            Training
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Training
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              marginTop: "12px",
            }}
          >
            Structured programmes and intensive courses completed beyond formal
            coursework.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {trainings.map((training, i) => (
            <TrainingCard
              key={training.id}
              training={training}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
