"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">AJ</div>
      </nav>
    );
  }

  const isDark = theme === "dark";
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Resume", href: "/resume" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? isDark
              ? "rgba(10, 15, 30, 0.90)"
              : "rgba(255, 255, 255, 0.90)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? isDark
              ? "1px solid rgba(59,130,246,0.15)"
              : "1px solid rgba(0,0,0,0.08)"
            : "none",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.12)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2 cursor-pointer"
          >
            <div
              className="relative w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)" }}
            >
              <span className="text-white font-black text-lg">AJ</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-xl border border-dashed border-blue-400 opacity-50"
              />
            </div>
            <div>
              <p className="font-bold text-sm leading-none"
                style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}>
                Abdullah
              </p>
              <p className="text-xs leading-none text-blue-500">Javaid</p>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  style={{ color: isDark ? "#e2e8f0" : "#374151" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: isDark
                          ? "rgba(59,130,246,0.15)"
                          : "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 hover:text-blue-500 transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href="https://wa.me/923079886730"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
            >
              <span>💬</span>
              <span>Hire Me</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300"
              style={{
                background: isDark ? "rgba(51,65,85,0.8)" : "rgba(241,245,249,0.8)",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? "☀️" : "🌙"}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5"
              style={{
                background: isDark ? "rgba(51,65,85,0.8)" : "rgba(241,245,249,0.8)",
              }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 block rounded"
                style={{ backgroundColor: isDark ? "#f1f5f9" : "#0f172a" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 block rounded"
                style={{ backgroundColor: isDark ? "#f1f5f9" : "#0f172a" }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 block rounded"
                style={{ backgroundColor: isDark ? "#f1f5f9" : "#0f172a" }}
              />
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
              style={{
                background: isDark ? "rgba(10,15,30,0.95)" : "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setMenuOpen(false)}
                    className="py-3 px-4 rounded-xl font-medium transition-colors"
                    style={{
                      color: isDark ? "#e2e8f0" : "#374151",
                      background: pathname === link.href
                        ? isDark ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.1)"
                        : isDark ? "rgba(59,130,246,0.05)" : "rgba(59,130,246,0.03)",
                      border: pathname === link.href ? "1px solid rgba(59,130,246,0.3)" : "none",
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="https://wa.me/923079886730"
                  target="_blank"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="py-3 px-4 rounded-xl font-medium text-white text-center"
                  style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
                >
                  WhatsApp Me
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}