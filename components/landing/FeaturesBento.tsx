"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Rocket,
  Users,
  BookOpen,
  Lightbulb,
  Target,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Curiosity-First",
    description:
      "We believe every great journey starts with a simple 'why?'",
    gradient: "from-yellow-500 to-orange-500",
    size: "large",
  },
  {
    icon: BookOpen,
    title: "Learn Together",
    description: "Collaborative learning through shared experiences",
    gradient: "from-blue-500 to-cyan-500",
    size: "medium",
  },
  {
    icon: Rocket,
    title: "Build & Ship",
    description: "Turn ideas into reality with hands-on projects",
    gradient: "from-purple-500 to-pink-500",
    size: "medium",
  },
  {
    icon: Target,
    title: "Create Impact",
    description: "Make tools that solve real problems",
    gradient: "from-green-500 to-emerald-500",
    size: "small",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with like-minded geeks",
    gradient: "from-pink-500 to-rose-500",
    size: "small",
  },
  {
    icon: Heart,
    title: "Mentor & Grow",
    description: "Pay it forward by helping others",
    gradient: "from-red-500 to-orange-500",
    size: "small",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const sizeClasses = {
    large: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    medium: "col-span-12 md:col-span-6 lg:col-span-4",
    small: "col-span-6 md:col-span-4 lg:col-span-4",
  }[feature.size];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${sizeClasses} group`}
    >
      <div className="relative h-full min-h-[200px] p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer">
        {/* Gradient background on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Glowing orb */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-30 blur-3xl transition-opacity duration-500`}
        />

        <div className="relative z-10 h-full flex flex-col">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-6`}
          >
            <feature.icon className="w-7 h-7 text-white" />
          </motion.div>

          {/* Content */}
          <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-white transition-colors">
            {feature.title}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base flex-1">
            {feature.description}
          </p>

          {/* Learn more */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
              Learn more
            </span>
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesBento() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="features"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/5 to-background pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Our Philosophy
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            The Geeky{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Way
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Six principles that guide everything we do
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        />
      </div>
    </section>
  );
}
