"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
// import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";

interface NavbarAliveProps {
  session: any | null;
}

const navLinks = [
  { name: "Journey", href: "#story" },
  { name: "Explore", href: "#domains" },
  { name: "About", href: "#features" },
];

export function NavbarAlive({ session }: NavbarAliveProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="relative mt-4 px-6 rounded-full transition-all duration-300"
            animate={{
              backgroundColor: isScrolled
                ? "rgba(0,0,0,0.8)"
                : "transparent",
              backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
              borderWidth: isScrolled ? 1 : 0,
              borderColor: isScrolled
                ? "rgba(255,255,255,0.1)"
                : "transparent",
            }}
          >
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Logo />

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="relative px-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors group"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white/5"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Auth buttons */}
              <div className="hidden md:flex items-center gap-3">
                {session ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/dashboard"
                      className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm text-muted-foreground hover:text-white transition-colors"
                    >
                      Sign in
                    </Link>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/ideas"
                        className="relative px-5 py-2 rounded-full bg-white text-black text-sm font-medium overflow-hidden group"
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 group-hover:text-white transition-colors">
                          Get Started
                        </span>
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <div className="container mx-auto px-6 pt-24">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-2xl font-medium hover:text-purple-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <Link
                    href="/ideas"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-4 rounded-full bg-white text-black text-center font-medium"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
