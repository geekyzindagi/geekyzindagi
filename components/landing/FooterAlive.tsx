"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Twitter, Heart, Github, Youtube, Instagram, Mail } from "lucide-react";
import { useRef } from "react";
import { Logo } from "@/components/ui/logo";

const links = {
  explore: [
    { name: "Journey", href: "#story" },
    { name: "Domains", href: "#domains" },
    { name: "Features", href: "#features" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
  ],
  community: [
    { name: "Events", href: "/events" },
    { name: "Mentorship", href: "/mentorship" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://twitter.com/geekyzindagi", label: "Twitter" },
  { icon: Github, href: "https://github.com/geekyzindagi", label: "GitHub" },
  { icon: Youtube, href: "https://youtube.com/@geekyzindagi", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/geekyzindagi", label: "Instagram" },
  { icon: Mail, href: "mailto:gkudte@geekyzindagi.com", label: "Email" },
];

export function FooterAlive() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <footer ref={ref} className="border-t border-white/5 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-purple-950/10 to-transparent pointer-events-none"
        style={{ opacity }}
      />

      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-6 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Logo className="mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Learn. Build. Create value.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-purple-500/30 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(links).map(([key, items], groupIndex) => (
              <div key={key}>
                <h4 className="text-sm font-medium mb-4 capitalize">{key}</h4>
                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: groupIndex * 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-white transition-colors inline-block"
                      >
                        <motion.span
                          whileHover={{ x: 5 }}
                          className="inline-block"
                        >
                          {item.name}
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              </motion.span>
              <span>in India</span>
            </div>

            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} geekyZindagi
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
