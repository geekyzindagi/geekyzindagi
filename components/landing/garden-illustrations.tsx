"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function useMounted() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
}

export function CanopyIllustration() {
    const mounted = useMounted();
    return (
        <div className="relative w-full h-full flex items-center justify-center opacity-40">
            <svg viewBox="0 0 400 300" className="w-full h-full max-w-lg">
                <motion.path
                    d="M 200 150 Q 250 50 350 150 Q 250 250 200 150 Z"
                    fill="#d1fae5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <motion.path
                    d="M 200 150 Q 150 50 50 150 Q 150 250 200 150 Z"
                    fill="#a7f3d0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.path
                    d="M 200 150 Q 200 0 300 100 Q 200 200 200 150 Z"
                    fill="#ecfdf5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                />
                {/* Abstract Leaves */}
                {mounted && [...Array(10)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={150 + Math.random() * 100}
                        cy={100 + Math.random() * 100}
                        r={5 + Math.random() * 10}
                        fill="#10b981"
                        className="opacity-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ delay: 1 + i * 0.1 }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function SeedIllustration() {
    const mounted = useMounted();
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-32 h-32">
                <defs>
                    <radialGradient id="seedGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#d1d5db" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Glow */}
                <motion.circle cx="100" cy="150" r="40" fill="url(#seedGlow)" animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />

                {/* Soil texture */}
                {mounted && [...Array(12)].map((_, i) => (
                    <circle key={i} cx={70 + Math.random() * 60} cy={140 + Math.random() * 20} r="1.5" fill="#9ca3af" opacity="0.4" />
                ))}

                <motion.ellipse
                    cx="100" cy="150"
                    rx="30" ry="15"
                    fill="#94a3b8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                />
                {/* Sprout with gradient */}
                <linearGradient id="sproutGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <motion.path
                    d="M 100 140 Q 100 80 120 40"
                    stroke="url(#sproutGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.path
                    d="M 100 120 Q 80 100 70 80"
                    stroke="#10b981"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                />
            </svg>
        </div>
    );
}

export function BloomIllustration() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
                <defs>
                    <radialGradient id="bloomCenter" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </radialGradient>
                </defs>
                {/* Layered Petals */}
                {[0, 90, 180, 270].map((rot) => (
                    <motion.path
                        key={rot}
                        d="M 100 100 Q 150 50 200 100 Q 150 150 100 100 Z"
                        fill="#e0e7ff"
                        className="opacity-60"
                        initial={{ rotate: rot, scale: 0 }}
                        animate={{ rotate: rot + 45, scale: 1 }}
                        transition={{ duration: 1 }}
                    />
                ))}
                <motion.circle
                    cx="100" cy="100" r="12"
                    fill="url(#bloomCenter)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                />
                {/* Pollen Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={100 + Math.cos(i) * 30}
                        cy={100 + Math.sin(i) * 30}
                        r="2"
                        fill="#818cf8"
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function FruitIllustration() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-40 h-40">
                <defs>
                    <radialGradient id="fruitGlow" cx="40%" cy="40%" r="50%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#d97706" />
                    </radialGradient>
                </defs>
                <motion.circle
                    cx="100" cy="100" r="45"
                    fill="url(#fruitGlow)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                />
                {/* Glossy Highlight */}
                <motion.ellipse
                    cx="85" cy="85" rx="15" ry="10"
                    fill="#fff"
                    rotate="-45"
                    className="opacity-30"
                />
                <motion.path
                    d="M 100 55 Q 110 30 100 10"
                    stroke="#92400e"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                />
                <motion.path
                    d="M 100 55 Q 140 40 130 70 Z"
                    fill="#059669"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                />
            </svg>
        </div>
    );
}

export function ExplorerIllustration() {
    const mounted = useMounted();
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                    <radialGradient id="skyGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="charGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#374151" />
                        <stop offset="100%" stopColor="#1f2937" />
                    </linearGradient>
                </defs>

                {/* Atmospheric Glow */}
                <motion.circle
                    cx="200" cy="150" r="120"
                    fill="url(#skyGlow)"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Distant Moon */}
                <motion.circle
                    cx="300" cy="80" r="25"
                    fill="#fff"
                    className="opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                />

                {/* Character - Artistic Interpretation */}
                <g transform="translate(100, 50)">
                    {/* Body */}
                    <motion.path
                        d="M 50 150 Q 80 140 100 150 L 110 230 Q 80 240 50 230 Z"
                        fill="url(#charGradient)"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                    />
                    {/* Head */}
                    <motion.ellipse
                        cx="80" cy="130" rx="15" ry="18"
                        fill="#111827"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                    {/* Arm holding telescope */}
                    <motion.path
                        d="M 90 150 Q 110 140 130 145"
                        stroke="#1f2937"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                    />
                    {/* Telescope */}
                    <motion.path
                        d="M 125 145 L 200 120"
                        stroke="#9ca3af"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                    />
                    {/* Lens Glow */}
                    <motion.circle
                        cx="200" cy="120" r="10"
                        fill="#818cf8"
                        className="opacity-40"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </g>

                {/* Floating Sparks of Curiosity */}
                {mounted && [...Array(8)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={150 + Math.random() * 200}
                        cy={50 + Math.random() * 150}
                        r={1 + Math.random() * 3}
                        fill="#f59e0b"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [-10, -30]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.4
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function GardenIllustration() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                    <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>
                    <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f3f4f6" />
                        <stop offset="100%" stopColor="#e5e7eb" />
                    </linearGradient>
                </defs>

                {/* Soft Ground Mounds */}
                <motion.path
                    d="M 0 280 Q 100 240 200 280 T 400 280 L 400 300 L 0 300 Z"
                    fill="url(#groundGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />

                {/* Artistic Foliage */}
                {[...Array(6)].map((_, i) => (
                    <motion.g
                        key={i}
                        initial={{ scale: 0, rotate: -20 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.8 }}
                        style={{ originX: "200px", originY: "280px" }}
                    >
                        <motion.path
                            d={`M ${100 + i * 40} 280 Q ${120 + i * 40} ${150 + (i % 2) * 30} ${140 + i * 40} 280`}
                            fill="url(#leafGradient)"
                            className="opacity-40"
                            animate={{ rotate: [0, 2, 0] }}
                            transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                        />
                        {/* Small Flowers */}
                        {i % 2 === 0 && (
                            <motion.circle
                                cx={120 + i * 40} cy={170} r="6"
                                fill="#ec4899"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1 + i * 0.1 }}
                            />
                        )}
                    </motion.g>
                ))}

                {/* Atmospheric Wind lines */}
                <motion.path
                    d="M 50 100 Q 150 80 250 120"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.text
                    x="180" y="180" className="text-4xl"
                    animate={{ x: [180, 220, 180], y: [180, 160, 180], rotate: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                >
                    🦋
                </motion.text>
            </svg>
        </div>
    );
}
