"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Users } from "lucide-react";
import { GitHubIcon } from "@/components/SocialIcons";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
  onViewDetails: (project: Project) => void;
}

export default function ProjectCard({
  project,
  index,
  inView,
  onViewDetails,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    // 8° max tilt — visible but not disorienting
    setTilt({ x: dy * -8, y: dx * 8 });
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{
        duration: 0.6,
        delay: 0.08 + index * 0.14,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ height: "100%" }}
    >
      <div
        ref={cardRef}
        data-cursor-hover
        className="project-card"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "28px",
          position: "relative",
          overflow: "hidden",
          background: "var(--bg-card)",
          border: `1px solid ${isHovered ? "var(--border-hover)" : "var(--border)"}`,
          borderRadius: "14px",
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transition: isHovered
            ? "transform 0.08s linear, border-color 0.2s, box-shadow 0.2s"
            : "transform 0.55s cubic-bezier(0.16,1,0.3,1), border-color 0.2s, box-shadow 0.2s",
          willChange: "transform",
          boxShadow: isHovered
            ? "0 0 0 1px rgba(208,138,75,0.2), 0 24px 64px rgba(0,0,0,0.5), 0 0 60px rgba(208,138,75,0.07)"
            : "0 2px 12px rgba(0,0,0,0.2)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cursor-reactive glow — stronger intensity */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(208,138,75,${isHovered ? "0.11" : "0"}) 0%, transparent 65%)`,
            pointerEvents: "none",
            transition: "opacity 0.3s",
            borderRadius: "inherit",
          }}
        />

        {/* Top shimmer line on hover */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(208,138,75,0.45), transparent)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        {/* Title + Group badge */}
        <div style={{ marginBottom: "14px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "10px",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.3,
                flex: 1,
                letterSpacing: "-0.01em",
              }}
            >
              {project.title}
            </h3>
            {project.isGroupProject && (
              <span
                title="Group project — my individual contribution is described below"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "3px 8px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  fontSize: "0.68rem",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                }}
              >
                <Users size={9} />
                Group
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            {project.shortDescription}
          </p>
        </div>

        {/* My Contribution callout (Only for group projects) */}
        {project.isGroupProject && project.myContribution && (
          <div
            style={{
              padding: "12px 14px",
              background: "rgba(208,138,75,0.06)",
              border: "1px solid rgba(208,138,75,0.16)",
              borderRadius: "8px",
              marginBottom: "18px",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
                marginBottom: "6px",
                textTransform: "uppercase",
              }}
            >
              My Contribution
            </p>
            <p
              style={{
                fontSize: "0.825rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
              }}
            >
              {project.myContribution}
            </p>
          </div>
        )}

        {/* How It Works callout (only for individual projects) */}
        {!project.isGroupProject && project.howItWorks && (
          <div
            style={{
              padding: "12px 14px",
              background: "rgba(208,138,75,0.06)",
              border: "1px solid rgba(208,138,75,0.16)",
              borderRadius: "8px",
              marginBottom: "18px",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
                marginBottom: "6px",
                textTransform: "uppercase",
              }}
            >
              How It Works
            </p>
            <p
              style={{
                fontSize: "0.825rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
              }}
            >
              {project.howItWorks}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "16px",
          }}
        >
          {project.techStack.map((tech) => (
            <span key={tech} className="badge">
              {tech}
            </span>
          ))}
        </div>

        {/* Key Highlights */}
        {project.keyHighlights && (
          <div
            style={{
              padding: "9px 12px",
              background: "rgba(242, 239, 234, 0.03)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                fontSize: "0.67rem",
                fontWeight: 700,
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Key Highlights
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                letterSpacing: "0.01em",
                lineHeight: 1.4,
              }}
            >
              {project.keyHighlights}
            </p>
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => onViewDetails(project)}
            className="btn-primary"
            style={{ padding: "9px 16px", fontSize: "0.84rem", flex: 1, gap: "6px" }}
            aria-label={`View details for ${project.title}`}
          >
            View Details
            <motion.span
              animate={isHovered ? { x: 3 } : { x: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "inline-flex" }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </button>

          {!project.githubUrl.startsWith("[") && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <GitHubIcon size={14} />
              GitHub
            </a>
          )}

          {project.demoUrl && project.demoUrl !== "[ADD_DEMO_URL]" && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink size={14} />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
