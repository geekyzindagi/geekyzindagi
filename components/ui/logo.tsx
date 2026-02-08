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
      className={cn("flex items-center tracking-tighter group select-none relative", className)}
    >
      <span className="text-xl font-black text-gray-900 lowercase mr-0.5 tracking-[-0.05em]">
        geeky
      </span>
      <div className="relative inline-block px-1">
        <span className={cn(
          "text-xl font-black bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 bg-clip-text text-transparent",
          "drop-shadow-[0.5px_0.5px_0px_rgba(255,255,255,0.8)] transition-all duration-300 group-hover:drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]",
          "relative z-10 antialiased"
        )}>
          Zindagi
        </span>
        {/* Texture/Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
      </div>
      <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-gray-900 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    </Link>
  );
}
