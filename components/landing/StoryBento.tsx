"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  CuriosityIllustration,
  LearningIllustration,
  BuildingIllustration,
  CreateValueIllustration,
  MentorIllustration,
} from "./illustrations";

const chapters = [
  {
    number: "01",
    title: "Be Curious",
    subtitle: "The Beginning",
    description:
      "Every journey starts with a question. We embrace the unknown, ask 'why' relentlessly, and find joy in discovering something new every day.",
    color: "from-purple-500 to-violet-600",
    illustration: CuriosityIllustration,
    stats: [
      { value: "∞", label: "Questions asked" },
      { value: "Daily", label: "New discoveries" },
    ],
  },
  {
    number: "02",
    title: "Learn & Implement",
    subtitle: "The Growth",
    description:
      "Knowledge without action is just trivia. We learn by doing, fail forward, and turn every mistake into a stepping stone.",
    color: "from-blue-500 to-cyan-500",
    illustration: LearningIllustration,
    stats: [
      { value: "100+", label: "Resources" },
      { value: "Real", label: "Projects" },
    ],
  },
  {
    number: "03",
    title: "Build & Create",
    subtitle: "The Making",
    description:
      "Ideas are everywhere, but execution is everything. We ship products, write code, and create things that didn't exist before.",
    color: "from-emerald-500 to-green-500",
    illustration: BuildingIllustration,
    stats: [
      { value: "50+", label: "Projects built" },
      { value: "Open", label: "Source first" },
    ],
  },
  {
    number: "04",
    title: "Add Value",
    subtitle: "The Impact",
    description:
      "Real success is measured by the problems you solve for others. We create tools, share knowledge, and make life better for everyone.",
    color: "from-orange-500 to-amber-500",
    illustration: CreateValueIllustration,
    stats: [
      { value: "10K+", label: "Lives impacted" },
      { value: "Free", label: "Tools & resources" },
    ],
  },
  {
    number: "05",
    title: "Mentor Forward",
    subtitle: "The Legacy",
    description:
      "The final stage isn't a destination—it's a responsibility. We pay it forward, guide the next generation, and keep the cycle alive.",
    color: "from-pink-500 to-rose-500",
    illustration: MentorIllustration,
    stats: [
      { value: "1:1", label: "Mentorship" },
      { value: "Forever", label: "Learning" },
    ],
  },
];

function ChapterCard({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="relative"
    >
      <div
        className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}
      >
        {/* Content */}
        <motion.div style={{ y }} className="flex-1 w-full lg:w-auto">
          <div className="relative p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm overflow-hidden group">
            {/* Background glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${chapter.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
            />

            <div className="relative z-10">
              {/* Number badge */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${chapter.color} flex items-center justify-center text-2xl font-bold shadow-lg`}
                >
                  {chapter.number}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {chapter.subtitle}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    {chapter.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {chapter.description}
              </p>

              {/* Stats */}
              <div className="flex gap-8">
                {chapter.stats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      className={`text-2xl font-bold bg-gradient-to-r ${chapter.color} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-1 w-full lg:w-auto flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Glow behind illustration */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${chapter.color} opacity-20 blur-3xl rounded-full`}
            />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <chapter.illustration />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function StoryBento() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="story"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Progress line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 hidden lg:block">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 origin-top"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            The{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Five stages that transform curiosity into lasting impact
          </motion.p>
        </div>

        {/* Chapters */}
        <div className="space-y-24 md:space-y-32">
          {chapters.map((chapter, index) => (
            <ChapterCard key={chapter.number} chapter={chapter} index={index} />
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="inline-flex flex-col items-center p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-2">Ready to start?</h3>
            <p className="text-muted-foreground mb-6">
              Your journey begins with a single step
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-medium hover:opacity-90 transition-opacity"
            >
              Begin Your Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
