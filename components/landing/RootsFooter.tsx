"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Github, Youtube, Instagram, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const links = {
    explore: [
        { name: "Journey", href: "#story" },
        { name: "Domains", href: "#domains" },
        { name: "Features", href: "#features" },
    ],
    resources: [
        { name: "Blog", href: "/blog" },
        { name: "Projects", href: "/projects" },
        { name: "Progress", href: "/progress" },
    ],
    community: [
        { name: "Events", href: "/events" },
        { name: "Mentorship", href: "/mentorship" },
    ],
    forms: [
        { name: "Geek Explorer", href: "/geek-explorer" },
    ],
};

const socials = [
    { icon: Twitter, href: "https://twitter.com/geekyzindagi", label: "Twitter" },
    { icon: Github, href: "https://github.com/geekyzindagi", label: "GitHub" },
    { icon: Youtube, href: "https://youtube.com/@geekyzindagi", label: "YouTube" },
    { icon: Instagram, href: "https://instagram.com/geekyzindagi", label: "Instagram" },
    { icon: Mail, href: "mailto:gkudte@geekyzindagi.com", label: "Email" },
];

export function RootsFooter() {
    return (
        <footer className="relative bg-[#F3F0E9] border-t border-gray-200 pt-32 pb-12 overflow-hidden">
            {/* Organic Roots Visualizer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 opacity-30 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="100%" stopColor="#1e293b" />
                        </linearGradient>
                    </defs>

                    {/* Main central root */}
                    <motion.path
                        d="M 500 0 Q 510 80 480 180 T 520 300"
                        stroke="url(#rootGradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.8 }}
                    />

                    {/* Side roots */}
                    <motion.path
                        d="M 500 0 Q 500 50 350 100 T 150 250"
                        stroke="url(#rootGradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.2 }}
                    />
                    <motion.path
                        d="M 500 0 Q 490 60 650 120 T 850 280"
                        stroke="url(#rootGradient)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2.2, delay: 0.4 }}
                    />

                    {/* Root hairs */}
                    <motion.path d="M 150 250 L 120 280" stroke="#94a3b8" strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.2 }} />
                    <motion.path d="M 520 300 L 530 320" stroke="#94a3b8" strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.8 }} />
                    <motion.path d="M 850 280 L 880 300" stroke="#94a3b8" strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.4 }} />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                        {/* Brand */}
                        <div className="col-span-2 md:col-span-1">
                            <Logo className="mb-3" />
                            <p className="text-sm font-medium text-gray-500 mb-4 tracking-tight">
                                Roots of implementation.
                            </p>
                            <div className="flex items-center gap-3">
                                {socials.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all hover:shadow-sm"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-3.5 h-3.5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        {Object.entries(links).map(([key, items]) => (
                            <div key={key}>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                                    {key}
                                </h4>
                                <ul className="space-y-2">
                                    {items.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200/60">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            Made with intention <span className="opacity-50">/</span> geekyZindagi
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                            © {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
