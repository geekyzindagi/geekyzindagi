"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code2,
  Cpu,
  Globe,
  Layers,
  MessageSquare,
  Palette,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Open Source First",
    description:
      "We believe in building in public. Share code, contribute to projects, and grow together.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Cpu,
    title: "Tech Deep Dives",
    description:
      "From system design to algorithms, we go beyond the surface to truly understand how things work.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Globe,
    title: "Global Community",
    description:
      "Connect with geeks from around the world. Different perspectives, shared passion.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: MessageSquare,
    title: "Knowledge Sharing",
    description:
      "Blog posts, tutorials, discussions—we create content that helps others on their journey.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Layers,
    title: "Project Showcases",
    description:
      "Show what you've built. Get feedback, inspire others, and celebrate achievements.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Zap,
    title: "Hands-on Learning",
    description:
      "Learn by doing. Workshops, hackathons, and collaborative projects to level up your skills.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Shield,
    title: "Safe Space",
    description:
      "No gatekeeping. Whether you're a beginner or expert, everyone's welcome to learn and share.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Palette,
    title: "Beyond Code",
    description:
      "Tech meets lifestyle. Design, productivity, career growth—explore all facets of geeky zindagi.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-white/5 hover:border-purple-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/5">
        <CardContent className="p-6">
          <div
            className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <feature.icon className={`w-6 h-6 ${feature.color}`} />
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
            {feature.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {feature.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Features() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A Space Built for{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Geeks
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to explore, learn, build, and grow—together with a
            community that gets it.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
