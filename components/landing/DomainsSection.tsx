"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Palette,
  Music,
  Heart,
  Footprints,
  Dumbbell,
  PersonStanding,
  Cpu,
  Brain,
  Monitor,
  Server,
  Network,
  Container,
  UtensilsCrossed,
  Camera,
  Pen,
  Gamepad2,
  BookOpen,
  Globe,
  Sparkles,
} from "lucide-react";

const domains = [
  // Creative & Arts
  {
    name: "Art & Design",
    icon: Palette,
    color: "#f43f5e",
    category: "creative",
    description: "Visual arts, UI/UX, graphic design",
  },
  {
    name: "Dance",
    icon: PersonStanding,
    color: "#ec4899",
    category: "creative",
    description: "Movement, expression, rhythm",
  },
  {
    name: "Music & Singing",
    icon: Music,
    color: "#d946ef",
    category: "creative",
    description: "Vocals, instruments, production",
  },
  {
    name: "Photography",
    icon: Camera,
    color: "#a855f7",
    category: "creative",
    description: "Capturing moments, visual stories",
  },
  {
    name: "Writing",
    icon: Pen,
    color: "#8b5cf6",
    category: "creative",
    description: "Blogs, poetry, storytelling",
  },

  // Health & Fitness
  {
    name: "Health & Wellness",
    icon: Heart,
    color: "#ef4444",
    category: "fitness",
    description: "Mental health, lifestyle balance",
  },
  {
    name: "Running",
    icon: Footprints,
    color: "#f97316",
    category: "fitness",
    description: "Marathons, trails, cardio",
  },
  {
    name: "Gym & Strength",
    icon: Dumbbell,
    color: "#eab308",
    category: "fitness",
    description: "Weightlifting, bodybuilding",
  },
  {
    name: "Calisthenics",
    icon: PersonStanding,
    color: "#84cc16",
    category: "fitness",
    description: "Bodyweight mastery, street workout",
  },
  {
    name: "Indoor Sports",
    icon: Gamepad2,
    color: "#8b5cf6",
    category: "fitness",
    description: "Badminton, table tennis, swimming",
  },
  {
    name: "Outdoor Sports",
    icon: Footprints,
    color: "#f59e0b",
    category: "fitness",
    description: "Cricket, football, trekking",
  },
  // Mind & Science
  {
    name: "Neuroscience",
    icon: Brain,
    color: "#06b6d4",
    category: "science",
    description: "Brain structure and function",
  },
  {
    name: "Psychology",
    icon: Heart,
    color: "#8b5cf6",
    category: "science",
    description: "Human behavior and mental processes",
  },
  {
    name: "Human Behaviour",
    icon: PersonStanding,
    color: "#ec4899",
    category: "science",
    description: "Social dynamics and behavioral patterns",
  },
  {
    name: "EEG",
    icon: Network,
    color: "#22c55e",
    category: "science",
    description: "Brainwave monitoring and neurofeedback",
  },
  {
    name: "Quantum Computing",
    icon: Cpu,
    color: "#06b6d4",
    category: "science",
    description: "Quantum mechanics in computation",
  },
  {
    name: "Consciousness",
    icon: Brain,
    color: "#8b5cf6",
    category: "science",
    description: "The study of awareness and being",
  },

  // Knowledge & Tools
  {
    name: "Books & Literature",
    icon: BookOpen,
    color: "#6366f1",
    category: "education",
    description: "Exploration through reading and writing",
  },
  {
    name: "Learning Tools",
    icon: Sparkles,
    color: "#10b981",
    category: "education",
    description: "Frameworks and tools for growth",
  },

  // Startups & Business
  {
    name: "Startup",
    icon: Sparkles,
    color: "#f59e0b",
    category: "business",
    description: "Building, scaling, and entrepreneurship",
  },
  // Tech & Engineering
  {
    name: "IoT & Hardware",
    icon: Cpu,
    color: "#22c55e",
    category: "tech",
    description: "Embedded systems, sensors, makers",
  },
  {
    name: "AI & ML",
    icon: Brain,
    color: "#10b981",
    category: "tech",
    description: "Machine learning, deep learning",
  },
  {
    name: "Desktop Apps",
    icon: Monitor,
    color: "#14b8a6",
    category: "tech",
    description: "Native apps, Electron, cross-platform",
  },
  {
    name: "Backend",
    icon: Server,
    color: "#06b6d4",
    category: "tech",
    description: "APIs, databases, microservices",
  },
  {
    name: "System Design",
    icon: Network,
    color: "#0ea5e9",
    category: "tech",
    description: "Architecture, scalability, patterns",
  },
  {
    name: "DevOps",
    icon: Container,
    color: "#3b82f6",
    category: "tech",
    description: "CI/CD, cloud, infrastructure",
  },

  // Lifestyle
  {
    name: "Food & Culinary",
    icon: UtensilsCrossed,
    color: "#f59e0b",
    category: "lifestyle",
    description: "Cooking, recipes, food culture",
  },
  {
    name: "Gardening",
    icon: Footprints,
    color: "#84cc16",
    category: "lifestyle",
    description: "Plants, urban farming, urban gardening",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    color: "#6366f1",
    category: "lifestyle",
    description: "Games, streaming, esports",
  },
  {
    name: "Reading",
    icon: BookOpen,
    color: "#8b5cf6",
    category: "lifestyle",
    description: "Books, knowledge, wisdom",
  },
  {
    name: "Travel",
    icon: Globe,
    color: "#0891b2",
    category: "lifestyle",
    description: "Exploration, cultures, adventures",
  },
];

