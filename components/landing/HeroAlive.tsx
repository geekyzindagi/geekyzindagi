"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Floating particles that follow a smooth path
function FloatingParticle({ delay = 0, duration = 20, size = 4 }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-sm"
      style={{ width: size, height: size }}
      initial={{ 
        x: Math.random() * 100 + "%", 
        y: "110%",
        opacity: 0 
      }}
      animate={{
        y: "-10%",
        opacity: [0, 1, 1, 0],
        x: [
          Math.random() * 100 + "%",
          Math.random() * 100 + "%",
          Math.random() * 100 + "%",
        ],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
      }}
    />
  );
}

// Organic blob that breathes
function BreathingBlob({ className = "", color = "purple" }: { className?: string; color?: string }) {
  const colors = {
    purple: "from-purple-500/20 to-violet-500/10",
    pink: "from-pink-500/20 to-rose-500/10",
    blue: "from-blue-500/20 to-cyan-500/10",
  };
  
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br ${colors[color as keyof typeof colors]} blur-3xl ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
      }}
    />
  );
}

// Hero illustration - abstract geometric composition
function HeroIllustration() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      mouseX.set(e.clientX - rect.width / 2);
      mouseY.set(e.clientY - rect.height / 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-80 h-80 md:w-96 md:h-96"
    >
      {/* Central orb */}
      <motion.div
        className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
        animate={{
          boxShadow: [
            "0 0 60px rgba(168,85,247,0.4)",
            "0 0 100px rgba(168,85,247,0.6)",
            "0 0 60px rgba(168,85,247,0.4)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transform: "translateZ(50px)" }}
      />
      
      {/* Orbiting rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 m-auto rounded-full border border-white/10"
          style={{
            width: 180 + i * 60,
            height: 180 + i * 60,
            transform: `translateZ(${20 - i * 10}px)`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            rotate: { duration: 20 + i * 10, repeat: Infinity },
          }}
        >
          {/* Orbiting dot */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-white/80 -top-1.5 left-1/2 -ml-1.5"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity },
              opacity: { duration: 2, repeat: Infinity }
            }}
          />
        </motion.div>
      ))}

      {/* Floating icons */}
      {["🎨", "💻", "🚀", "✨", "🎵"].map((emoji, i) => (
        <motion.div
          key={emoji}
          className="absolute text-2xl"
          style={{
            top: `${20 + Math.sin(i * 1.2) * 30}%`,
            left: `${20 + Math.cos(i * 1.2) * 30}%`,
            transform: `translateZ(${30 + i * 10}px)`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function HeroAlive() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Breathing blobs */}
      <BreathingBlob className="w-96 h-96 -top-48 -left-48" color="purple" />
      <BreathingBlob className="w-80 h-80 top-1/2 -right-40" color="pink" />
      <BreathingBlob className="w-64 h-64 bottom-0 left-1/4" color="blue" />

      {/* Floating particles */}
      {mounted && [...Array(15)].map((_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 1.5} 
          duration={15 + Math.random() * 10}
          size={3 + Math.random() * 4}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 text-muted-foreground mb-8"
                whileHover={{ scale: 1.05, borderColor: "rgba(168,85,247,0.3)" }}
              >
                A community for the curious
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              <motion.span 
                className="block"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Geeky
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                style={{ backgroundSize: "200% 200%" }}
                transition={{ duration: 5, repeat: Infinity }}
                whileHover={{ scale: 1.02 }}
              >
                Zindagi
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted-foreground font-light mb-10"
            >
              Learn. Build. Create value. Repeat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/login"
                  className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors">
                    Get Started
                  </span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#story"
                  className="px-8 py-4 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-1 flex justify-center"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
        >
          <motion.div 
            className="w-1 h-2 rounded-full bg-white/40"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
