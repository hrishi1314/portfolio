"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectShowcase from "@/components/ProjectShowcase";
import ProjectDetails from "@/components/ProjectDetails";
import type { Project } from "@/data/portfolio";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section" ref={ref} aria-label="Projects section">
      <div className="section-inner">
        <div className="section-header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ display: "block", marginBottom: "12px" }}
          >
            Engineering Proof &amp; Artifacts
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
            }}
          >
            Featured Visual Showcases
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              marginTop: "12px",
              maxWidth: "680px",
              lineHeight: 1.7,
            }}
          >
            Production-grade systems proving applied Artificial Intelligence, custom Data Structures, and backend logic. Click any screenshot to inspect the application in high resolution.
          </motion.p>
        </div>

        <div>
          {projects.map((project, i) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={i}
              onViewDetails={setSelectedProject}
            />
          ))}
        </div>
      </div>


      <ProjectDetails
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
