"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ChevronRight,
  Users,
  ZoomIn,
} from "lucide-react";
import { GitHubIcon } from "@/components/SocialIcons";
import type { Project } from "@/data/portfolio";
import Image from "next/image";

interface ProjectDetailsProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetails({
  project,
  onClose,
}: ProjectDetailsProps) {
  const [lightboxScreenshot, setLightboxScreenshot] = useState<{
    url: string;
    caption?: string;
  } | null>(null);

  // Close project modal on Escape — but only when the screenshot lightbox is NOT open
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !lightboxScreenshot) onClose();
    },
    [onClose, lightboxScreenshot]
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

              {/* Screenshots */}
              <Section title="Screenshots">
                {project.screenshots && project.screenshots.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                      gap: "16px",
                    }}
                  >
                    {project.screenshots.map((s, idx) => (
                      <div
                        key={idx}
                        style={{
                          borderRadius: "10px",
                          overflow: "hidden",
                          border: "1px solid var(--border)",
                          background: "var(--bg-secondary)",
                          cursor: "pointer",
                        }}
                        onClick={() => setLightboxScreenshot(s)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Expand screenshot: ${s.caption || `${project.title} screenshot ${idx + 1}`}`}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setLightboxScreenshot(s); }}
                      >
                        <div
                          style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}
                        >
                          <Image
                            src={s.url}
                            alt={s.caption || `${project.title} screenshot ${idx + 1}`}
                            fill
                            style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                            sizes="(max-width: 768px) 100vw, 400px"
                            quality={90}
                            className="screenshot-thumb"
                          />
                          {/* Hover zoom hint */}
                          <div
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(0,0,0,0)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "background 0.2s",
                            }}
                            className="screenshot-overlay"
                          >
                            <div
                              style={{
                                background: "rgba(0,0,0,0.55)",
                                backdropFilter: "blur(4px)",
                                borderRadius: "50%",
                                width: "44px",
                                height: "44px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: 0,
                                transition: "opacity 0.2s",
                              }}
                              className="screenshot-zoom-icon"
                            >
                              <ZoomIn size={20} color="white" />
                            </div>
                          </div>
                        </div>
                        {s.caption && (
                          <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border)" }}>
                            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                              {s.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "28px 20px",
                      border: "1px dashed var(--border)",
                      borderRadius: "10px",
                      textAlign: "center",
                      background: "rgba(242, 239, 234, 0.02)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Screenshots will be added soon
                    </p>
                  </div>
                )}
              </Section>

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

      {/* Screenshot lightbox */}
      <AnimatePresence>
        {lightboxScreenshot && (
          <ScreenshotLightbox
            url={lightboxScreenshot.url}
            caption={lightboxScreenshot.caption}
            onClose={() => setLightboxScreenshot(null)}
          />
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

// ── Screenshot Lightbox ───────────────────────────────────────
function ScreenshotLightbox({
  url,
  caption,
  onClose,
}: {
  url: string;
  caption?: string;
  onClose: () => void;
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation(); // prevent project modal from also closing
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // Use capture so we intercept before the project-modal's keydown listener
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [handleKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={caption || "Screenshot"}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(92vw, 1100px)",
          maxHeight: "88vh",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close screenshot"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 10,
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "8px",
            padding: "8px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}
        >
          <X size={18} />
        </button>

        {/* Full-resolution image — natural size, contained within viewport */}
        <div
          style={{
            position: "relative",
            width: "min(92vw, 1100px)",
            aspectRatio: "16/9",
            maxHeight: caption ? "calc(88vh - 52px)" : "88vh",
          }}
        >
          <Image
            src={url}
            alt={caption || "Project screenshot"}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 92vw, 1100px"
            priority
            quality={95}
          />
        </div>

        {/* Caption bar */}
        {caption && (
          <div
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(12px)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 500,
              }}
            >
              {caption}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Section wrapper ───────────────────────────────────────────
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
