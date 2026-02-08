"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Be Curious",
    description: "Every journey starts with a question.",
    emoji: "🔍",
    color: "from-purple-500 to-violet-500",
  },
  {
    number: "02",
    title: "Learn",
    description: "Knowledge without action is just trivia.",
    emoji: "📚",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "03",
    title: "Build",
    description: "Ideas are everywhere, execution is everything.",
    emoji: "🔨",
    color: "from-emerald-500 to-green-500",
  },
  {
    number: "04",
    title: "Create Value",
    description: "Solve real problems for real people.",
    emoji: "💎",
    color: "from-orange-500 to-amber-500",
  },
  {
    number: "05",
    title: "Mentor",
    description: "Pay it forward, keep the cycle alive.",
    emoji: "🌱",
    color: "from-pink-500 to-rose-500",
  },
];

function StepIllustration({ emoji, color, isHovered }: { emoji: string; color: string; isHovered: boolean }) {
  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      {/* Glowing background */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-20`}
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Orbiting particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${color}`}
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [
              Math.cos((i * 2 * Math.PI) / 3) * (isHovered ? 35 : 25),
              Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * (isHovered ? 35 : 25),
              Math.cos((i * 2 * Math.PI) / 3) * (isHovered ? 35 : 25),
            ],
            y: [
              Math.sin((i * 2 * Math.PI) / 3) * (isHovered ? 35 : 25),
              Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * (isHovered ? 35 : 25),
              Math.sin((i * 2 * Math.PI) / 3) * (isHovered ? 35 : 25),
            ],
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
        />
      ))}
      
      {/* Emoji */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-3xl"
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? [0, -10, 10, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {emoji}
      </motion.div>
    </div>
  );
}

function Step({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isHovered = useMotionValue(false);
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      {/* Connection line */}
      {index < steps.length - 1 && (
        <motion.div
          className="absolute left-10 top-20 w-0.5 h-16 bg-gradient-to-b from-white/20 to-transparent"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          style={{ originY: 0 }}
        />
      )}

      <motion.div 
        className="flex items-start gap-6 p-6 rounded-3xl transition-colors"
        animate={{
          backgroundColor: hovered ? "rgba(255,255,255,0.02)" : "transparent",
        }}
      >
        <StepIllustration emoji={step.emoji} color={step.color} isHovered={hovered} />
        
        <div className="flex-1 pt-2">
          <div className="flex items-center gap-3 mb-2">
            <motion.span 
              className="text-xs font-mono text-muted-foreground/50"
              animate={{ opacity: hovered ? 1 : 0.5 }}
            >
              {step.number}
            </motion.span>
            <motion.div
              className={`h-px flex-1 bg-gradient-to-r ${step.color}`}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: hovered ? 1 : 0, 
                opacity: hovered ? 0.5 : 0 
              }}
              style={{ originX: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <motion.h3 
            className="text-2xl md:text-3xl font-semibold mb-2"
            animate={{
              color: hovered ? "#fff" : "rgba(255,255,255,0.9)",
              x: hovered ? 5 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {step.title}
          </motion.h3>
          
          <motion.p 
            className="text-muted-foreground text-lg"
            animate={{ opacity: hovered ? 1 : 0.7 }}
          >
            {step.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Need to import React for useState
import React from "react";

export function StoryAlive() {
  const containerRef = useRef(null);

  return (
    <section id="story" className="py-32 md:py-40 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-4"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              The Journey
            </motion.h2>
            <p className="text-xl text-muted-foreground">
              Five steps that transform curiosity into impact.
            </p>
          </motion.div>

          {/* Steps */}
          <div ref={containerRef} className="space-y-4">
            {steps.map((step, index) => (
              <Step key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
