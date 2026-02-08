"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "GeekyZindagi is where I found my tribe. People who understand that debugging at 2 AM is a lifestyle, not a problem.",
    author: "Priya S.",
    role: "Full Stack Developer",
    avatar: "PS",
    color: "from-purple-500 to-pink-500",
  },
  {
    quote:
      "The community pushed me to finally launch my side project. From idea to deployment, they were there at every step.",
    author: "Rahul M.",
    role: "Indie Hacker",
    avatar: "RM",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote:
      "I went from 'what is Git?' to contributing to open source. The mentorship here is genuine and life-changing.",
    author: "Ananya K.",
    role: "CS Student",
    avatar: "AK",
    color: "from-green-500 to-emerald-500",
  },
  {
    quote:
      "It's not just about code. We discuss books, productivity, career paths—everything that makes up a geeky life.",
    author: "Vikram J.",
    role: "Tech Lead",
    avatar: "VJ",
    color: "from-orange-500 to-yellow-500",
  },
];

const stats = [
  { value: "500+", label: "Community Members" },
  { value: "50+", label: "Projects Shipped" },
  { value: "100+", label: "Mentorship Sessions" },
  { value: "∞", label: "Late Night Debates" },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-white/5 hover:border-purple-500/20 transition-all duration-300">
        <CardContent className="p-6 flex flex-col h-full">
          <Quote className="w-8 h-8 text-purple-500/30 mb-4" />
          <p className="text-muted-foreground leading-relaxed flex-grow mb-6">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-sm font-medium`}
            >
              {testimonial.avatar}
            </div>
            <div>
              <div className="font-medium text-sm">{testimonial.author}</div>
              <div className="text-muted-foreground text-xs">
                {testimonial.role}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Community() {
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-4">
            Community Voices
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet the{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Tribe
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Real stories from real geeks. Here&apos;s what our community has to say.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl border border-white/5 p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
