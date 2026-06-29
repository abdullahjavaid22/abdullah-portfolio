"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "./ParticlesBackground";

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 bg-white">
        <h1 className="text-5xl font-bold text-gray-900">Abdullah Javaid</h1>
      </section>
    );
  }
  const isDark = theme === "dark";
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: isDark ? "#0f172a" : "#f8fafc" }}
    >
      <ParticlesBackground />
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Available for Work
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
          >
            Abdullah <span className="text-blue-600">Javaid</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-medium mb-6"
            style={{ color: isDark ? "#94a3b8" : "#4b5563" }}
          >
            Web Developer 
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg leading-relaxed mb-8 max-w-lg"
            style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
          >
           Web Developer with a passion for creating modern, responsive and scalable web applications that deliver seamless user experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a href="/resume" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 text-center">
              View Resume
            </a>
            <a href="https://wa.me/923075998730" target="_blank" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              WhatsApp Me
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl">
              <span className="text-6xl md:text-8xl font-bold text-white">AJ</span>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border-2 border-dashed border-blue-400 opacity-50"
              style={{ inset: "-10px" }}
            />
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: isDark ? "#94a3b8" : "#6b7280" }}
      >
        <span className="text-sm">Scroll Down</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}