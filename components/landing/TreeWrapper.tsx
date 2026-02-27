"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface TreeWrapperProps {
    children: React.ReactNode;
}

export function TreeWrapper({ children }: TreeWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div ref={containerRef} className="relative w-full bg-[#FFFCF8] overflow-hidden">
            {/* Organic Center Trunk */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 z-0 hidden md:block opacity-20">
                <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 40 1000">
                    <defs>
                        <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#94a3b8" />
                            <stop offset="50%" stopColor="#64748b" />
                            <stop offset="100%" stopColor="#334155" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M 20 0 Q 22 100 18 200 Q 25 300 20 400 Q 15 500 22 600 Q 25 700 20 800 Q 18 900 20 1000"
                        stroke="url(#trunkGradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        style={{
                            pathLength: scrollYProgress,
                            strokeWidth: useTransform(scrollYProgress, [0, 1], [2, 6])
                        }}
                    />
                    {/* Subtle Bark Detail */}
                    <motion.path
                        d="M 18 50 L 22 60 M 22 150 L 18 160 M 19 250 L 23 260"
                        stroke="#cbd5e1"
                        strokeWidth="1"
                        opacity="0.5"
                    />
                </svg>
            </div>

            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}
