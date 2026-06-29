"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/923075998730",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.873-2.888-1.557-4.035-3.532-.305-.524.305-.485.873-1.612.099-.198.05-.371-.05-.52-.099-.149-.669-1.611-.916-2.158-.247-.547-.495-.471-.67-.471-.173 0-.371-.024-.57-.024-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.05 3.124 4.96 4.26 2.91 1.137 2.91.758 3.85.682.941-.075 1.857-.704 2.054-1.388.198-.685.198-1.27.099-1.388-.05-.124-.297-.198-.594-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.05 2.284 7.034L0.787 23.213l4.179-1.497A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.95c-2.4 0-4.687-.745-6.6-2.137l-.473-.343-2.736.98.954-2.788-.36-.444A9.93 9.93 0 012.05 12C2.05 6.51 6.51 2.05 12 2.05S21.95 6.51 21.95 12 17.49 21.95 12 21.95z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/abdullahjavaid22",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/abdullahjavaid22",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Resume", href: "/resume" },
];

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <footer style={{ minHeight: "88px" }} />;
  }

  const isDark = theme === "dark";
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: isDark ? "#0a0e1a" : "#ffffff",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
        padding: "28px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
        className="footer-row"
      >
        {/* Logo + copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#3b82f6",
            }}
          >
            AJ
          </span>
          <span
            style={{
              fontSize: "0.85rem",
              color: isDark ? "#64748b" : "#9ca3af",
            }}
          >
            © {year} Abdullah Javaid. All rights reserved.
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "24px" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: "0.9rem",
                fontWeight: 500,
                color: isDark ? "#cbd5e1" : "#4b5563",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = isDark ? "#cbd5e1" : "#4b5563")
              }
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div style={{ display: "flex", gap: "12px" }}>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isDark ? "#cbd5e1" : "#4b5563",
                background: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#3b82f6";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.05)"
                  : "#f1f5f9";
                e.currentTarget.style.color = isDark ? "#cbd5e1" : "#4b5563";
                e.currentTarget.style.borderColor = isDark
                  ? "rgba(255,255,255,0.08)"
                  : "#e5e7eb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .footer-row {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}