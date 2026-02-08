"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Typewriter effect for alternating words
function TypewriterWord() {
  const words = ["zindagi", "life"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 80 : 120);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, words]);

  return (
    <span className="inline">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[0.85em] bg-gray-900 ml-0.5 align-middle"
      />
    </span>
  );
}

// Simple illustration using shapes and emoji
function NotionIllustration() {
  const blocks = [
    { emoji: "📝", label: "Notes", color: "bg-amber-100", x: 0, y: 0 },
    { emoji: "✅", label: "Tasks", color: "bg-green-100", x: 180, y: 40 },
    { emoji: "📊", label: "Data", color: "bg-blue-100", x: 60, y: 120 },
    { emoji: "🎯", label: "Goals", color: "bg-pink-100", x: 200, y: 160 },
    { emoji: "💡", label: "Ideas", color: "bg-purple-100", x: -20, y: 200 },
  ];

  return (
    <div className="relative w-80 h-80">
      {blocks.map((block, i) => (
        <motion.div
          key={block.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          className={`absolute ${block.color} rounded-xl p-4 shadow-sm border border-black/5`}
          style={{ left: block.x, top: block.y }}
          whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
        >
          <span className="text-2xl">{block.emoji}</span>
          <span className="ml-2 text-sm font-medium text-gray-700">{block.label}</span>
        </motion.div>
      ))}
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        <motion.path
          d="M 60 30 Q 120 80 200 60"
          stroke="#e5e5e5"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <motion.path
          d="M 80 150 Q 140 180 200 180"
          stroke="#e5e5e5"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />
      </svg>
    </div>
  );
}

export function HeroNotion() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 bg-[#FFFCF8]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 max-w-6xl mx-auto">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700">
                ✨ A community for curious minds
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6"
            >
              Explore <TypewriterWord />
              <br />
              <span className="text-orange-500">the geeky way</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0"
            >
              Learn. Build. Create. Repeat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/login"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#story"
                className="px-6 py-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors"
              >
                Learn more →
              </Link>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 flex justify-center"
          >
            <NotionIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
