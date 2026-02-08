"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Hammer, Star } from "lucide-react";

interface Stats {
  explorers: number;
  builders: number;
  elders: number;
}

const tiers = [
  {
    key: "explorers",
    label: "Explorers",
    description: "Ideas shared",
    icon: Lightbulb,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    key: "builders",
    label: "Builders",
    description: "Building projects",
    icon: Hammer,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    key: "elders",
    label: "Elders",
    description: "Mentoring & shipping",
    icon: Star,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
] as const;

export function CommunityStats() {
  const [stats, setStats] = useState<Stats>({ explorers: 0, builders: 0, elders: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier, index) => {
        const Icon = tier.icon;
        const count = stats[tier.key as keyof Stats];

        return (
          <motion.div
            key={tier.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 rounded-2xl border-2 ${tier.borderColor} ${tier.bgColor} text-center`}
          >
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${tier.bgColor} ${tier.color} mb-4`}
            >
              <Icon className="w-6 h-6" />
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-1">
              {isLoading ? (
                <span className="inline-block w-12 h-10 bg-gray-200 rounded animate-pulse" />
              ) : (
                count
              )}
            </div>

            <h3 className={`text-lg font-semibold ${tier.color} mb-1`}>
              {tier.label}
            </h3>

            <p className="text-sm text-gray-600">{tier.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
