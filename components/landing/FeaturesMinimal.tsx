"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lightbulb,
  Users,
  Rocket,
  Heart,
  BookOpen,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Curiosity-First",
    description: "We embrace the unknown and find joy in discovery.",
  },
  {
    icon: BookOpen,
    title: "Learn Together",
    description: "Collaborative learning through shared experiences.",
  },
  {
    icon: Rocket,
    title: "Build & Ship",
    description: "Turn ideas into reality with hands-on projects.",
  },
  {
    icon: Target,
    title: "Create Impact",
    description: "Make tools that solve real problems.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with like-minded curious minds.",
  },
  {
    icon: Heart,
    title: "Mentor Forward",
    description: "Pay it forward by helping others grow.",
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group p-6 rounded-2xl hover:bg-white/[0.02] transition-colors"
    >
      <feature.icon className="w-6 h-6 text-purple-400 mb-4 group-hover:text-purple-300 transition-colors" />
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function FeaturesMinimal() {
  return (
    <section id="features" className="py-32 md:py-40">
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
              The Geeky Way
            </h2>
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
