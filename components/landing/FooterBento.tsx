"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Twitter,
  Youtube,
  Github,
  Instagram,
  Heart,
  Sparkles,
  Mail,
  MapPin,
} from "lucide-react";

const footerLinks = {
  product: {
    title: "Explore",
    links: [
      { name: "Domains", href: "#domains" },
      { name: "Journey", href: "#story" },
      { name: "Community", href: "#community" },
      { name: "Features", href: "#features" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Tutorials", href: "/tutorials" },
      { name: "Projects", href: "/projects" },
    ],
  },
  community: {
    title: "Community",
    links: [
      { name: "Events", href: "/events" },
      { name: "Mentorship", href: "/mentorship" },
      { name: "Contribute", href: "/contribute" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Cookies", href: "/cookies" },
    ],
  },
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/geekyzindagi", label: "Twitter" },
  { icon: Github, href: "https://github.com/geekyzindagi", label: "GitHub" },
  { icon: Youtube, href: "https://youtube.com/@geekyzindagi", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/geekyzindagi", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@geekyzindagi.com", label: "Email" },
];

export function FooterBento() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 mb-16">
          {/* Brand card - large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6 lg:col-span-4 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">GeekyZindagi</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A community of curious minds exploring life through learning,
              building, and creating value together.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-12 md:col-span-6 lg:col-span-4 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent"
          >
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold">Stay curious</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Weekly insights on tech, life, and everything in between.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>

          {/* Quick links grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-12 lg:col-span-4 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent"
          >
            <div className="grid grid-cols-2 gap-6">
              {Object.values(footerLinks).map((section) => (
                <div key={section.title}>
                  <h4 className="font-semibold mb-3 text-sm">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </motion.span>
            <span>in India</span>
            <MapPin className="w-4 h-4 ml-1" />
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} GeekyZindagi</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">All rights reserved</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <span className="text-white font-medium">Next.js</span>
            <span>&</span>
            <span className="text-white font-medium">❤️</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
