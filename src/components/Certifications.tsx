"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ExternalLink,
  Award,
  X,
  ZoomIn,
} from "lucide-react";
import { certifications } from "@/data/portfolio";
import type { Certification } from "@/data/portfolio";
import Image from "next/image";

const ISSUER_COLORS: Record<string, string> = {
  Neocolab: "#D08A4B",   // copper — primary accent
  Infosys:  "#B87D6A",   // terracotta — warm earthy
  Skillera: "#8FA68A",   // muted sage — calm contrast
  GeeksForGeeks: "#7D9EA8", // cool slate — readable, professional
  HackerRank: "#A89060",  // warm bronze
  "Coding Tantra": "#9B8FA8", // muted lavender-slate — distinct but harmonious
};

function getIssuerColor(issuer: string) {
  return ISSUER_COLORS[issuer] ?? "#D08A4B";
}

function CertCard({
  cert,
  index,
  inView,
  onView,
}: {
  cert: Certification;
  index: number;
  inView: boolean;
  onView: (cert: Certification) => void;
}) {
  const color = getIssuerColor(cert.issuer);

  const handleView = () => {
    if (cert.fileType === "pdf") {
      window.open(cert.filePath, "_blank", "noopener,noreferrer");
    } else {
      onView(cert);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.08,
        ease: [0.16, 1, 0.3, 1] as [number,number,number,number],
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
            background: `linear-gradient(90deg, ${color}, transparent)`,
          }}
        />

        {/* Icon + Issuer */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: `${color}18`,
              border: `1px solid ${color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Award size={18} color={color} />
          </div>
          <div>
            <p
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: color,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em",
              }}
            >
              {cert.issuer}
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
            >
              {cert.date}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.35,
          }}
        >
          {cert.title}
        </h3>

        {/* Visual Certificate Preview */}
        {cert.fileType !== "pdf" ? (
          <div
            onClick={handleView}
            style={{
              position: "relative",
              width: "100%",
              height: "150px",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              background: "var(--bg-secondary)",
              cursor: "pointer",
            }}
          >
            <Image
              src={cert.filePath}
              alt={cert.title}
              fill
              sizes="(max-width: 768px) 100vw, 340px"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
            >
              <span
                className="badge"
                style={{
                  background: "rgba(0, 0, 0, 0.75)",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "0.75rem",
                  gap: "5px",
                }}
              >
                <ZoomIn size={13} />
                Click to Inspect
              </span>
            </div>
          </div>
        ) : (
          <div
            onClick={handleView}
            style={{
              height: "150px",
              borderRadius: "8px",
              border: "1px dashed var(--border)",
              background: "var(--bg-secondary)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: "pointer",
              padding: "16px",
              textAlign: "center",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            <Award size={26} color={color} />
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Verified PDF Credential
            </span>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {cert.issuer} &bull; Click to View
            </span>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "auto" }}>
          <button
            onClick={handleView}
            className="btn-ghost"
            style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "7px 12px" }}
            aria-label={`View ${cert.title} certificate`}
          >
            {cert.fileType === "pdf" ? (
              <>
                <ExternalLink size={13} />
                Open PDF
              </>
            ) : (
              <>
                <ZoomIn size={13} />
                Enlarge Certificate
              </>
            )}
          </button>
          {cert.verificationUrl && (
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label={`Verify ${cert.title} certificate`}
              style={{ fontSize: "0.8rem", padding: "7px 12px" }}
            >
              <ExternalLink size={13} />
              Verify
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}


function ImageLightbox({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} certificate`}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxWidth: "min(90vw, 900px)",
            maxHeight: "85vh",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close certificate viewer"
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

          {/* Certificate image */}
          <div
            style={{
              position: "relative",
              width: "min(90vw, 900px)",
              aspectRatio: "16/11",
            }}
          >
            <Image
              src={cert.filePath}
              alt={`${cert.title} certificate from ${cert.issuer}`}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 90vw, 900px"
              priority
              quality={95}
            />
          </div>

          {/* Caption bar */}
          <div
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(12px)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "white",
                }}
              >
                {cert.title}
              </p>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {cert.issuer} · {cert.date}
              </p>
            </div>
            <a
              href={cert.filePath}
              download
              className="btn-ghost"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
              aria-label="Download certificate image"
            >
              Download
            </a>
          </div>
        </motion.div>
      </motion.div>
  );
}

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxCert, setLightboxCert] = useState<Certification | null>(null);

  return (
    <section
      id="certificates"
      className="section"
      ref={ref}
      aria-label="Certificates section"
      style={{ background: "var(--bg-secondary)" }}
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
            Certificates
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
            Certificates
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
            Verified credentials from recognized platforms.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "24px",
          }}
        >
          {certifications.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              inView={inView}
              onView={setLightboxCert}
            />
          ))}
        </div>
      </div>

      {/* Lightbox for image certificates */}
      <AnimatePresence>
        {lightboxCert && (
          <ImageLightbox
            cert={lightboxCert}
            onClose={() => setLightboxCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
