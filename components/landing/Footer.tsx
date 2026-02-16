"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Mail, Github, Youtube, Instagram } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const footerLinks = {
  community: [
    { label: "About Us", href: "#story" },
    { label: "Features", href: "#features" },
    { label: "Community", href: "#community" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Events", href: "/events" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/geekyzindagi", label: "Twitter" },
  { icon: Github, href: "https://github.com/geekyzindagi", label: "GitHub" },
  { icon: Youtube, href: "https://youtube.com/@geekyzindagi", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/geekyzindagi", label: "Instagram" },
  { icon: Mail, href: "mailto:gkudte@geekyzindagi.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-purple-950/10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo className="mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              A tribe of curious minds exploring life through learning, building,
              and mentoring. Where geeks become family.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-purple-400">
              Community
            </h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-purple-400">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-purple-400">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} geekyZindagi. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with 💜 by geeks, for geeks
          </p>
        </div>
      </div>
    </footer>
  );
}
