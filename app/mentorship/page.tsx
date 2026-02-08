"use client";

import { NavbarNotion, FooterNotion } from "@/components/landing";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Code2, 
  Palette, 
  Server, 
  Video, 
  MessageSquare, 
  ArrowRight,
  Sparkles,
  Send,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      message: formData.get("message"),
      portfolio: formData.get("portfolio"),
    };

    try {
      const res = await fetch("/api/requests/mentorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

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

          {/* Form Section */}
          <div className="max-w-3xl mx-auto mb-20">
            {!isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm"
              >
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <Send className="w-8 h-8 text-blue-500" />
                  Join the Mission
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Full Name</label>
                      <Input name="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <Input name="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Preferred Role</label>
                      <Select name="role" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="designer">UI/UX Designer</SelectItem>
                          <SelectItem value="frontend">Frontend Developer</SelectItem>
                          <SelectItem value="backend">Backend Developer</SelectItem>
                          <SelectItem value="mobile">Mobile Developer</SelectItem>
                          <SelectItem value="other">Other Contributor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Portfolio/GitHub (Optional)</label>
                      <Input name="portfolio" placeholder="https://github.com/..." />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Why do you want to join us?</label>
                    <Textarea 
                      name="message"
                      placeholder="Tell us about your background and what you'd like to build together..." 
                      className="min-h-[150px]" 
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gray-900 text-white hover:bg-black rounded-xl text-lg font-semibold transition-all group" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit Application
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-green-900 mb-4">Application Sent!</h2>
                <p className="text-green-700 text-lg mb-8">
                  Thank you for your interest in contributing to GeekyZindagi. We&apos;ll review your profile and reach out soon!
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Send another request
                </Button>
              </motion.div>
            )}
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
                  If you have skills in UI/UX, or Fullstack development and want to guide others while building real-world projects, we&apos;d love to have you.
                </p>
                <Link href="#form">
                  <Button className="w-full bg-white text-black hover:bg-gray-100 group">
                    View Positions
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
