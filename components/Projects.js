"use client";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    title: "AI-Integrated University Complaint Management System",
    company: "Digi Solutions",
    period: "10/2025 - 06/2026",
    tag: "Final Year Project",
    images: [
      "/projects/digisolutions-1-login.png",
      "/projects/digisolutions-2-departments.png",
      "/projects/digisolutions-3-dashboard.png",
    ],
    description:
      "Built a complaint management platform for university use, with separate web and app modules covering registration, tracking, and resolution. Integrated AI to triage incoming complaints and speed up response handling, cutting down manual sorting and improving overall turnaround time.",
    highlights: [
      "Secure department and admin login portals",
      "Department-wise complaint routing across 6+ categories",
      "Live dashboard with status tracking and resolution analytics",
    ],
    stack: ["AI Integration", "Web App", "Automation"],
  },
];

function Carousel({ images, isDark }) {
  const [index, setIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const restartTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  };

  const hasError = imgErrors[index];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        background: isDark
          ? "linear-gradient(135deg, #1e293b, #0f172a)"
          : "linear-gradient(135deg, #eff6ff, #f8fafc)",
        borderRadius: "0",
      }}
    >
      <AnimatePresence mode="wait">
        {!hasError ? (
          <motion.img
            key={index}
            src={images[index]}
            alt={`Project screenshot ${index + 1}`}
            onError={() =>
              setImgErrors((prev) => ({ ...prev, [index]: true }))
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              color: isDark ? "#60a5fa" : "#2563eb",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="4" width="18" height="14" rx="2" />
              <path d="M3 15l4.5-4.5a2 2 0 0 1 2.8 0L14 14" />
              <circle cx="8" cy="8.5" r="1.3" />
            </svg>
            <span style={{ fontSize: "0.8rem" }}>Screenshot not available</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => { prev(); restartTimer(); }}
        aria-label="Previous"
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(15,23,42,0.6)",
          color: "#fff",
          cursor: "pointer",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        ‹
      </button>

      <button
        onClick={() => { next(); restartTimer(); }}
        aria-label="Next"
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(15,23,42,0.6)",
          color: "#fff",
          cursor: "pointer",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        ›
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "6px",
          zIndex: 2,
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); restartTimer(); }}
            style={{
              width: i === index ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              border: "none",
              background: i === index ? "#3b82f6" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, isDark }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
        background: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
        boxShadow: isDark
          ? "0 20px 60px -20px rgba(0,0,0,0.5)"
          : "0 20px 40px -20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* Carousel — full width on mobile, half on desktop */}
      <div style={{ width: isMobile ? "100%" : "52%", flexShrink: 0 }}>
        <Carousel images={project.images} isDark={isDark} />
      </div>

      {/* Content */}
      <div
        style={{
          padding: isMobile ? "24px 20px" : "36px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          flex: 1,
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#3b82f6",
            }}
          >
            {project.tag}
          </span>
          <h3
            style={{
              fontSize: isMobile ? "1.1rem" : "1.35rem",
              fontWeight: 700,
              margin: "8px 0 4px",
              lineHeight: 1.3,
              color: isDark ? "#f1f5f9" : "#0f172a",
            }}
          >
            {project.title}
          </h3>
          <p style={{ fontSize: "0.875rem", margin: 0, color: isDark ? "#94a3b8" : "#6b7280" }}>
            {project.company} • {project.period}
          </p>
        </div>

        <p
          style={{
            fontSize: isMobile ? "0.9rem" : "0.95rem",
            lineHeight: 1.7,
            margin: 0,
            color: isDark ? "#cbd5e1" : "#4b5563",
          }}
        >
          {project.description}
        </p>

        <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {project.highlights.map((point) => (
            <li
              key={point}
              style={{
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                color: isDark ? "#cbd5e1" : "#4b5563",
              }}
            >
              {point}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: "0.78rem",
                padding: "4px 12px",
                borderRadius: "999px",
                color: isDark ? "rgba(255,255,255,0.85)" : "#374151",
                background: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                border: `1px solid ${isDark ? "rgba(59,130,246,0.3)" : "#bfdbfe"}`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <section className="px-6 py-24 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900">Projects</h2>
      </section>
    );
  }

  const isDark = theme === "dark";

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        padding: "80px 16px",
        backgroundColor: isDark ? "#0a0e1a" : "#ffffff",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <p
            style={{
              color: "#3b82f6",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            What I&apos;ve Built
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              margin: 0,
              color: isDark ? "#f1f5f9" : "#0f172a",
            }}
          >
            Projects
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}