"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ChevronRight,
  Users,
} from "lucide-react";
import { GitHubIcon } from "@/components/SocialIcons";
import type { Project } from "@/data/portfolio";

interface ProjectDetailsProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetails({
  project,
  onClose,
}: ProjectDetailsProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="modal-backdrop"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — project details`}
        >
          <motion.div
            key="project-modal-content"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "780px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            {/* Sticky header */}
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                background: "var(--bg-card)",
                borderBottom: "1px solid var(--border)",
                padding: "20px 28px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    {project.title}
                  </h2>
                  {project.isGroupProject && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "3px 10px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      <Users size={11} />
                      Group Project
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginTop: "10px",
                  }}
                >
                  {project.techStack.map((t) => (
                    <span key={t} className="badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close project details"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "28px" }}>
              {/* Overview */}
              <Section title="Overview">
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                  }}
                >
                  {project.fullDescription}
                </p>
              </Section>

              {/* Problem & Solution */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "28px",
                }}
                className="ps-grid"
              >
                <div
                  className="card"
                  style={{ padding: "20px", background: "var(--bg-secondary)" }}
                >
                  <h4
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "10px",
                    }}
                  >
                    Problem
                  </h4>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                    }}
                  >
                    {project.problem}
                  </p>
                </div>
                <div
                  className="card"
                  style={{ padding: "20px", background: "var(--bg-secondary)" }}
                >
                  <h4
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "10px",
                    }}
                  >
                    Solution
                  </h4>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                    }}
                  >
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* How It Works */}
              {project.howItWorks && (
                <Section title="How It Works">
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                    }}
                  >
                    {project.howItWorks}
                  </p>
                </Section>
              )}



              {/* My Contribution (Only for group projects) */}
              {project.isGroupProject && project.myContribution && (
                <Section title="My Contribution">
                  <div
                    style={{
                      padding: "16px 20px",
                      background: "rgba(208,138,75,0.06)",
                      border: "1px solid rgba(208,138,75,0.16)",
                      borderRadius: "10px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                      }}
                    >
                      {project.myContribution}
                    </p>
                  </div>
                </Section>
              )}

              {/* Features */}
              <Section title="Features">
                <ul
                  style={{
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {project.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "0.88rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      <ChevronRight
                        size={14}
                        color="var(--accent)"
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Architecture (if present) */}
              {project.architecture && (
                <Section title="Architecture">
                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {project.architecture}
                  </p>
                </Section>
              )}

              {/* Data Structures (if present) */}
              {project.dataStructures && (
                <Section title="Data Structures Used">
                  <ul
                    style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}
                  >
                    {project.dataStructures.map((ds) => (
                      <li
                        key={ds}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          fontSize: "0.88rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--accent)",
                            flexShrink: 0,
                            marginTop: "6px",
                          }}
                          aria-hidden="true"
                        />
                        <span>
                          <strong
                            style={{
                              color: "var(--text-primary)",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {ds.split("—")[0]?.trim()}
                          </strong>
                          {ds.includes("—") ? " — " + ds.split("—")[1]?.trim() : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Flows */}
              {project.flows.map((flow) => (
                <Section key={flow.name} title={flow.name}>
                  <ol
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {flow.steps.map((step, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          fontSize: "0.88rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            flexShrink: 0,
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            background: "rgba(208,138,75,0.12)",
                            border: "1px solid rgba(208,138,75,0.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: "var(--accent)",
                            fontFamily: "var(--font-mono)",
                          }}
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </Section>
              ))}

              {/* Links */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {!project.githubUrl.startsWith("[") ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <GitHubIcon size={16} />
                    View on GitHub
                  </a>
                ) : (
                  <span
                    className="btn-secondary"
                    style={{ opacity: 0.6, cursor: "default" }}
                    title="Repository URL will be added"
                  >
                    <GitHubIcon size={16} />
                    GitHub Repo
                  </span>
                )}
                {project.demoUrl && project.demoUrl !== "[ADD_DEMO_URL]" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}


    </AnimatePresence>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h3
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          marginBottom: "14px",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
