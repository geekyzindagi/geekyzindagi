"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Palette,
  Music,
  Heart,
  Dumbbell,
  Brain,
  Server,
  UtensilsCrossed,
  Camera,
  Code2,
  Gamepad2,
  BookOpen,
  Sparkles,
  Rocket,
  Microscope,
  Lightbulb,
} from "lucide-react";
import { ParallaxLayer } from "./effects";

const domainGroups = {
  science: {
    title: "Mind & Science",
    emoji: "🧠",
    gradient: "from-indigo-500 to-cyan-500",
    items: [
      { name: "Neuroscience", icon: Brain },
      { name: "Psychology", icon: Microscope },
      { name: "Human Behaviour", icon: Lightbulb },
    ],
  },
  creative: {
    title: "Creative Arts",
    emoji: "🎨",
    gradient: "from-pink-500 to-rose-500",
    items: [
      { name: "Art & Design", icon: Palette },
      { name: "Music", icon: Music },
      { name: "Photography", icon: Camera },
    ],
  },
  fitness: {
    title: "Health & Fitness",
    emoji: "💪",
    gradient: "from-orange-500 to-yellow-500",
    items: [
      { name: "Wellness", icon: Heart },
      { name: "Training", icon: Dumbbell },
    ],
  },
  tech: {
    title: "Tech & Code",
    emoji: "💻",
    gradient: "from-blue-500 to-cyan-500",
    items: [
      { name: "AI & ML", icon: Brain },
      { name: "Backend", icon: Server },
      { name: "DevOps", icon: Code2 },
    ],
  },
  startup: {
    title: "Startups",
    emoji: "🚀",
    gradient: "from-emerald-500 to-teal-500",
    items: [
      { name: "Business", icon: Rocket },
      { name: "Strategy", icon: Lightbulb },
    ],
  },
  lifestyle: {
    title: "Lifestyle",
    emoji: "✨",
    gradient: "from-purple-500 to-pink-500",
    items: [
      { name: "Culinary", icon: UtensilsCrossed },
      { name: "Gaming", icon: Gamepad2 },
      { name: "Reading", icon: BookOpen },
    ],
  },
};

function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function DomainsBento() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="domains"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Life is Multidimensional
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Explore Every{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Domain
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Life isn&apos;t just code. It&apos;s art, movement, creation, and connection.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large Creative Card */}
          <BentoCard className="col-span-12 md:col-span-8 lg:col-span-5 min-h-[300px] p-8 group hover:border-pink-500/30 transition-colors">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(236,72,153,0.15), transparent 60%)",
              }}
            />
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl shadow-lg shadow-pink-500/20">
                  🎨
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Creative Arts</h3>
                  <p className="text-sm text-muted-foreground">Express yourself</p>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-3">
                {domainGroups.creative.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-pink-500/10 transition-colors cursor-pointer"
                  >
                    <item.icon className="w-8 h-8 text-pink-400 mb-2" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex items-center text-sm text-pink-400">
                <span>Art, Dance, Music, Writing, Photography</span>
              </div>
            </div>
          </BentoCard>

          {/* Tech Card - Tall */}
          <BentoCard
            className="col-span-12 md:col-span-4 lg:col-span-4 row-span-2 p-8 group hover:border-blue-500/30 transition-colors"
            delay={0.1}
          >
            <ParallaxLayer offset={30}>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.15), transparent 60%)",
                }}
              />
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20 mb-6">
                  💻
                </div>
                <h3 className="text-2xl font-bold mb-2">Tech & Code</h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Build the future with cutting-edge technology
                </p>
                <div className="flex-1 space-y-3">
                  {[
                    { name: "AI & Machine Learning", color: "#10b981" },
                    { name: "Backend & APIs", color: "#06b6d4" },
                    { name: "System Design", color: "#0ea5e9" },
                    { name: "DevOps & Cloud", color: "#3b82f6" },
                    { name: "IoT & Hardware", color: "#22c55e" },
                    { name: "Desktop Apps", color: "#8b5cf6" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-blue-500/10 transition-colors cursor-pointer group/item"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ParallaxLayer>
          </BentoCard>

          {/* Quote Card */}
          <BentoCard
            className="col-span-12 lg:col-span-3 p-6 group hover:border-purple-500/30 transition-colors"
            delay={0.15}
          >
            <div className="h-full flex flex-col justify-center text-center">
              <div className="text-4xl mb-4">&ldquo;</div>
              <p className="text-lg italic text-muted-foreground mb-4">
                Where curiosity meets creation
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
            </div>
          </BentoCard>

          {/* Fitness Card */}
          <BentoCard
            className="col-span-6 lg:col-span-3 p-6 group hover:border-orange-500/30 transition-colors"
            delay={0.2}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.15), transparent 60%)",
              }}
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20 mb-4">
                💪
              </div>
              <h3 className="text-xl font-bold mb-2">Health & Fitness</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mind, body, movement
              </p>
              <div className="flex flex-wrap gap-2">
                {["Running", "Gym", "Calisthenics", "Wellness"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Lifestyle Card */}
          <BentoCard
            className="col-span-6 lg:col-span-2 p-6 group hover:border-green-500/30 transition-colors"
            delay={0.25}
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl shadow-lg shadow-green-500/20 mb-4">
                ✨
              </div>
              <h3 className="text-lg font-bold mb-2">Lifestyle</h3>
              <div className="flex-1 flex flex-col justify-end gap-2">
                {["🍳 Culinary", "🎮 Gaming", "📚 Reading", "🌍 Travel"].map(
                  (item) => (
                    <div
                      key={item}
                      className="text-sm text-muted-foreground hover:text-white transition-colors cursor-pointer"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </BentoCard>

          {/* Community CTA Card */}
          <BentoCard
            className="col-span-12 lg:col-span-5 p-8 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 group hover:border-purple-500/30 transition-colors"
            delay={0.3}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex -space-x-3">
                {["🎨", "💻", "🎵", "📸", "🏃"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl border-2 border-background shadow-lg"
                  >
                    {emoji}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.75 }}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold border-2 border-background"
                >
                  +99
                </motion.div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-1">
                  Join passionate creators
                </h3>
                <p className="text-muted-foreground text-sm">
                  Explore, learn, and grow together across every domain of life
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-white text-background font-medium hover:bg-white/90 transition-colors"
              >
                Join Now
              </motion.button>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
