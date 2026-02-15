"use client";

import { useState } from "react";
import {
    BarChart3,
    Eye,
    Users,
    MousePointerClick,
    Globe,
    TrendingUp,
    ExternalLink,
    Activity,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const analyticsLinks = [
    {
        name: "Google Tag Manager",
        url: "https://tagmanager.google.com/#/container/accounts/6283157802/containers/218393932/workspaces",
        description: "Manage tags, triggers, and variables",
        icon: BarChart3,
        color: "bg-blue-500/10 text-blue-600",
    },
    {
        name: "Google Analytics",
        url: "https://analytics.google.com",
        description: "Traffic, sessions, and user behavior",
        icon: TrendingUp,
        color: "bg-orange-500/10 text-orange-600",
    },
    {
        name: "Microsoft Clarity",
        url: "https://clarity.microsoft.com/projects/view/vhi76lwel3/dashboard",
        description: "Heatmaps, session recordings, and insights",
        icon: Eye,
        color: "bg-purple-500/10 text-purple-600",
    },
];

const metricCards = [
    {
        title: "Page Views",
        description: "Total pageviews tracked by GTM",
        icon: Eye,
        source: "Google Analytics",
        color: "text-blue-600",
    },
    {
        title: "Active Users",
        description: "Users currently on the site",
        icon: Users,
        source: "Google Analytics",
        color: "text-green-600",
    },
    {
        title: "Click Rate",
        description: "Interaction rate via Clarity",
        icon: MousePointerClick,
        source: "Microsoft Clarity",
        color: "text-purple-600",
    },
    {
        title: "Top Pages",
        description: "Most visited pages",
        icon: Globe,
        source: "Google Analytics",
        color: "text-orange-600",
    },
];

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = useState<"overview" | "clarity" | "gtm">(
        "overview"
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Activity className="h-6 w-6 text-primary" />
                        Analytics Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Track website performance, user behavior, and engagement metrics
                    </p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit">
                {[
                    { key: "overview" as const, label: "Overview" },
                    { key: "clarity" as const, label: "Clarity Heatmaps" },
                    { key: "gtm" as const, label: "Tag Manager" },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.key
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === "overview" && (
                <>
                    {/* Quick Access Links */}
                    <div className="grid gap-4 md:grid-cols-3">
                        {analyticsLinks.map((link) => (
                            <Card
                                key={link.name}
                                className="hover:shadow-md transition-shadow"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className={`p-2 rounded-lg ${link.color}`}>
                                            <link.icon className="h-5 w-5" />
                                        </div>
                                        <Button variant="ghost" size="sm" asChild>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    </div>
                                    <CardTitle className="text-base">{link.name}</CardTitle>
                                    <CardDescription>{link.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    <Separator />

                    {/* Metrics Overview */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Metrics to Track</h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {metricCards.map((metric) => (
                                <Card key={metric.title}>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2">
                                            <metric.icon
                                                className={`h-4 w-4 ${metric.color}`}
                                            />
                                            <CardTitle className="text-sm font-medium">
                                                {metric.title}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold text-muted-foreground/50">
                                            —
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Source: {metric.source}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                            💡 Metrics will populate after GTM and Clarity collect data (usually
                            within 24–48 hours of deployment).
                        </p>
                    </div>

                    <Separator />

                    {/* Tracking Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Tracking Status</CardTitle>
                            <CardDescription>
                                Active tracking scripts on your website
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                        <div>
                                            <p className="text-sm font-medium">
                                                Google Tag Manager
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                GTM-WV7F65QZ
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-green-600">
                                        Active
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                        <div>
                                            <p className="text-sm font-medium">Microsoft Clarity</p>
                                            <p className="text-xs text-muted-foreground">
                                                vhi76lwel3
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-green-600">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}

            {activeTab === "clarity" && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-purple-600" />
                            Microsoft Clarity Dashboard
                        </CardTitle>
                        <CardDescription>
                            Heatmaps, session recordings, and user behavior insights
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video rounded-lg overflow-hidden border bg-muted/30">
                            <iframe
                                src="https://clarity.microsoft.com/projects/view/vhi76lwel3/dashboard"
                                className="w-full h-full"
                                title="Microsoft Clarity Dashboard"
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button variant="outline" asChild>
                                <a
                                    href="https://clarity.microsoft.com/projects/view/vhi76lwel3/dashboard"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    Open in new tab
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeTab === "gtm" && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            Google Tag Manager
                        </CardTitle>
                        <CardDescription>
                            Manage tags, triggers, and variables for your tracking setup
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video rounded-lg overflow-hidden border bg-muted/30">
                            <iframe
                                src="https://tagmanager.google.com"
                                className="w-full h-full"
                                title="Google Tag Manager"
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button variant="outline" asChild>
                                <a
                                    href="https://tagmanager.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    Open in new tab
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
