"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Linkedin } from "lucide-react";

const links = {
  explore: [
    { name: "Journey", href: "#story" },
    { name: "Domains", href: "#domains" },
    { name: "Features", href: "#features" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "Newsletter", href: "/newsletter" },
  ],
  community: [
    { name: "Discord", href: "#" },
    { name: "Events", href: "/events" },
    { name: "Mentorship", href: "/mentorship" },
  ],
};

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function FooterMinimal() {
  return (
    <footer className="border-t border-white/5">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="text-xl font-bold mb-4">GeekyZindagi</div>
              <p className="text-sm text-muted-foreground">
                Learn. Build. Create value.
              </p>
            </div>

            {/* Links */}
            {Object.entries(links).map(([key, items]) => (
              <div key={key}>
                <h4 className="text-sm font-medium mb-4 capitalize">{key}</h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GeekyZindagi
            </div>

            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="text-muted-foreground hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
