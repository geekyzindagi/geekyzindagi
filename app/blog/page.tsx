import Link from "next/link";
import { NavbarNotion, FooterNotion } from "@/components/landing";

import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Navigating AI Memory & Context Window Issues",
    description: "Deep dive into the challenges of managing context windows in production AI applications and how to overcome them.",
    slug: "ai-memory-context-issues",
    date: "Feb 8, 2026",
    readTime: "8 min read",
    tags: ["AI", "Architecture", "Memory"],
  },
  {
    title: "Frameworks & Strategies to Build Scaleable AI Apps",
    description: "A comprehensive guide to the best frameworks and architectural strategies for building agentic AI systems today.",
    slug: "frameworks-strategies-to-build",
    date: "Feb 7, 2026",
    readTime: "10 min read",
    tags: ["Development", "AI Frameworks", "Strategy"],
  },
];

export default async function BlogPage() {


  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <NavbarNotion />

      <main className="container mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Library
          </h1>
          <p className="text-xl text-gray-600">
            Insights, strategies, and deep dives into the world of AI building and geeky living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
            >
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-gray-900 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <FooterNotion />
    </div>
  );
}
