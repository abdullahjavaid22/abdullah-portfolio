"use client";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    title: "Frontend",
    accent: "#3b82f6", // blue-500
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    accent: "#8b5cf6", // violet-500
    skills: ["Node.js", "Express", "PHP", "MongoDB", "MySQL", "PostgreSQL", "Supabase"],
  },
  {
    title: "Tools",
    accent: "#10b981", // emerald-500
    skills: ["Git", "GitHub", "VS Code", "Figma"],
  },
];

function SkillCard({ group, index, isDark }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff",
        border: isDark
          ? `1px solid ${hovered ? group.accent + "55" : "rgba(255, 255, 255, 0.08)"}`
          : `1px solid ${hovered ? group.accent + "55" : "#e5e7eb"}`,
        borderRadius: "16px",
        padding: "32px 28px",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered
          ? `0 0 32px -8px ${group.accent}66`
          : isDark
          ? "none"
          : "0 1px 3px rgba(0,0,0,0.05)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "3px",
          background: `linear-gradient(90deg, ${group.accent}, transparent)`,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "22px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: group.accent,
            boxShadow: `0 0 12px ${group.accent}`,
          }}
        />
        <h3
          style={{
            fontSize: "1.15rem",
            fontWeight: 600,
            letterSpacing: "0.01em",
            margin: 0,
            color: isDark ? "#f1f5f9" : "#0f172a",
          }}
        >
          {group.title}
        </h3>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {group.skills.map((skill) => (
          <span
            key={skill}
            style={{
              fontSize: "0.875rem",
              borderRadius: "999px",
              padding: "6px 14px",
              whiteSpace: "nowrap",
              color: isDark ? "rgba(255, 255, 255, 0.85)" : "#374151",
              background: isDark ? "rgba(255, 255, 255, 0.05)" : "#f8fafc",
              border: `1px solid ${group.accent}33`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="px-6 py-24 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Skills &amp; Technologies
        </h2>
      </section>
    );
  }

  const isDark = theme === "dark";

  return (
    <section
      id="skills"
      style={{
        position: "relative",
        padding: "100px 24px",
        backgroundColor: isDark ? "#0f172a" : "#f8fafc",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "56px", textAlign: "center" }}>
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
            What I Work With
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              margin: 0,
              color: isDark ? "#f1f5f9" : "#0f172a",
            }}
          >
            Skills &amp; Technologies
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {SKILL_GROUPS.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}