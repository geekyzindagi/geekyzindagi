import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lightbulb, Hammer, Star, ArrowRight } from "lucide-react";
import { CommunityStats } from "@/components/landing/CommunityStats";
import { IdeaForm } from "@/components/landing/IdeaForm";

export const metadata: Metadata = {
  title: "Share Your Idea | Geeky Zindagi",
  description:
    "Share your project idea with the Geeky Zindagi community. Become an Explorer and connect with Builders and Elders who can help bring your vision to life.",
};

const progressionSteps = [
  {
    tier: "Explorer",
    icon: Lightbulb,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    description: "Share your idea",
  },
  {
    tier: "Builder",
    icon: Hammer,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    description: "Join & build projects",
  },
  {
    tier: "Elder",
    icon: Star,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    description: "Mentor & lead",
  },
];

export default function IdeasPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              💡 Share Your Vision
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Got an Idea? Let&apos;s Hear It!
            </h1>
            <p className="text-xl text-gray-600">
              Share your project idea with the tribe. Whether it&apos;s a side project,
              startup concept, or learning experiment—we want to know what you&apos;re
              building.
            </p>
          </div>

          {/* Community Stats */}
          <div className="max-w-3xl mx-auto mb-16">
            <CommunityStats />
          </div>

          {/* Progression Path */}
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
              Your Journey in the Community
            </h2>
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {progressionSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.tier} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${step.bgColor} ${step.color} flex items-center justify-center mb-2`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`font-semibold ${step.color} text-sm md:text-base`}>
                        {step.tier}
                      </span>
                      <span className="text-xs text-gray-500 text-center max-w-[80px]">
                        {step.description}
                      </span>
                    </div>
                    {index < progressionSteps.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-gray-300 mx-2 md:mx-4 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Idea Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Submit Your Idea
              </h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below to become an Explorer. We review every
                submission and reach out to promising ideas.
              </p>
              <IdeaForm />
            </div>
          </div>

          {/* Trust indicators */}
          <div className="max-w-2xl mx-auto mt-8 text-center">
            <p className="text-sm text-gray-500">
              🔒 Your idea is kept private • Only shared with our review team •
              We&apos;ll never spam you
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Geeky Zindagi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
