"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const QUOTES = [
  { text: "Code is poetry written for machines, read by humans.", author: "Unknown" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
];

function getQuoteIndex() {
  const key = "quote-cycle-index";
  const current = parseInt(sessionStorage.getItem(key) ?? "-1", 10);
  const next = (current + 1) % QUOTES.length;
  sessionStorage.setItem(key, String(next));
  return next;
}

export default function QuoteSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setQuote(QUOTES[getQuoteIndex()]);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const fullText = `"${quote.text}"`;
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      i++;
      setDisplayedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [mounted, quote]);

  useEffect(() => {
    if (!mounted) return;
    const blink = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, [mounted]);

  if (!mounted) {
    return <section style={{ minHeight: "320px" }} />;
  }

  const isDark = theme === "dark";
  const fullText = `"${quote.text}"`;

  return (
    <section
      style={{
        padding: "90px 24px",
        backgroundColor: isDark ? "#0f172a" : "#f8fafc",
        minHeight: "320px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e2e8f0",
          boxShadow: isDark
            ? "0 24px 60px -20px rgba(0,0,0,0.6)"
            : "0 24px 50px -24px rgba(0,0,0,0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            background: isDark ? "#1e293b" : "#e2e8f0",
            borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #cbd5e1",
          }}
        >
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#22c55e" }} />
          <span
            style={{
              marginLeft: "8px",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              color: isDark ? "#94a3b8" : "#64748b",
            }}
          >
            quote.sh
          </span>
        </div>

        <div
          style={{
            padding: "28px 24px",
            background: isDark ? "#0a0e1a" : "#0f172a",
            fontFamily: "'Fira Code', 'Courier New', monospace",
            minHeight: "140px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <span style={{ color: "#22c55e", fontSize: "0.9rem" }}>abdullahdev22</span>
            <span style={{ color: "#64748b", fontSize: "0.9rem" }}>:~$</span>
            <span style={{ color: "#e2e8f0", fontSize: "0.9rem" }}>Your Daily Quote</span>
          </div>

          <p
            style={{
              color: "#60a5fa",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              margin: 0,
              minHeight: "3.4rem",
            }}
          >
            {displayedText}
            <span style={{ opacity: showCursor ? 1 : 0, color: "#60a5fa" }}>▋</span>
          </p>

          {displayedText.length >= fullText.length && (
            <p
              style={{
                color: "#64748b",
                fontSize: "0.85rem",
                marginTop: "12px",
                marginBottom: 0,
              }}
            >
              — {quote.author}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}