"use client";

import { NavbarNotion, FooterNotion } from "@/components/landing";
import { motion } from "framer-motion";
import { 
  Users, 
  Code2, 
  Palette, 
  Server, 
  Video, 
  MessageSquare, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const opportunities = [
  {
    title: "UI/UX Design",
    description: "Help us refine the GeekyZindagi user experience and visual language.",
    icon: Palette,
    color: "text-pink-500",
    bg: "bg-pink-50"
  },
  {
    title: "Frontend Development",
    description: "Build beautiful, performant interfaces using Next.js and Tailwind.",
    icon: Code2,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    title: "Backend & Infra",
    description: "Scale our database architecture and integrate advanced AI services.",
    icon: Server,
    color: "text-green-500",
    bg: "bg-green-50"
  }
];

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <NavbarNotion session={null} />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Community Contributors
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mentorship & Contribution
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We are currently looking for passionate contributors to help build the foundation of this ecosystem.
            </p>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {opportunities.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-3xl p-8 transition-shadow hover:shadow-xl"
              >
                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Connection Modes */}
          <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden mb-16">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">How we connect</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Online Syncs</h4>
                      <p className="text-sm text-gray-400">Regular 1-on-1 video calls to discuss progress and solve blockers.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Chat Support</h4>
                      <p className="text-sm text-gray-400">Direct access to the core team for quick questions and feedback.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-bold mb-4">Want to mentor or contribute?</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  If you have skills in UI/UX, or Fullstack development and want to guide others while building real-world projects, we'd love to have you.
                </p>
                <Link href="/ideas">
                  <Button className="w-full bg-white text-black hover:bg-gray-100 group">
                    Get in Touch
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterNotion />
    </div>
  );
}
