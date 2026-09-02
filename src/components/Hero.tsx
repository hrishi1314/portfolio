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

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const CONNECTION_DIST = 140;
    const CURSOR_DIST = 170;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Node–node connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            const alpha = 0.08 * (1 - d / CONNECTION_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(208,138,75,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Cursor attraction lines
      const mx = mouse.current.x;
      const my = mouse.current.y;
      if (mx > 0) {
        for (const n of nodes) {
          const dx = n.x - mx;
          const dy = n.y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CURSOR_DIST) {
            const alpha = 0.18 * (1 - d / CURSOR_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(208,138,75,${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(208,138,75,0.38)";
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

      {/* Ambient glow blobs */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "15%", left: "60%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(208,138,75,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "20%", left: "-5%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(208,138,75,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div
        className="section-inner"
        style={{ position: "relative", zIndex: 1, width: "100%", paddingTop: "120px", paddingBottom: "100px" }}
      >
        <motion.span
          className="section-label"
          {...fadeUp(0)}
          style={{ display: "block", marginBottom: "20px" }}
        >
          Hi, I&apos;m
        </motion.span>

        <motion.h1
          {...fadeUp(0.08)}
          style={{
            fontSize: "clamp(3rem, 7.5vw, 5.8rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            marginBottom: "18px",
          }}
        >
          <span className="text-gradient">Hrishikesh R</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.18)}
          style={{
            fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
            fontWeight: 500,
            color: "var(--text-secondary)",
            marginBottom: "8px",
            letterSpacing: "-0.01em",
          }}
        >
          Computer Science &amp; Engineering Student
        </motion.p>

        <motion.p
          {...fadeUp(0.25)}
          style={{
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            marginBottom: "28px",
            letterSpacing: "0.04em",
          }}
        >
          {personal.tagline}
        </motion.p>

        <motion.p
          {...fadeUp(0.32)}
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            maxWidth: "500px",
            lineHeight: 1.75,
            marginBottom: "44px",
          }}
        >
          {personal.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.4)}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}
        >
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="View Projects"
          >
            View Projects
            <ArrowRight size={16} />
          </a>
          <a
            href={personal.resumePath}
            download
            className="btn-secondary"
            aria-label="Download Resume PDF"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          {...fadeUp(0.48)}
          style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}
        >
          <span style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            marginRight: "4px",
          }}>
            Find me on
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
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, rgba(208,138,75,0.55), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
