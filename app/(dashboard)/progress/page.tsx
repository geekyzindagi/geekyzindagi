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

export default function ProgressPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Platform Progress</h1>
                <p className="text-muted-foreground">
                    Tracking the evolution of the GeekyZindagi platform from inception to current state.
                </p>
            </div>

            <div className="relative border-l-2 border-muted ml-4 md:ml-6 space-y-12">
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
                            "absolute -left-[9px] top-6 h-4 w-4 rounded-full border-2 border-background",
                            stage.status === "active" ? "bg-primary animate-pulse" : "bg-muted-foreground"
                        )} />

                        <Card className={cn(
                            "overflow-hidden transition-all duration-300 hover:shadow-lg",
                            stage.status === "active" && "border-primary/50 shadow-md"
                        )}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("p-2 rounded-lg", stage.bgColor)}>
                                            <stage.icon className={cn("h-5 w-5", stage.color)} />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg md:text-xl">
                                                {stage.title}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                <span>{stage.date}</span>
                                                {stage.status === "active" && (
                                                    <Badge variant="default" className="bg-primary/80 hover:bg-primary/80 h-5 text-[10px] px-2">
                                                        In Progress
                                                    </Badge>
                                                )}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {stage.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {stage.commits.map((commit) => (
                                        <Badge key={commit} variant="secondary" className="font-mono text-xs text-muted-foreground flex items-center gap-1">
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
                    <div className="absolute -left-[5px] top-5 h-2 w-2 rounded-full bg-muted-foreground/30" />
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <ArrowUpCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Start of Journey</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
