"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTANotion() {
  return (
    <section className="py-24 bg-[#FFFCF8]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-5xl mb-6 block">🚀</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join a community of curious minds exploring life through learning,
            building, and creating value together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/ideas"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Share Your Idea 💡
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Already a member? Login
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
