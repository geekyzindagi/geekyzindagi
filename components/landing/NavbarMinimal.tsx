"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";

interface NavbarMinimalProps {
  session: any | null;
}

export function NavbarMinimal({ session }: NavbarMinimalProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#story"
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Journey
            </Link>
            <Link
              href="#domains"
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Explore
            </Link>
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              About
            </Link>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-4">
            {session ? (
              <Link
                href="/dashboard"
                className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden md:block text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