const categories = [
  { id: "all", label: "All Domains" },
  { id: "creative", label: "Creative Arts" },
  { id: "fitness", label: "Health & Fitness" },
  { id: "tech", label: "Tech & Code" },
  { id: "lifestyle", label: "Lifestyle" },
];

function DomainCard({
  domain,
  index,
}: {
  domain: (typeof domains)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: `${domain.color}30` }}
      />
      <div className="relative bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-5 h-full hover:border-white/20 transition-all duration-300 overflow-hidden">
        {/* Decorative corner */}
        <div
          className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity"
          style={{
            background: `radial-gradient(circle at top right, ${domain.color}, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
          style={{ backgroundColor: `${domain.color}20` }}
        >
          <domain.icon className="w-6 h-6" style={{ color: domain.color }} />
        </div>

        {/* Content */}
        <h3 className="font-semibold text-lg mb-1 group-hover:text-white transition-colors">
          {domain.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {domain.description}
        </p>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4" style={{ color: domain.color }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function DomainsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredDomains =
    activeCategory === "all"
      ? domains
      : domains.filter((d) => d.category === activeCategory);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Artistic background */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

        {/* Flowing lines - artistic feel */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,100 Q200,50 400,100 T800,100"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
          />
          <motion.path
            d="M0,300 Q300,250 600,300 T1200,300"
            stroke="url(#lineGradient2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "loop", delay: 1 }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            <Palette className="w-4 h-4" />
            Life is Multidimensional
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore Every{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Domain
            </span>{" "}
            of Life
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe a fulfilling life isn&apos;t just about code. It&apos;s about{" "}
            <span className="text-purple-400">art</span>,{" "}
            <span className="text-pink-400">movement</span>,{" "}
            <span className="text-blue-400">creation</span>, and{" "}
            <span className="text-green-400">connection</span>. Explore together,
            grow together.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Domains grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {filteredDomains.map((domain, index) => (
            <DomainCard key={domain.name} domain={domain} index={index} />
          ))}
        </motion.div>

        {/* Collaborative message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-white/10">
            <div className="flex -space-x-2">
              {["#a855f7", "#ec4899", "#f97316", "#22c55e"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: color }}
                >
                  {["🎨", "💃", "🎵", "💻"][i]}
                </div>
              ))}
            </div>
            <span className="text-muted-foreground">
              Join{" "}
              <span className="text-white font-medium">passionate creators</span>{" "}
              exploring life together
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
