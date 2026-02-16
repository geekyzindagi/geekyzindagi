import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.geekyzindagi.com";

    const routes = [
        "",
        "/ideas",
        "/progress",
        "/events",
        "/mentorship",
        "/projects",
        "/blog",
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));
}
