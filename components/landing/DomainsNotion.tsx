"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  { id: "all", label: "All" },
  { id: "creative", label: "Creative" },
  { id: "tech", label: "Tech" },
  { id: "wellness", label: "Wellness" },
  { id: "lifestyle", label: "Lifestyle" },
];

const domains = [
  { name: "Art & Design", category: "creative", emoji: "🎨", color: "bg-pink-100" },
  { name: "Music", category: "creative", emoji: "🎵", color: "bg-purple-100" },
  { name: "Photography", category: "creative", emoji: "📸", color: "bg-amber-100" },
  { name: "Writing", category: "creative", emoji: "✍️", color: "bg-blue-100" },
  { name: "Dance", category: "creative", emoji: "💃", color: "bg-rose-100" },
  { name: "AI & ML", category: "tech", emoji: "🤖", color: "bg-cyan-100" },
  { name: "Backend", category: "tech", emoji: "⚙️", color: "bg-slate-100" },
  { name: "System Design", category: "tech", emoji: "🏗️", color: "bg-indigo-100" },
  { name: "DevOps", category: "tech", emoji: "🚀", color: "bg-orange-100" },
  { name: "IoT", category: "tech", emoji: "📡", color: "bg-green-100" },
  { name: "Fitness", category: "wellness", emoji: "🏋️", color: "bg-red-100" },
  { name: "Running", category: "wellness", emoji: "🏃", color: "bg-sky-100" },
  { name: "Calisthenics", category: "wellness", emoji: "🤸", color: "bg-yellow-100" },
  { name: "Meditation", category: "wellness", emoji: "🧘", color: "bg-violet-100" },
  { name: "Culinary", category: "lifestyle", emoji: "🍳", color: "bg-orange-100" },
  { name: "Travel", category: "lifestyle", emoji: "✈️", color: "bg-sky-100" },
  { name: "Gaming", category: "lifestyle", emoji: "🎮", color: "bg-purple-100" },
  { name: "Reading", category: "lifestyle", emoji: "📚", color: "bg-emerald-100" },
];

function DomainCard({ domain, index }: { domain: (typeof domains)[0]; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ y: -2 }}
      className={`${domain.color} rounded-xl p-4 cursor-pointer hover:shadow-sm transition-shadow`}
    >
      <span className="text-2xl mb-2 block">{domain.emoji}</span>
      <span className="text-sm font-medium text-gray-700">{domain.name}</span>
    </motion.div>
  );
}

export function DomainsNotion() {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filteredDomains =
    activeCategory === "all"
      ? domains
      : domains.filter((d) => d.category === activeCategory);

  return (
    <section id="domains" className="py-24 bg-[#FFFCF8]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-3xl mb-4 block">🌈</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore every domain
            </h2>
            <p className="text-gray-600 text-lg">
              Life is multidimensional. So are we.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            ref={ref}
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {filteredDomains.map((domain, index) => (
              <DomainCard key={domain.name} domain={domain} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
