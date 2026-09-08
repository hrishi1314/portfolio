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
    >
      <div
        className="card card-glow"
        style={{
          padding: "24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${TRAINING_ACCENT}, transparent)`,
          }}
        />

        {/* Icon + Organizer */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: `${TRAINING_ACCENT}18`,
              border: `1px solid ${TRAINING_ACCENT}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BookOpen size={18} color={TRAINING_ACCENT} />
          </div>
          <div>
            <p
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: TRAINING_ACCENT,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em",
              }}
            >
              {training.organizer}
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
            >
              {training.date}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1.35,
            flex: 1,
          }}
        >
          {training.title}
        </h3>

        {/* Description */}
        {training.description && (
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            {training.description}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={handleView}
            className="btn-ghost"
            style={{ flex: 1, justifyContent: "center" }}
            aria-label={`View ${training.title} certificate`}
          >
            <ExternalLink size={14} />
            View Certificate
          </button>
          {training.verificationUrl && (
            <a
              href={training.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label={`Verify ${training.title}`}
            >
              <ExternalLink size={14} />
              Verify
            </a>
          )}
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
