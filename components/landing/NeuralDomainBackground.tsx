"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface Node {
    id: string;
    label: string;
    emoji: string;
    x: number;
    y: number;
    color: string;
}

interface NeuralDomainBackgroundProps {
    activeDomainId?: string;
}

const DOMAINS: Node[] = [
    { id: "creative", label: "Creative", emoji: "🎨", x: 15, y: 20, color: "#f472b6" },
    { id: "tech", label: "Tech", emoji: "🤖", x: 80, y: 15, color: "#22d3ee" },
    { id: "science", label: "Science", emoji: "🧠", x: 45, y: 10, color: "#818cf8" },
    { id: "education", label: "Knowledge", emoji: "📚", x: 70, y: 80, color: "#fb923c" },
    { id: "business", label: "Startup", emoji: "🚀", x: 10, y: 75, color: "#fbbf24" },
    { id: "wellness", label: "Wellness", emoji: "🧘", color: "#a78bfa", x: 90, y: 60 },
    { id: "lifestyle", label: "Lifestyle", emoji: "🍳", color: "#fb7185", x: 25, y: 45 },
    { id: "community", label: "Community", emoji: "👥", color: "#34d399", x: 60, y: 40 },
];

// Generate random connections between nodes
const CONNECTIONS = [
    ["creative", "lifestyle"],
    ["creative", "science"],
    ["tech", "science"],
    ["tech", "community"],
    ["science", "education"],
    ["education", "business"],
    ["business", "lifestyle"],
    ["wellness", "lifestyle"],
    ["wellness", "community"],
    ["community", "tech"],
    ["community", "education"],
];

export function NeuralDomainBackground({ activeDomainId }: NeuralDomainBackgroundProps) {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Connections */}
                {CONNECTIONS.map(([fromId, toId], idx) => {
                    const from = DOMAINS.find((d) => d.id === fromId)!;
                    const to = DOMAINS.find((d) => d.id === toId)!;
                    const isActive = activeDomainId === "all" || activeDomainId === fromId || activeDomainId === toId;

                    return (
                        <motion.line
                            key={`${fromId}-${toId}`}
                            x1={`${from.x}%`}
                            y1={`${from.y}%`}
                            x2={`${to.x}%`}
                            y2={`${to.y}%`}
                            stroke={isActive ? from.color : "#e5e7eb"}
                            strokeWidth={isActive ? "0.4" : "0.1"}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: 1,
                                opacity: isActive ? 0.6 : 0.2,
                                stroke: isActive ? from.color : "#e5e7eb"
                            }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    );
                })}

                {/* Nodes */}
                {DOMAINS.map((domain) => {
                    const isActive = activeDomainId === "all" || activeDomainId === domain.id;
                    return (
                        <g key={domain.id}>
                            <motion.circle
                                cx={`${domain.x}%`}
                                cy={`${domain.y}%`}
                                r={isActive ? "1.2" : "0.8"}
                                fill={isActive ? domain.color : "#f3f4f6"}
                                stroke={isActive ? domain.color : "#e5e7eb"}
                                strokeWidth="0.2"
                                animate={{
                                    r: isActive ? [1.2, 1.5, 1.2] : 0.8,
                                    opacity: isActive ? 0.8 : 0.4,
                                }}
                                transition={{
                                    r: { repeat: Infinity, duration: 2 },
                                }}
                            />
                            {isActive && (
                                <motion.circle
                                    cx={`${domain.x}%`}
                                    cy={`${domain.y}%`}
                                    r="3"
                                    fill={domain.color}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: [0, 0.2, 0], scale: [1, 2, 2.5] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Floating Emojis near active node */}
            {DOMAINS.map((domain) => {
                const isActive = activeDomainId === "all" || activeDomainId === domain.id;
                if (!isActive) return null;

                return (
                    <motion.div
                        key={`emoji-${domain.id}`}
                        className="absolute text-xl pointer-events-none"
                        style={{ left: `${domain.x}%`, top: `${domain.y}%` }}
                        initial={{ opacity: 0, scale: 0, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: -20 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {domain.emoji}
                    </motion.div>
                );
            })}
        </div>
    );
}
