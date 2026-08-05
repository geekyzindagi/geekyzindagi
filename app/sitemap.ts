import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.geekyzindagi.com";

    const routes = [
        "",
        "/ideas",
        "/geek-explorer",
        "/progress",
        "/events",
        "/mentorship",
        "/projects",
        "/blog",
        "/blog/ai-memory-context-issues",
        "/blog/frameworks-strategies-to-build",
        "/blog/eval-validity-checks",
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));
}
