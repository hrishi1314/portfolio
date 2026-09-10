"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  ZoomIn,
  Users,
  Cpu,
  Layers,
  Sparkles,
  Database,
  Code2,
  Workflow,
  CheckCircle2,
  X,
} from "lucide-react";
import { GitHubIcon } from "@/components/SocialIcons";
import type { Project } from "@/data/portfolio";

interface ProjectShowcaseProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

export default function ProjectShowcase({
  project,
  index,
  onViewDetails,
}: ProjectShowcaseProps) {
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const screenshots = project.screenshots ?? [];
  const currentScreenshot = screenshots[activeScreenshotIdx] || screenshots[0];

  const isAi = project.id === "ai-recommender";

  return (
    <div
      className="card"
      style={{
        padding: "36px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        marginBottom: "48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Evidence Badge Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          paddingBottom: "20px",
          marginBottom: "28px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span
            className="badge"
            style={{
              padding: "5px 12px",
              fontSize: "0.78rem",
              letterSpacing: "0.04em",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {isAi ? <Sparkles size={13} /> : <Layers size={13} />}
            PROJECT 0{index + 1} &bull; {isAi ? "AI & DATA SCIENCE" : "CORE SYSTEM & DSA"}
          </span>

          {project.isGroupProject ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.74rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                background: "var(--bg-secondary)",
                padding: "3px 10px",
                borderRadius: "5px",
                border: "1px solid var(--border)",
              }}
            >
              <Users size={11} />
              Collaborative Project &bull; Individual Contribution Verified
            </span>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.74rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                background: "var(--bg-secondary)",
                padding: "3px 10px",
                borderRadius: "5px",
                border: "1px solid var(--border)",
              }}
            >
              <CheckCircle2 size={12} color="var(--accent-emerald)" />
              Independent System Architecture
            </span>
          )}
        </div>

        {/* Live Code / Repo buttons */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {project.githubUrl && !project.githubUrl.startsWith("[") && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label={`GitHub repository for ${project.title}`}
              style={{ padding: "6px 12px", fontSize: "0.8rem" }}
            >
              <GitHubIcon size={14} />
              View Source
            </a>
          )}
          {project.demoUrl && project.demoUrl !== "[ADD_DEMO_URL]" && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "6px 14px", fontSize: "0.8rem" }}
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Main Grid: Left is Visual Proof, Right is Technical Story */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 540px), 1fr))",
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN: Visual Application Window Mockup */}
        <div>
          <div className="window-mockup">
            {/* Window Header / Chrome */}
            <div className="window-header">
              <div className="window-dots">
                <span className="window-dot window-dot-red" />
                <span className="window-dot window-dot-yellow" />
                <span className="window-dot window-dot-green" />
              </div>
              <div className="window-title">
                {isAi ? "appliance_recommender.py (Streamlit Web App)" : "LibrarySystem.java (Swing GUI Desktop)"}
              </div>
              <button
                onClick={() => setLightboxOpen(true)}
                className="btn-ghost"
                style={{ padding: "3px 8px", fontSize: "0.72rem", gap: "4px" }}
                title="Zoom Screenshot"
              >
                <ZoomIn size={12} />
                Zoom
              </button>
            </div>

            {/* In-Place Image Display */}
            {currentScreenshot && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  background: "var(--bg-secondary)",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={currentScreenshot.url}
                  alt={currentScreenshot.caption || project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 650px"
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
                {/* Caption overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "rgba(0, 0, 0, 0.75)",
                    backdropFilter: "blur(6px)",
                    padding: "8px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: "0.78rem", color: "#FFFFFF", fontWeight: 500 }}>
                    {currentScreenshot.caption || "Application Screenshot"}
                  </p>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-mono)" }}>
                    {activeScreenshotIdx + 1} of {screenshots.length} (Click to expand)
                  </span>
                </div>
              </div>
            )}

            {/* Thumbnail Switcher Bar */}
            {screenshots.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  padding: "10px 14px",
                  background: "var(--bg-secondary)",
                  borderTop: "1px solid var(--border)",
                  overflowX: "auto",
                }}
              >
                {screenshots.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveScreenshotIdx(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: activeScreenshotIdx === idx ? 600 : 400,
                      background: activeScreenshotIdx === idx ? "var(--bg-card)" : "transparent",
                      color: activeScreenshotIdx === idx ? "var(--text-primary)" : "var(--text-muted)",
                      border: `1px solid ${activeScreenshotIdx === idx ? "var(--accent)" : "transparent"}`,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: activeScreenshotIdx === idx ? "var(--accent)" : "var(--border)",
                      }}
                    />
                    {s.caption ? s.caption.split("&")[0].trim() : `Screen ${idx + 1}`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Metrics Bar directly underneath image */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginTop: "14px",
            }}
          >
            {isAi ? (
              <>
                <div style={{ padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Dataset</p>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>1,056 Rows</p>
                </div>
                <div style={{ padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Attributes</p>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>12 Features</p>
                </div>
                <div style={{ padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>LLM Backbone</p>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>Groq + Ollama</p>
                </div>
              </>
            ) : (
              <>
                <div style={{ padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Data Structures</p>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>5 Custom Types</p>
                </div>
                <div style={{ padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Architecture</p>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>MVC Pattern</p>
                </div>
                <div style={{ padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>UI Layer</p>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>Java Swing GUI</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Project Details, Architecture Flow & Code Proof */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <h3
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                marginBottom: "10px",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              {project.shortDescription}
            </p>
          </div>

          {/* Individual Contribution Note for Group Project */}
          {project.isGroupProject && project.myContribution && (
            <div
              style={{
                padding: "14px 18px",
                background: "rgba(59, 130, 246, 0.05)",
                border: "1px solid var(--border)",
                borderLeft: "3px solid var(--accent)",
                borderRadius: "8px",
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.08em",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                }}
              >
                My Individual Engineering Contribution:
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {project.myContribution}
              </p>
            </div>
          )}

          {/* VISUAL ARCHITECTURE PROOF */}
          {isAi ? (
            <div
              style={{
                padding: "18px",
                background: "var(--bg-secondary)",
                borderRadius: "12px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Workflow size={15} color="var(--accent)" />
                <span
                  style={{
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-primary)",
                  }}
                >
                  Hybrid Pipeline Architecture
                </span>
              </div>

              {/* 4-Stage Horizontal Flowchart */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))",
                  gap: "8px",
                }}
              >
                {[
                  { title: "1. User Input", desc: "Budget, family size, load type" },
                  { title: "2. Data Filtering", desc: "Pandas deduplication (1,056 rows)" },
                  { title: "3. Weighted Rank", desc: "Multi-factor score calculation" },
                  { title: "4. LLM Synthesis", desc: "Groq API buying guidance" },
                ].map((step, si) => (
                  <div
                    key={si}
                    style={{
                      padding: "10px 12px",
                      background: "var(--bg-card)",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                      {step.title}
                    </p>
                    <p style={{ fontSize: "0.68rem", color: "var(--text-secondary)", marginTop: "3px", lineHeight: 1.4 }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Custom DSA Architecture Visual for Java System */
            <div
              style={{
                padding: "18px",
                background: "var(--bg-secondary)",
                borderRadius: "12px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Database size={15} color="var(--accent)" />
                <span
                  style={{
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-primary)",
                  }}
                >
                  Custom Data Structures Implementation
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                {[
                  { ds: "HashMap", role: "O(1) lookup for book catalog & member records" },
                  { ds: "Priority Queue", role: "Dynamic priority waitlist for faculty/reserved" },
                  { ds: "FIFO Queue", role: "Standard fair waitlist for regular borrowing" },
                  { ds: "LIFO Stack", role: "Transaction borrowing & return history log" },
                ].map((item, dsi) => (
                  <div
                    key={dsi}
                    style={{
                      padding: "10px 12px",
                      background: "var(--bg-card)",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                      {item.ds}
                    </p>
                    <p style={{ fontSize: "0.68rem", color: "var(--text-secondary)", marginTop: "2px", lineHeight: 1.4 }}>
                      {item.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
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
              Technologies &amp; Libraries
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.techStack.map((tech) => (
                <span key={tech} className="badge-neutral" style={{ padding: "4px 10px", fontSize: "0.76rem" }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
            <button
              onClick={() => onViewDetails(project)}
              className="btn-primary"
              style={{ padding: "10px 20px", fontSize: "0.85rem" }}
              aria-label={`View deep technical case study for ${project.title}`}
            >
              Explore Full Case Study
              <ArrowRight size={15} />
            </button>

            {project.githubUrl && !project.githubUrl.startsWith("[") && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: "10px 18px", fontSize: "0.85rem" }}
              >
                <GitHubIcon size={15} />
                Inspect Repository
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Zooming Screenshots */}
      <AnimatePresence>
        {lightboxOpen && currentScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              background: "rgba(0, 0, 0, 0.88)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "1100px",
                width: "100%",
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#FFFFFF" }}>
                <p style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  {currentScreenshot.caption || project.title}
                </p>
                <button
                  onClick={() => setLightboxOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "#FFFFFF",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Image
                  src={currentScreenshot.url}
                  alt={currentScreenshot.caption || project.title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
