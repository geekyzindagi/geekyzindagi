"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, Star } from "lucide-react";
import Link from "next/link";
import { GradientMesh, Glow } from "./effects";

export function HeroBento() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-20 pb-12 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-purple-950/20" />
      <GradientMesh />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 min-h-[85vh] items-center">
          {/* Main Hero Content - Large card */}
          <motion.div
            style={{ y: y1 }}
            className="col-span-12 lg:col-span-7 row-span-2"
          >
            <div className="relative h-full p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden">
              {/* Decorative elements */}
              <Glow color="purple" size="lg" className="-top-20 -left-20" />
              <Glow color="pink" size="md" className="bottom-0 right-0" />

              <div className="relative z-10">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Where Curiosity Meets Creation</span>
                </motion.div>

                {/* Headline with gradient */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
                >
                  <span className="block">Explore</span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    Zindagi
                  </span>
                  <span className="block text-muted-foreground/80">the Geeky Way</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed"
                >
                  A creative tribe of curious minds—learning, building, and
                  mentoring across <span className="text-purple-400">art</span>,{" "}
                  <span className="text-pink-400">tech</span>,{" "}
                  <span className="text-blue-400">fitness</span>, and{" "}
                  <span className="text-orange-400">life</span>.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-6 text-lg rounded-full shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                  >
                    <Link href="/login" className="flex items-center gap-2">
                      Join the Tribe
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    className="px-8 py-6 text-lg rounded-full border border-white/10 hover:bg-white/5 hover:border-white/20"
                  >
                    <Link href="#story" className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Our Story
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Top right - Stats card */}
          <motion.div
            style={{ y: y2 }}
            className="col-span-6 lg:col-span-5 hidden lg:block"
          >
            <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4 h-full">
                {[
                  { icon: "🚀", value: "∞", label: "Possibilities" },
                  { icon: "💡", value: "24/7", label: "Curiosity" },
                  { icon: "🎨", value: "19+", label: "Life Domains" },
                  { icon: "🤝", value: "1", label: "Community" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-2xl mb-2">{stat.icon}</span>
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom right cards */}
          <motion.div
            style={{ y: y3 }}
            className="col-span-6 lg:col-span-3 hidden lg:block"
          >
            <div className="h-full p-5 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-sm group hover:border-blue-500/30 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <span className="text-xl">💻</span>
                </div>
                <span className="font-medium">Tech & Code</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI, Backend, DevOps, IoT & more
              </p>
              <div className="mt-4 flex gap-1">
                {["#a855f7", "#3b82f6", "#22c55e"].map((color, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y3 }}
            className="col-span-6 lg:col-span-2 hidden lg:block"
          >
            <div className="h-full p-5 rounded-3xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-white/10 backdrop-blur-sm group hover:border-pink-500/30 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <span className="text-xl">🎨</span>
                </div>
                <span className="font-medium">Creative</span>
              </div>
              <p className="text-sm text-muted-foreground">Art, Music, Dance</p>
            </div>
          </motion.div>

          {/* Testimonial mini card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="col-span-12 lg:col-span-5 hidden lg:block"
          >
            <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    &ldquo;Found my tribe here. The collaboration across domains is
                    incredible!&rdquo;
                  </p>
                  <p className="text-xs text-purple-400 mt-2">— Ananya K., Designer & Developer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-purple-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
