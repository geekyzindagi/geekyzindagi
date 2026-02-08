"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "creative", label: "Creative", emoji: "🎨" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "science", label: "Mind & Science", emoji: "🧠" },
  { id: "business", label: "Startup", emoji: "🚀" },
  { id: "wellness", label: "Wellness", emoji: "💪" },
  { id: "lifestyle", label: "Lifestyle", emoji: "🌟" },
];

const domains = [
  { name: "Art & Design", category: "creative", emoji: "🎨", color: "from-pink-500 to-rose-500" },
  { name: "Music", category: "creative", emoji: "🎵", color: "from-purple-500 to-violet-500" },
  { name: "Photography", category: "creative", emoji: "📸", color: "from-amber-500 to-orange-500" },
  { name: "Writing", category: "creative", emoji: "✍️", color: "from-blue-500 to-indigo-500" },
  { name: "Dance", category: "creative", emoji: "💃", color: "from-fuchsia-500 to-pink-500" },
  { name: "AI & ML", category: "tech", emoji: "🤖", color: "from-cyan-500 to-blue-500" },
  { name: "Backend", category: "tech", emoji: "⚙️", color: "from-slate-500 to-zinc-500" },
  { name: "System Design", category: "tech", emoji: "🏗️", color: "from-indigo-500 to-purple-500" },
  { name: "DevOps", category: "tech", emoji: "🚀", color: "from-orange-500 to-red-500" },
  { name: "IoT", category: "tech", emoji: "📡", color: "from-green-500 to-emerald-500" },
  { name: "Neuroscience", category: "science", emoji: "🧠", color: "from-indigo-500 to-cyan-500" },
  { name: "Psychology", category: "science", emoji: "💡", color: "from-purple-500 to-indigo-500" },
  { name: "Human Behaviour", category: "science", emoji: "👥", color: "from-pink-500 to-purple-500" },
  { name: "EEG", category: "science", emoji: "〰️", color: "from-emerald-500 to-cyan-500" },
  { name: "Startup", category: "business", emoji: "🚀", color: "from-orange-500 to-yellow-500" },
  { name: "Fitness", category: "wellness", emoji: "🏋️", color: "from-red-500 to-orange-500" },
  { name: "Running", category: "wellness", emoji: "🏃", color: "from-sky-500 to-blue-500" },
  { name: "Calisthenics", category: "wellness", emoji: "🤸", color: "from-yellow-500 to-amber-500" },
  { name: "Meditation", category: "wellness", emoji: "🧘", color: "from-violet-500 to-purple-500" },
  { name: "Culinary", category: "lifestyle", emoji: "🍳", color: "from-orange-500 to-yellow-500" },
  { name: "Travel", category: "lifestyle", emoji: "✈️", color: "from-sky-500 to-cyan-500" },
  { name: "Gaming", category: "lifestyle", emoji: "🎮", color: "from-purple-500 to-pink-500" },
  { name: "Reading", category: "lifestyle", emoji: "📚", color: "from-emerald-500 to-teal-500" },
];

function DomainPill({ domain, index }: { domain: (typeof domains)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        className="relative px-5 py-3 rounded-full border border-white/10 cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          borderColor: isHovered ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.1)",
        }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${domain.color} opacity-0`}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Content */}
        <div className="relative flex items-center gap-2">
          <motion.span
            animate={{
              scale: isHovered ? [1, 1.3, 1] : 1,
              rotate: isHovered ? [0, -15, 15, 0] : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {domain.emoji}
          </motion.span>
          <span className="text-sm font-medium">{domain.name}</span>
        </div>

        {/* Sparkle effect on hover */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                initial={{
                  x: "50%",
                  y: "50%",
                  opacity: 1,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  opacity: 0,
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export function DomainsAlive() {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredDomains =
    activeCategory === "all"
      ? domains
      : domains.filter((d) => d.category === activeCategory);

  return (
    <section id="domains" className="py-32 md:py-40 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Explore Life
            </motion.h2>
            <p className="text-xl text-muted-foreground">
              Life is multidimensional. So are we.
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors overflow-hidden ${
                  activeCategory === cat.id
                    ? "text-black"
                    : "text-muted-foreground hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active background */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={false}
                  animate={{
                    scale: activeCategory === cat.id ? 1 : 0,
                    opacity: activeCategory === cat.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ borderRadius: 9999 }}
                />
                
                {/* Hover background */}
                {activeCategory !== cat.id && (
                  <motion.div
                    className="absolute inset-0 bg-white/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{ borderRadius: 9999 }}
                  />
                )}

                <span className="relative flex items-center gap-2">
                  <motion.span
                    animate={{
                      rotate: activeCategory === cat.id ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {cat.emoji}
                  </motion.span>
                  {cat.label}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Domain pills */}
          <motion.div 
            ref={ref} 
            className="flex flex-wrap justify-center gap-3"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredDomains.map((domain, index) => (
                <DomainPill key={domain.name} domain={domain} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Floating hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-muted-foreground/50 mt-12"
          >
            Hover over domains to explore ✨
          </motion.p>
        </div>
      </div>
    </section>
  );
}
