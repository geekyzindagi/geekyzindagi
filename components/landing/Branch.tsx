"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface BranchProps {
    children: React.ReactNode;
    side?: "left" | "right";
    className?: string;
    delay?: number;
}

export function Branch({
    children,
    side = "right",
    className,
    delay = 0
}: BranchProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex w-full my-12 md:my-32",
                side === "left" ? "justify-end md:pr-[50%]" : "md:pl-[50%]",
                className
            )}
        >
            {/* Organic Curved Branch */}
            <div
                className={cn(
                    "absolute top-1/2 -translate-y-1/2 hidden md:block z-0",
                    side === "left" ? "right-0 w-32 h-24 mt-[-3rem]" : "left-0 w-32 h-24 mt-[-3rem]"
                )}
            >
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                        d={side === "left" ? "M 100 50 Q 50 50 0 100" : "M 0 50 Q 50 50 100 100"}
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-gray-300"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : {}}
                        transition={{ duration: 1, delay: delay + 0.2 }}
                    />
                    {/* Connection Point Bloom */}
                    <motion.circle
                        cx={side === "left" ? "100" : "0"}
                        cy="50"
                        r="4"
                        fill="currentColor"
                        className="text-indigo-400"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: delay + 0.1 }}
                    />

                    {/* Organic Leaves */}
                    <motion.path
                        d={side === "left" ? "M 70 65 Q 60 55 70 45" : "M 30 65 Q 40 55 30 45"}
                        fill="currentColor"
                        className="text-emerald-400/40"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: delay + 0.6 }}
                    />
                    <motion.path
                        d={side === "left" ? "M 40 85 Q 30 75 40 65" : "M 60 85 Q 70 75 60 65"}
                        fill="currentColor"
                        className="text-emerald-500/30"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: delay + 0.8 }}
                    />
                </svg>
            </div>

            <motion.div
                initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay }}
                className={cn(
                    "relative z-10 w-full md:max-w-xl",
                    side === "left" ? "md:mr-16" : "md:ml-16"
                )}
            >
                {children}
            </motion.div>
        </div>
    );
}
