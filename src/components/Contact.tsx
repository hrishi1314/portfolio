"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { personal } from "@/data/portfolio";

const CONTACT_ITEMS = [
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    display: personal.email,
    href: personal.email.startsWith("[") ? null : `mailto:${personal.email}`,
    isPlaceholder: personal.email.startsWith("["),
  },
  {
    id: "linkedin",
    Icon: LinkedInIcon,
    label: "LinkedIn",
    display: "linkedin.com/in/hrishikesh-r",
    href: personal.linkedin.startsWith("[") ? null : personal.linkedin,
    isPlaceholder: personal.linkedin.startsWith("["),
  },
  {
    id: "github",
    Icon: GitHubIcon,
    label: "GitHub",
    display: "github.com/hrishi1314",
    href: personal.github.startsWith("[") ? null : personal.github,
    isPlaceholder: personal.github.startsWith("["),
  },
] as const;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <section id="contact" className="section" ref={ref} aria-label="Contact section">
      <div className="section-inner">
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <motion.span
              className="section-label"
              {...item(0)}
              style={{ display: "block", marginBottom: "14px" }}
            >
              Contact
            </motion.span>
            <motion.h2
              {...item(0.08)}
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                marginBottom: "18px",
              }}
            >
              Let&apos;s Connect
            </motion.h2>
            <motion.p
              {...item(0.15)}
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                maxWidth: "380px",
              }}
            >
              Open to software engineering internships, AI/ML projects, and
              collaboration. I&apos;m always happy to chat.
            </motion.p>
          </div>

          {/* Right — contact cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {CONTACT_ITEMS.map(({ id, Icon, label, display, href, isPlaceholder }, i) => {
              const Tag = href ? motion.a : motion.div;
              return (
                <Tag
                  key={id}
                  {...(href ? { href, target: id !== "email" ? "_blank" : undefined, rel: id !== "email" ? "noopener noreferrer" : undefined } : {})}
                  {...item(0.2 + i * 0.08)}
                  className="card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "18px 20px",
                    textDecoration: "none",
                    cursor: isPlaceholder ? "default" : "pointer",
                    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                    if (isPlaceholder) return;
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
                  }}
                  aria-label={isPlaceholder ? `${label} — not yet configured` : `${label}: ${display}`}
                >
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon size={18} color="var(--accent)" />
                  </div>
                  <div>
                    <p style={{
                      fontSize: "0.68rem", fontWeight: 700,
                      color: "var(--text-muted)", fontFamily: "var(--font-mono)",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      marginBottom: "3px",
                    }}>
                      {label}
                    </p>
                    <p style={{
                      fontSize: "0.875rem",
                      color: isPlaceholder ? "var(--text-muted)" : "var(--text-primary)",
                      fontWeight: 500,
                      fontFamily: isPlaceholder ? "var(--font-mono)" : "inherit",
                      letterSpacing: isPlaceholder ? "0.04em" : 0,
                    }}>
                      {display}
                    </p>
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
