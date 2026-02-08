"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  CuriosityIllustration,
  LearningIllustration,
  BuildingIllustration,
  CreateValueIllustration,
  MentorIllustration,
} from "./illustrations";

const storyChapters = [
  {
    id: "curious",
    illustration: CuriosityIllustration,
    title: "It Starts with Curiosity",
    subtitle: "Chapter 1: The Spark",
    description:
      "Every geek's journey begins with a single question—'How does this work?' We don't just accept things; we poke, prod, and explore. Curiosity isn't just a trait; it's our superpower.",
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-500/5 to-orange-500/5",
  },
  {
    id: "learn",
    illustration: LearningIllustration,
    title: "We Learn Relentlessly",
    subtitle: "Chapter 2: The Deep Dive",
    description:
      "Documentation, tutorials, late-night rabbit holes—we embrace them all. Learning isn't a phase; it's a lifestyle. We share what we discover and grow together.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/5 to-cyan-500/5",
  },
  {
    id: "build",
    illustration: BuildingIllustration,
    title: "We Build & Implement",
    subtitle: "Chapter 3: The Hands-On",
    description:
      "Theory is great, but we believe in getting our hands dirty. Side projects, experiments, MVPs—every line of code, every creation is a step forward in our journey.",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/5 to-emerald-500/5",
  },
  {
    id: "create",
    illustration: CreateValueIllustration,
    title: "We Create Value",
    subtitle: "Chapter 4: The Impact",
    description:
      "Building tools that matter. Solving real problems. Creating content that helps others. We measure success not just by what we learn, but by the value we add to the world.",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/5 to-pink-500/5",
  },
  {
    id: "mentor",
    illustration: MentorIllustration,
    title: "We Mentor Along the Way",
    subtitle: "Chapter 5: The Circle",
    description:
      "The best geeks lift others up. We share knowledge, guide newcomers, and build a community where everyone grows. Your journey inspires someone else's beginning.",
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/5 to-rose-500/5",
  },
];

function StoryChapter({
  chapter,
  index,
}: {
  chapter: (typeof storyChapters)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  const Illustration = chapter.illustration;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-16`}
    >
      {/* Illustration side */}
      <div className="flex-1 flex justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br ${chapter.bgGradient} border border-white/10 flex items-center justify-center overflow-hidden`}
        >
          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${chapter.gradient} opacity-20 blur-2xl`}
          />
          <Illustration className="w-full h-full relative z-10" />
        </motion.div>
      </div>

      {/* Content side */}
      <div className="flex-1 text-center lg:text-left">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`inline-block text-sm font-medium bg-gradient-to-r ${chapter.gradient} bg-clip-text text-transparent mb-2`}
        >
          {chapter.subtitle}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {chapter.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          {chapter.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function StorySection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="story" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-2 text-purple-400 text-sm font-medium mb-4">
            <ArrowRight className="w-4 h-4" />
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The GeekyZindagi{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Every geek has a story. Here&apos;s how we explore life—one curiosity at a
            time.
          </p>
        </motion.div>

        {/* Story chapters */}
        <div className="space-y-24 md:space-y-32">
          {storyChapters.map((chapter, index) => (
            <StoryChapter key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>

        {/* Connecting line (decorative) */}
        <div className="hidden lg:block absolute left-1/2 top-64 bottom-32 w-px bg-gradient-to-b from-purple-500/50 via-pink-500/30 to-transparent -translate-x-1/2" />
      </div>
    </section>
  );
}
