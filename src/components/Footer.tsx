"use client";

import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { personal } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Footer"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-primary)",
      }}
    >
      <div
        className="section-inner"
        style={{
          padding: "28px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            © {year} Hrishikesh R
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {!personal.github.startsWith("[") && (
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="GitHub profile"
              style={{ padding: "8px 10px" }}
            >
              <GitHubIcon size={16} color="var(--text-secondary)" />
            </a>
          )}
          {!personal.linkedin.startsWith("[") && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="LinkedIn profile"
              style={{ padding: "8px 10px" }}
            >
              <LinkedInIcon size={16} color="var(--text-secondary)" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
