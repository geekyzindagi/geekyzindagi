"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    emoji: "🔍",
    title: "Be Curious",
    description: "Every journey starts with a question. Ask why, explore the unknown.",
    color: "bg-purple-100",
  },
  {
    emoji: "📚",
    title: "Learn",
    description: "Knowledge without action is just trivia. Learn by doing.",
    color: "bg-blue-100",
  },
  {
    emoji: "🔨",
    title: "Build",
    description: "Ideas are everywhere. Turn them into something real.",
    color: "bg-green-100",
  },
  {
    emoji: "💎",
    title: "Create Value",
    description: "Solve real problems for real people. Make an impact.",
    color: "bg-amber-100",
  },
  {
    emoji: "🌱",
    title: "Mentor",
    description: "Pay it forward. Help others grow on their journey.",
    color: "bg-pink-100",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-white hover:shadow-sm transition-all cursor-default">
        <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center text-2xl flex-shrink-0`}>
          {step.emoji}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {step.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function StoryNotion() {
  return (
    <section id="story" className="py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-3xl mb-4 block">🚀</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Journey
            </h2>
            <p className="text-gray-600 text-lg">
              Five steps to transform curiosity into impact.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-2">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
