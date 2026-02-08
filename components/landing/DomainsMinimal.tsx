"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  { id: "all", label: "All" },
  { id: "creative", label: "Creative" },
  { id: "tech", label: "Tech" },
  { id: "science", label: "Science" },
  { id: "business", label: "Startup" },
  { id: "wellness", label: "Wellness" },
  { id: "lifestyle", label: "Lifestyle" },
];

const domains = [
  { name: "Art & Design", category: "creative" },
  { name: "Music", category: "creative" },
  { name: "Photography", category: "creative" },
  { name: "Writing", category: "creative" },
  { name: "Dance", category: "creative" },
  { name: "AI & ML", category: "tech" },
  { name: "Backend", category: "tech" },
  { name: "System Design", category: "tech" },
  { name: "DevOps", category: "tech" },
  { name: "IoT", category: "tech" },
  { name: "Neuroscience", category: "science" },
  { name: "Psychology", category: "science" },
  { name: "Human Behaviour", category: "science" },
  { name: "EEG", category: "science" },
  { name: "Startup", category: "business" },
  { name: "Fitness", category: "wellness" },
  { name: "Running", category: "wellness" },
  { name: "Calisthenics", category: "wellness" },
  { name: "Meditation", category: "wellness" },
  { name: "Culinary", category: "lifestyle" },
  { name: "Travel", category: "lifestyle" },
  { name: "Gaming", category: "lifestyle" },
  { name: "Reading", category: "lifestyle" },
];

export function DomainsMinimal() {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredDomains =
    activeCategory === "all"
      ? domains
      : domains.filter((d) => d.category === activeCategory);

  return (
    <section id="domains" className="py-32 md:py-40 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Life
            </h2>
            <p className="text-xl text-muted-foreground">
              Life is multidimensional. So are we.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-white text-black"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div ref={ref} className="flex flex-wrap justify-center gap-3">
            {filteredDomains.map((domain, index) => (
              <motion.div
                key={domain.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="px-5 py-3 rounded-full border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 cursor-pointer transition-colors"
              >
                <span className="text-sm font-medium">{domain.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
