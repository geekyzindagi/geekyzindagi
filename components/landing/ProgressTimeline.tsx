"use client";

import { motion } from "framer-motion";
import {
    Rocket,
    Layers,
    Users,
    Globe,
    ShieldCheck,
    GitCommit,
    ArrowUpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stages = [
    {
        id: 5,
        title: "Reliability & Scale",
        date: "Current Focus",
        description: "Optimized CI/CD workflows for seamless deployments and hardened the Wizard module for a robust user onboarding experience.",
        icon: ShieldCheck,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        commits: ["87f6c95", "2c9d488", "406f692"],
        status: "active"
    },
    {
        id: 4,
        title: "Identity & Expansion",
        date: "Feb 2026",
        description: "Expanded into new domains like Neuroscience and Startups. Revitalized the brand identity with a new logo and integrated live GitHub metrics.",
        icon: Globe,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        commits: ["d2a4531", "af11bc9", "7b279a1", "e660542"],
        status: "completed"
    },
    {
        id: 3,
        title: "Community Empowerment",
        date: "Jan 2026",
        description: "Enabled real-time community request tracking and administrative insights, ensuring user voices are heard and acted upon.",
        icon: Users,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        commits: ["547f2a3", "acef7d9"],
        status: "completed"
    },
    {
        id: 2,
        title: "The Builder's Pipeline",
        date: "Dec 2025",
        description: "Launched the 'Explorer-to-Builder' pipeline, introducing dedicated modules for Blogs, Projects, Events, and Mentorship to foster growth.",
        icon: Layers,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        commits: ["16670b3"],
        status: "completed"
    },
    {
        id: 1,
        title: "Inception & Foundation",
        date: "Nov 2025",
        description: "Laid the groundwork with Next.js architecture, establishing the core repository structure and design system integration.",
        icon: Rocket,
        color: "text-rose-500",
        bgColor: "bg-rose-500/10",
        commits: ["6f48c26", "86658ed"],
        status: "completed"
    }
];

export function ProgressTimeline() {
    return (
        <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 space-y-12 max-w-3xl mx-auto">
            {stages.map((stage, index) => (
                <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative pl-8 md:pl-12"
                >
                    {/* Timeline Dot */}
                    <div className={cn(
                        "absolute -left-[9px] top-6 h-4 w-4 rounded-full border-2 border-[#FFFCF8]",
                        stage.status === "active" ? "bg-indigo-600 animate-pulse" : "bg-gray-400"
                    )} />

                    <Card className={cn(
                        "overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-indigo-200 bg-white/50 backdrop-blur-sm",
                        stage.status === "active" && "border-indigo-500/50 shadow-lg shadow-indigo-500/5"
                    )}>
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2.5 rounded-xl shadow-sm", stage.bgColor)}>
                                        <stage.icon className={cn("h-5 w-5", stage.color)} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-bold text-gray-900">
                                            {stage.title}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <span className="font-semibold text-gray-500">{stage.date}</span>
                                            {stage.status === "active" && (
                                                <Badge variant="default" className="bg-indigo-600 hover:bg-indigo-600 h-5 text-[10px] px-2 font-black uppercase tracking-wider">
                                                    Active Phase
                                                </Badge>
                                            )}
                                        </CardDescription>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-base text-gray-600 leading-relaxed font-medium">
                                {stage.description}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {stage.commits.map((commit) => (
                                    <Badge key={commit} variant="secondary" className="font-mono text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 border-none px-2 py-1 flex items-center gap-1.5">
                                        <GitCommit className="h-3 w-3" />
                                        {commit}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}

            <div className="relative pl-8 md:pl-12 pt-4">
                <div className="absolute -left-[5px] top-5 h-2.5 w-2.5 rounded-full bg-gray-300" />
                <div className="flex items-center gap-2 text-gray-400">
                    <ArrowUpCircle className="h-5 w-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">Inception</span>
                </div>
            </div>
        </div>
    );
}
