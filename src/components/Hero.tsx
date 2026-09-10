"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { personal } from "@/data/portfolio";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -500, y: -500 });
  const rafId = useRef<number>(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const NODE_COUNT = 52;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.5 + 0.8,
    }));

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => {
      mouse.current = { x: -500, y: -500 };
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    const CONNECTION_DIST = 140;
    const CURSOR_DIST = 175;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const rgb = isLight ? "192,107,32" : "208,138,75";
      const ambientMaxAlpha = isLight ? 0.11 : 0.08;
      const ambientLineWidth = isLight ? 0.75 : 0.7;
      const mouseMaxAlpha = isLight ? 0.38 : 0.28;
      const mouseLineWidth = isLight ? 1.15 : 1.0;
      const baseNodeAlpha = isLight ? 0.40 : 0.38;

      // Node–node connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            const alpha = ambientMaxAlpha * (1 - d / CONNECTION_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb},${alpha})`;
            ctx.lineWidth = ambientLineWidth;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Cursor attraction lines
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const mouseActive = mx > 0 && my > 0 && mx < width && my < height;

      if (mouseActive) {
        for (const n of nodes) {
          const dx = n.x - mx;
          const dy = n.y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CURSOR_DIST) {
            const factor = 1 - d / CURSOR_DIST;
            const alpha = mouseMaxAlpha * factor;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb},${alpha})`;
            ctx.lineWidth = mouseLineWidth;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        let r = n.r;
        let alpha = baseNodeAlpha;

        if (mouseActive) {
          const dx = n.x - mx;
          const dy = n.y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CURSOR_DIST) {
            const factor = 1 - d / CURSOR_DIST;
            alpha = isLight
              ? baseNodeAlpha + 0.32 * factor
              : baseNodeAlpha + 0.24 * factor;
            r = n.r + 0.45 * factor;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${alpha})`;
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      rafId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return () => { if (cleanup) cleanup(); };
  }, [initCanvas]);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg-primary)",
      }}
      aria-label="Hero section"
    >
      {/* Dot grid */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Canvas nodes */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Ambient glow blobs — opacity scaled down via CSS var for light theme */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "15%", left: "60%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        opacity: "var(--hero-blob-opacity, 1)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "20%", left: "-5%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)",
        opacity: "var(--hero-blob-opacity, 1)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div
        className="section-inner"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          paddingTop: "125px",
          paddingBottom: "80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: "50px",
            alignItems: "center",
          }}
        >
          {/* Left Column: Bio & Core Actions */}
          <div>
            <motion.div {...fadeUp(0)} style={{ marginBottom: "18px" }}>
              <span className="status-pill">
                <span className="status-dot" />
                Available for SWE &amp; AI/ML Internships
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                marginBottom: "16px",
              }}
            >
              <span className="text-gradient">Hrishikesh R</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.18)}
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "8px",
                letterSpacing: "-0.01em",
              }}
            >
              Computer Science &amp; Engineering Student
            </motion.p>

            <motion.p
              {...fadeUp(0.24)}
              style={{
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                marginBottom: "20px",
                letterSpacing: "0.02em",
              }}
            >
              Lovely Professional University • CGPA: 8.69 • Focus: AI/ML
            </motion.p>

            <motion.p
              {...fadeUp(0.3)}
              style={{
                fontSize: "1.025rem",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                marginBottom: "36px",
                maxWidth: "560px",
              }}
            >
              Building practical software applications combining algorithms, data structures, and generative AI. Here is the verified visual proof and code for my projects, coursework, and credentials.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.38)}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}
            >
              <a
                href="#projects"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label="View Project Showcases"
              >
                View Project Proof
                <ArrowRight size={16} />
              </a>
              <a
                href={personal.resumePath}
                download
                className="btn-secondary"
                aria-label="Download Resume PDF"
              >
                <Download size={16} />
                Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              {...fadeUp(0.44)}
              style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  marginRight: "4px",
                }}
              >
                Profiles:
              </span>
              <a
                href={personal.github.startsWith("[") ? "#contact" : personal.github}
                target={personal.github.startsWith("[") ? undefined : "_blank"}
                rel={personal.github.startsWith("[") ? undefined : "noopener noreferrer"}
                className="btn-ghost"
                aria-label="GitHub profile"
                style={{ padding: "7px 14px", fontSize: "0.82rem" }}
              >
                <GitHubIcon size={15} />
                GitHub
              </a>
              <a
                href={personal.linkedin.startsWith("[") ? "#contact" : personal.linkedin}
                target={personal.linkedin.startsWith("[") ? undefined : "_blank"}
                rel={personal.linkedin.startsWith("[") ? undefined : "noopener noreferrer"}
                className="btn-ghost"
                aria-label="LinkedIn profile"
                style={{ padding: "7px 14px", fontSize: "0.82rem" }}
              >
                <LinkedInIcon size={15} />
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right Column: Evidence & Resume Proof Bento Card */}
          <motion.div
            {...fadeUp(0.25)}
            className="card"
            style={{
              padding: "32px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Header of Bento */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
              <div>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Candidate Overview
                </p>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Verified Resume Highlights
                </h3>
              </div>
              <span className="badge" style={{ fontSize: "0.72rem" }}>
                B.Tech CSE &bull; 2024–Present
              </span>
            </div>

            {/* Metrics 2x2 Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ padding: "16px", background: "var(--bg-secondary)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                  8.69
                </p>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: "6px" }}>
                  Cumulative GPA
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  Lovely Professional Univ.
                </p>
              </div>

              <div style={{ padding: "16px", background: "var(--bg-secondary)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                  Grade A
                </p>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: "6px" }}>
                  DSA Summer Course
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  CPE LPU Certification
                </p>
              </div>

              <div style={{ padding: "16px", background: "var(--bg-secondary)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                  1,056+
                </p>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: "6px" }}>
                  Dataset Records
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  AI Recommender Project
                </p>
              </div>

              <div style={{ padding: "16px", background: "var(--bg-secondary)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                  12+
                </p>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: "6px" }}>
                  Credentials &amp; Certs
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  Infosys, HackerRank, Neocolab
                </p>
              </div>
            </div>

            {/* Core Competency Tags */}
            <div>
              <p style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "10px", textTransform: "uppercase" }}>
                Core Production Stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["Python", "C++", "Java", "Generative AI", "LLMs", "Streamlit", "DSA", "MySQL", "Scikit-learn"].map((skill) => (
                  <span key={skill} className="badge-neutral" style={{ padding: "4px 9px", borderRadius: "5px", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer reassurance note */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)" }} />
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                All claims below verified with screenshots &amp; code repositories.
              </p>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Scroll indicator — fixed to bottom of viewport, not inside content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <span style={{
          fontSize: "0.65rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "2px",
            height: "32px",
            background: "linear-gradient(to bottom, var(--accent-border), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
