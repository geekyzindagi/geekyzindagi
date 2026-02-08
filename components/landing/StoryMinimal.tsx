"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Be Curious",
    description: "Every journey starts with a question.",
  },
  {
    number: "02",
    title: "Learn",
    description: "Knowledge without action is just trivia.",
  },
  {
    number: "03",
    title: "Build",
    description: "Ideas are everywhere, execution is everything.",
  },
  {
    number: "04",
    title: "Create Value",
    description: "Solve real problems for real people.",
  },
  {
    number: "05",
    title: "Mentor",
    description: "Pay it forward, keep the cycle alive.",
  },
];

function Step({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-start gap-6 p-6 rounded-2xl hover:bg-white/[0.02] transition-colors">
        <span className="text-sm font-mono text-muted-foreground/50 pt-1">
          {step.number}
        </span>
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
            {step.title}
          </h3>
          <p className="text-muted-foreground text-lg">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function StoryMinimal() {
  return (
    <section id="story" className="py-32 md:py-40">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Five steps that transform curiosity into impact.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-2">
            {steps.map((step, index) => (
              <Step key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
