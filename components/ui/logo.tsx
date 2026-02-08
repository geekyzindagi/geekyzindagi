"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  isDashboard?: boolean;
}

export function Logo({ className, href = "/", isDashboard = false }: LogoProps) {
  return (
    <Link 
      href={href} 
      className={cn("flex items-center tracking-tighter group", className)}
    >
      <span className="text-xl font-medium text-muted-foreground/90 lowercase">
        geeky
      </span>
      <span className={cn(
        "text-xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent",
        "drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.1)] transition-all duration-300 group-hover:drop-shadow-[0_1.2px_8px_rgba(217,70,239,0.3)]"
      )}>
        Zindagi
      </span>
    </Link>
  );
}
