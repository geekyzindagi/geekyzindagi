"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Lightbulb,
  Users,
  Rocket,
  Heart,
  BookOpen,
  Target,
  LucideIcon,
} from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Curiosity-First",
    description: "We embrace the unknown and find joy in discovery.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: BookOpen,
    title: "Learn Together",
    description: "Collaborative learning through shared experiences.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Rocket,
    title: "Build & Ship",
    description: "Turn ideas into reality with hands-on projects.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Create Impact",
    description: "Make tools that solve real problems.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with like-minded curious minds.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Heart,
    title: "Mentor Forward",
    description: "Pay it forward by helping others grow.",
    color: "from-red-500 to-orange-500",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
  };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-6 rounded-3xl cursor-pointer"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-white/[0.02]"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Gradient border on hover */}
      <motion.div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0`}
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        style={{ padding: 1 }}
      />

      <div className="relative">
        {/* Icon container */}
        <div className="relative w-12 h-12 mb-4">
          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.color} blur-lg`}
            animate={{
              opacity: isHovered ? 0.5 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon background */}
          <motion.div
            className={`relative w-full h-full rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>

          {/* Orbiting dot */}
          <motion.div
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`}
            style={{ top: "50%", left: "50%" }}
            animate={{
              x: isHovered ? [0, 25, 0, -25, 0] : 0,
              y: isHovered ? [-25, 0, 25, 0, -25] : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Title */}
        <motion.h3
          className="text-lg font-semibold mb-2"
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-muted-foreground text-sm leading-relaxed"
          animate={{
            opacity: isHovered ? 1 : 0.7,
          }}
        >
          {feature.description}
        </motion.p>

        {/* Learn more link */}
        <motion.div
          className={`mt-4 flex items-center gap-1 text-sm font-medium bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.2 }}
        >
          <span>Explore</span>
          <motion.span
            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function FeaturesAlive() {
  return (
    <section id="features" className="py-32 md:py-40 relative">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
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
              The Geeky Way
            </motion.h2>
            <p className="text-xl text-muted-foreground">
              Six principles that guide everything we do.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
