"use client";

// Grain/noise texture overlay for depth
export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Animated gradient mesh background
export function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Primary blob */}
      <div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full animate-blob"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Secondary blob */}
      <div
        className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full animate-blob animation-delay-2000"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Tertiary blob */}
      <div
        className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 rounded-full animate-blob animation-delay-4000"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

// Light leak effect
export function LightLeak({ position = "top-right" }: { position?: string }) {
  const positionClasses: Record<string, string> = {
    "top-right": "-top-20 -right-20",
    "top-left": "-top-20 -left-20",
    "bottom-right": "-bottom-20 -right-20",
    "bottom-left": "-bottom-20 -left-20",
  };

  return (
    <div
      className={`absolute w-96 h-96 ${positionClasses[position]} pointer-events-none`}
      style={{
        background:
          "radial-gradient(circle, rgba(251,191,36,0.1) 0%, rgba(249,115,22,0.05) 50%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
}

// Animated border gradient
export function GradientBorder({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative p-[1px] rounded-2xl overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 animate-gradient-rotate"
        style={{
          background:
            "conic-gradient(from 0deg, #a855f7, #ec4899, #f97316, #a855f7)",
        }}
      />
      <div className="relative bg-background rounded-2xl">{children}</div>
    </div>
  );
}

// Glow effect
export function Glow({
  color = "purple",
  size = "md",
  className = "",
}: {
  color?: "purple" | "pink" | "blue" | "orange";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const colors = {
    purple: "rgba(168,85,247,0.3)",
    pink: "rgba(236,72,153,0.3)",
    blue: "rgba(59,130,246,0.3)",
    orange: "rgba(249,115,22,0.3)",
  };

  const sizes = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
  };

  return (
    <div
      className={`absolute rounded-full pointer-events-none ${sizes[size]} ${className}`}
      style={{
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
    />
  );
}
