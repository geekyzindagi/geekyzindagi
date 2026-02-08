"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    emoji: "💡",
    title: "Curiosity-First",
    description: "We embrace questions and find joy in discovering something new.",
    color: "bg-yellow-100",
  },
  {
    emoji: "📖",
    title: "Learn Together",
    description: "Collaborative learning through shared experiences and projects.",
    color: "bg-blue-100",
  },
  {
    emoji: "🛠️",
    title: "Build & Ship",
    description: "Turn ideas into reality. Ship projects, not just plans.",
    color: "bg-green-100",
  },
  {
    emoji: "🎯",
    title: "Create Impact",
    description: "Build tools that solve real problems for real people.",
    color: "bg-orange-100",
  },
  {
    emoji: "👥",
    title: "Community",
    description: "Connect with curious minds who share your passions.",
    color: "bg-pink-100",
  },
  {
    emoji: "❤️",
    title: "Mentor Forward",
    description: "Pay it forward by helping others on their journey.",
    color: "bg-red-100",
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
      className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow"
    >
      <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center text-2xl mb-4`}>
        {feature.emoji}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {feature.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function FeaturesNotion() {
  return (
    <section id="features" className="py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-3xl mb-4 block">✨</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Geeky Way
            </h2>
            <p className="text-gray-600 text-lg">
              Six principles that guide everything we do.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
