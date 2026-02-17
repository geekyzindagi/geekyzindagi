"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Features", href: "#features" },
  { label: "Community", href: "#community" },
  { label: "Geek Explorer", href: "/geek-explorer" },
];

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        style={{ backgroundColor }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? "border-b border-white/5" : ""
          }`}
      >
        <motion.div style={{ backdropFilter: backdropBlur }} className="absolute inset-0" />
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    {user.name || user.email}
                  </span>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    Sign in
                  </Link>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6"
                  >
                    <Link href="/ideas">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={`fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-white/5 md:hidden ${isOpen ? "block" : "hidden"
          }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg text-muted-foreground hover:text-purple-400 transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10">
            {user ? (
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
              >
                <Link href="/ideas">Get Started</Link>
              </Button>
            )}
          </div>
        </nav>
      </motion.div>
    </>
  );
}
