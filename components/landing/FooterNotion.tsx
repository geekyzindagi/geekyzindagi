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

export function FooterNotion() {
  return (
    <footer className="bg-[#FAFAFA] border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="text-lg font-bold text-gray-900 mb-3">
                GeekyZindagi
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Learn. Build. Create. Repeat.
              </p>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(links).map(([key, items]) => (
              <div key={key}>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 capitalize">
                  {key}
                </h4>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Made with ❤️ in India
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} GeekyZindagi. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
