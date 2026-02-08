"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Typewriter effect for alternating words
function TypewriterWord() {
  const words = ["Zindagi", "Potential", "Purpose", "Ideas", "Skills", "Future", "Growth"];
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
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, words]);

  return (
    <span className="relative inline-flex items-center min-w-[3ch] py-0.5">
      <span className="relative z-10 font-black tracking-tighter bg-gradient-to-r from-indigo-500 via-rose-500 to-orange-500 bg-clip-text text-transparent transform-gpu italic">
        {displayText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] sm:w-[4px] h-[0.7em] bg-orange-500 ml-1.5 sm:ml-2 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
      />
    </span>
  );
}

// Simple illustration using shapes and emoji
function NotionIllustration() {
  const blocks = [
    { emoji: "📝", label: "Notes", color: "bg-amber-100", x: "8%", y: "5%" },
    { emoji: "✅", label: "Tasks", color: "bg-green-100", x: "50%", y: "15%" },
    { emoji: "📊", label: "Data", color: "bg-blue-100", x: "20%", y: "40%" },
    { emoji: "🎯", label: "Goals", color: "bg-pink-100", x: "60%", y: "60%" },
    { emoji: "💡", label: "Ideas", color: "bg-purple-100", x: "5%", y: "70%" },
  ];

  return (
    <div className="relative w-full max-w-[340px] aspect-[4/3] mx-auto lg:scale-110 transition-transform duration-700">
      {blocks.map((block, i) => (
        <motion.div
          key={block.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          className={`absolute ${block.color} rounded-xl p-3 sm:p-3.5 shadow-md border border-black/5 whitespace-nowrap backdrop-blur-sm`}
          style={{ left: block.x, top: block.y }}
          whileHover={{ y: -4, scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}
        >
          <span className="text-xl sm:text-2xl">{block.emoji}</span>
          <span className="ml-2 text-xs sm:text-sm font-bold text-gray-800">{block.label}</span>
        </motion.div>
      ))}
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 sm:opacity-100" style={{ zIndex: -1 }}>
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
    <section className="min-h-[85vh] flex items-center justify-center pt-24 pb-12 bg-[#FFFCF8] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-orange-100/50 text-orange-700 border border-orange-200/50">
                <span className="animate-pulse">✨</span> Community Driven
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter mb-4 leading-none"
            >
              <div className="flex flex-row flex-nowrap items-baseline justify-center lg:justify-start gap-x-2 sm:gap-x-4 whitespace-nowrap">
                <span>Explore</span>
                <span className="text-gray-300 font-light hidden sm:inline">your</span>
                <TypewriterWord />
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Geeky Zindagi is where curiosity meets implementation. Build skills, join projects, and grow your potential.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/login"
                className="w-full sm:w-auto px-10 py-3.5 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all shadow-lg hover:shadow-black/10 flex items-center justify-center gap-2"
              >
                Join Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#story"
                className="w-full sm:w-auto px-10 py-3.5 bg-white text-gray-900 border-2 border-gray-100 rounded-full font-bold hover:bg-gray-50 transition-all text-center"
              >
                The Roadmap
              </Link>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 flex justify-center w-full max-w-md lg:max-w-none"
          >
            <NotionIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

