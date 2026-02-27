"use client";

import Link from "next/link";
import { StickyNote, KanbanSquare, CalendarDays, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const workspaceItems = [
    {
        title: "Notes",
        description: "Capture ideas, snippets, and quick thoughts",
        icon: StickyNote,
        href: "/workspace/notes",
        gradient: "from-amber-500/20 to-orange-500/20",
        iconColor: "text-amber-500",
        count: "Your personal notepad",
    },
    {
        title: "Tasks",
        description: "Kanban board to track your work and progress",
        icon: KanbanSquare,
        href: "/workspace/tasks",
        gradient: "from-blue-500/20 to-cyan-500/20",
        iconColor: "text-blue-500",
        count: "Drag & drop board",
    },
    {
        title: "Calendar",
        description: "Schedule events, deadlines, and reminders",
        icon: CalendarDays,
        href: "/workspace/calendar",
        gradient: "from-emerald-500/20 to-teal-500/20",
        iconColor: "text-emerald-500",
        count: "Month view",
    },
];

export default function WorkspacePage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold tracking-tight">Workspace</h1>
                </div>
                <p className="text-muted-foreground">
                    Your personal productivity hub — notes, tasks, and calendar all in one place.
                </p>
            </div>

            {/* Tool Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {workspaceItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                            {/* Gradient background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />

                            <CardHeader className="relative">
                                <div className="flex items-center justify-between">
                                    <div className="p-2.5 rounded-xl bg-muted group-hover:bg-background/80 transition-colors">
                                        <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
                                </div>
                                <CardTitle className="text-xl mt-3">{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="relative">
                                <span className="text-xs text-muted-foreground/60 bg-muted/50 px-2.5 py-1 rounded-full">
                                    {item.count}
                                </span>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Quick Tips */}
            <Card className="border-dashed bg-muted/20">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Pro Tip</p>
                            <p className="text-sm text-muted-foreground">
                                Use <strong>Notes</strong> for quick captures, <strong>Tasks</strong> to track progress with the
                                Kanban board, and the <strong>Calendar</strong> to never miss a deadline. All data is saved to
                                your account.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
