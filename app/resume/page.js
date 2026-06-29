"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ResumePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-3xl font-bold text-gray-900">Resume</h1>
      </section>
    );
  }

  const isDark = theme === "dark";

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !message) return;
  setStatus("loading");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("success");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  } catch (err) {
    setStatus("error");
    setTimeout(() => setStatus("idle"), 3000);
  }
};

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: isDark
      ? "1px solid rgba(255,255,255,0.1)"
      : "1px solid #e5e7eb",
    background: isDark ? "rgba(255,255,255,0.05)" : "#f9fafb",
    color: isDark ? "#f1f5f9" : "#0f172a",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border 0.2s ease",
    boxSizing: "border-box",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#0f172a" : "#f8fafc",
        paddingTop: "100px",
        paddingBottom: "80px",
      }}
    >
      <div style={{ maxWidth: "580px", margin: "0 auto", padding: "0 20px" }}>

        {/* ── CV DOWNLOAD SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            padding: "48px 40px",
            borderRadius: "20px",
            background: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
            boxShadow: isDark
              ? "0 30px 70px -25px rgba(0,0,0,0.6)"
              : "0 20px 50px -20px rgba(0,0,0,0.08)",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              margin: "0 auto 24px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 30px -8px rgba(59,130,246,0.5)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
          </div>

          <h1 style={{ fontSize: "1.9rem", fontWeight: 700, marginBottom: "10px", color: isDark ? "#f1f5f9" : "#0f172a" }}>
            My Resume
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "28px", color: isDark ? "#94a3b8" : "#6b7280" }}>
            Download my CV to see my full experience, skills, and projects as a Web Developer and Digital Marketer.
          </p>

          <a
            href="/abdullah-resume.pdf"
            download="Abdullah-Javaid-Resume.pdf"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "#ffffff",
              padding: "14px 32px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 10px 25px -8px rgba(59,130,246,0.6)",
              transition: "transform 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download My CV
          </a>

          <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <a href="mailto:abdullahjavaid959@gmail.com"
              style={{ color: "#3b82f6", textDecoration: "none", fontSize: "0.9rem" }}>
              
            </a>
            <a href="https://wa.me/923079886730" target="_blank"
              style={{ color: "#25d366", textDecoration: "none", fontSize: "0.9rem" }}>
            
            </a>
            <a href="https://linkedin.com/in/abdullahjavaid22" target="_blank"
              style={{ color: "#3b82f6", textDecoration: "none", fontSize: "0.9rem" }}>
              
            </a>
          </div>
        </motion.div>

        {/* ── CONTACT FORM SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            padding: "48px 40px",
            borderRadius: "20px",
            background: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
            boxShadow: isDark
              ? "0 30px 70px -25px rgba(0,0,0,0.6)"
              : "0 20px 50px -20px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                margin: "0 auto 20px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 30px -8px rgba(139,92,246,0.5)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h2 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "8px", color: isDark ? "#f1f5f9" : "#0f172a" }}>
              Get In Touch
            </h2>
            <p style={{ fontSize: "0.95rem", color: isDark ? "#94a3b8" : "#6b7280", lineHeight: 1.6 }}>
              Have a project in mind or want to collaborate? Send me a message!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Email Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: isDark ? "#cbd5e1" : "#374151",
                }}
              >
                Your Email
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.border = "1px solid #3b82f6";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.border = isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: isDark ? "#cbd5e1" : "#374151",
                }}
              >
                Your Message
              </label>
              <textarea
                placeholder="Tell me about your project or just say hello..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "130px",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid #3b82f6";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.border = isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === "loading" || status === "success"}
              whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background:
                  status === "success"
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "linear-gradient(135deg, #8b5cf6, #6366f1)",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: status === "loading" ? "wait" : "pointer",
                transition: "all 0.3s ease",
                boxShadow:
                  status === "success"
                    ? "0 10px 25px -8px rgba(34,197,94,0.5)"
                    : "0 10px 25px -8px rgba(139,92,246,0.5)",
              }}
            >
              {status === "idle" && "Send Message"}
              {status === "loading" && "Sending..."}
              {status === "success" && "Message Sent!"}
            </motion.button>

            {/* Success Message */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  textAlign: "center",
                  padding: "14px",
                  borderRadius: "12px",
                  background: isDark ? "rgba(34,197,94,0.1)" : "#f0fdf4",
                  border: "1px solid rgba(34,197,94,0.3)",
                  color: "#22c55e",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Thank you for reaching out! I'll get back to you soon.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </main>
  );
}