"use client";

import { motion } from "framer-motion";

// Hero Illustration - Geek exploring the universe
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <motion.circle
        cx="200"
        cy="200"
        r="180"
        fill="url(#heroGradient)"
        opacity="0.1"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting rings */}
      <motion.ellipse
        cx="200"
        cy="200"
        rx="150"
        ry="60"
        stroke="url(#purplePink)"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        animate={{ rotateX: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      />
      <motion.ellipse
        cx="200"
        cy="200"
        rx="120"
        ry="45"
        stroke="url(#purplePink)"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
        animate={{ rotateX: [0, -360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      />

      {/* Central figure - Geek silhouette */}
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head */}
        <circle cx="200" cy="160" r="35" fill="url(#purplePink)" />
        {/* Glasses */}
        <rect x="175" y="155" width="20" height="12" rx="2" fill="#1a1a2e" />
        <rect x="205" y="155" width="20" height="12" rx="2" fill="#1a1a2e" />
        <line x1="195" y1="161" x2="205" y2="161" stroke="#1a1a2e" strokeWidth="2" />
        {/* Body */}
        <path
          d="M170 195 L200 250 L230 195"
          fill="url(#purplePink)"
          opacity="0.8"
        />
        {/* Laptop glow */}
        <ellipse cx="200" cy="240" rx="30" ry="10" fill="#a855f7" opacity="0.5" />
      </motion.g>

      {/* Floating code symbols */}
      <motion.text
        x="280"
        y="120"
        fill="#a855f7"
        fontSize="20"
        fontFamily="monospace"
        animate={{ y: [120, 110, 120], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {"</>"}
      </motion.text>
      <motion.text
        x="100"
        y="150"
        fill="#ec4899"
        fontSize="16"
        fontFamily="monospace"
        animate={{ y: [150, 140, 150], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        {"{ }"}
      </motion.text>
      <motion.text
        x="300"
        y="250"
        fill="#f97316"
        fontSize="14"
        fontFamily="monospace"
        animate={{ y: [250, 240, 250], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        {"=>"}
      </motion.text>
      <motion.text
        x="90"
        y="280"
        fill="#22c55e"
        fontSize="18"
        fontFamily="monospace"
        animate={{ y: [280, 270, 280], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }}
      >
        {"( )"}
      </motion.text>

      {/* Stars/dots */}
      {[...Array(12)].map((_, i) => (
        <motion.circle
          key={i}
          cx={100 + Math.random() * 200}
          cy={80 + Math.random() * 240}
          r={1 + Math.random() * 2}
          fill="#a855f7"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <defs>
        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="purplePink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Curiosity Illustration - Lightbulb with question marks
export function CuriosityIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Lightbulb */}
        <motion.path
          d="M100 30 C60 30 40 70 40 100 C40 130 60 145 70 155 L130 155 C140 145 160 130 160 100 C160 70 140 30 100 30"
          fill="url(#yellowOrange)"
          animate={{ filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Bulb base */}
        <rect x="75" y="155" width="50" height="10" rx="2" fill="#f97316" />
        <rect x="80" y="165" width="40" height="8" rx="2" fill="#ea580c" />
        <rect x="85" y="173" width="30" height="6" rx="2" fill="#c2410c" />
        
        {/* Light rays */}
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <line x1="100" y1="5" x2="100" y2="20" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <line x1="160" y1="50" x2="175" y2="40" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="50" x2="25" y2="40" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <line x1="175" y1="100" x2="190" y2="100" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <line x1="25" y1="100" x2="10" y2="100" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* Question marks floating around */}
        <motion.text
          x="20"
          y="70"
          fill="#a855f7"
          fontSize="24"
          fontWeight="bold"
          animate={{ y: [70, 60, 70], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ?
        </motion.text>
        <motion.text
          x="170"
          y="80"
          fill="#ec4899"
          fontSize="20"
          fontWeight="bold"
          animate={{ y: [80, 70, 80], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          ?
        </motion.text>
      </motion.g>

      <defs>
        <linearGradient id="yellowOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Learning Illustration - Books and brain
export function LearningIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Stack of books */}
        <rect x="40" y="130" width="80" height="15" rx="2" fill="#3b82f6" />
        <rect x="35" y="115" width="90" height="15" rx="2" fill="#06b6d4" />
        <rect x="45" y="100" width="70" height="15" rx="2" fill="#8b5cf6" />
        
        {/* Open book on top */}
        <path d="M60 95 L100 85 L140 95 L100 100 Z" fill="#e0f2fe" />
        <path d="M60 95 L100 100 L100 85" fill="#bae6fd" />
        <line x1="100" y1="85" x2="100" y2="100" stroke="#0ea5e9" strokeWidth="1" />
        
        {/* Brain/knowledge waves */}
        <motion.g
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path d="M85 60 Q100 40 115 60" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <path d="M75 50 Q100 25 125 50" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M65 40 Q100 10 135 40" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.5" />
        </motion.g>

        {/* Floating letters/symbols */}
        <motion.text
          x="150"
          y="70"
          fill="#3b82f6"
          fontSize="16"
          fontWeight="bold"
          animate={{ y: [70, 60, 70] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          A
        </motion.text>
        <motion.text
          x="30"
          y="60"
          fill="#06b6d4"
          fontSize="14"
          fontWeight="bold"
          animate={{ y: [60, 50, 60] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
        >
          π
        </motion.text>
        <motion.text
          x="160"
          y="110"
          fill="#8b5cf6"
          fontSize="12"
          fontFamily="monospace"
          animate={{ y: [110, 100, 110] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
        >
          {}
        </motion.text>
      </motion.g>
    </svg>
  );
}

// Building Illustration - Tools and gears
export function BuildingIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Main gear */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <circle cx="100" cy="100" r="35" fill="url(#greenGradient)" />
          <circle cx="100" cy="100" r="15" fill="#1a1a2e" />
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x="95"
              y="60"
              width="10"
              height="15"
              rx="2"
              fill="url(#greenGradient)"
              transform={`rotate(${i * 45} 100 100)`}
            />
          ))}
        </motion.g>

        {/* Smaller gear */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "155px 70px" }}
        >
          <circle cx="155" cy="70" r="20" fill="url(#emeraldGradient)" />
          <circle cx="155" cy="70" r="8" fill="#1a1a2e" />
          {[...Array(6)].map((_, i) => (
            <rect
              key={i}
              x="152"
              y="47"
              width="6"
              height="10"
              rx="1"
              fill="url(#emeraldGradient)"
              transform={`rotate(${i * 60} 155 70)`}
            />
          ))}
        </motion.g>

        {/* Wrench */}
        <motion.g
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "50px 150px" }}
        >
          <path
            d="M30 170 L50 150 L55 155 L35 175 Z"
            fill="#6b7280"
          />
          <circle cx="55" cy="145" r="12" fill="#4b5563" />
          <circle cx="55" cy="145" r="6" fill="#1a1a2e" />
        </motion.g>

        {/* Code brackets */}
        <motion.text
          x="40"
          y="80"
          fill="#22c55e"
          fontSize="24"
          fontFamily="monospace"
          fontWeight="bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {"<"}
        </motion.text>
        <motion.text
          x="150"
          y="150"
          fill="#10b981"
          fontSize="24"
          fontFamily="monospace"
          fontWeight="bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          {"/>"}
        </motion.text>
      </motion.g>

      <defs>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Create Value Illustration - Rocket launching
export function CreateValueIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Rocket body */}
        <path
          d="M100 30 L120 80 L120 130 L100 150 L80 130 L80 80 Z"
          fill="url(#rocketGradient)"
        />
        {/* Rocket window */}
        <circle cx="100" cy="80" r="15" fill="#1a1a2e" />
        <circle cx="100" cy="80" r="10" fill="#3b82f6" opacity="0.5" />
        {/* Rocket fins */}
        <path d="M80 110 L60 140 L80 130 Z" fill="#ec4899" />
        <path d="M120 110 L140 140 L120 130 Z" fill="#ec4899" />
        {/* Rocket tip */}
        <path d="M90 30 L100 10 L110 30 Z" fill="#f43f5e" />
      </motion.g>

      {/* Flame */}
      <motion.g
        animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 0.3, repeat: Infinity }}
        style={{ transformOrigin: "100px 150px" }}
      >
        <path d="M90 150 L100 190 L110 150 Z" fill="#f97316" />
        <path d="M93 150 L100 180 L107 150 Z" fill="#fbbf24" />
        <path d="M96 150 L100 170 L104 150 Z" fill="#fef3c7" />
      </motion.g>

      {/* Stars */}
      <motion.g
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <polygon points="30,50 32,56 38,56 33,60 35,66 30,62 25,66 27,60 22,56 28,56" fill="#a855f7" />
        <polygon points="170,70 171,74 175,74 172,76 173,80 170,78 167,80 168,76 165,74 169,74" fill="#ec4899" />
        <polygon points="50,120 51,123 54,123 52,125 53,128 50,126 47,128 48,125 45,123 49,123" fill="#f97316" />
        <polygon points="160,140 161,143 164,143 162,145 163,148 160,146 157,148 158,145 155,143 159,143" fill="#22c55e" />
      </motion.g>

      {/* Sparkle trails */}
      <motion.circle
        cx="85"
        cy="170"
        r="3"
        fill="#fbbf24"
        animate={{ y: [170, 190], opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <motion.circle
        cx="115"
        cy="170"
        r="2"
        fill="#f97316"
        animate={{ y: [170, 185], opacity: [1, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
      />

      <defs>
        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Mentor Illustration - People connected
export function MentorIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Connection lines */}
      <motion.path
        d="M100 100 L50 60"
        stroke="url(#connectionGradient)"
        strokeWidth="2"
        strokeDasharray="5,5"
        animate={{ strokeDashoffset: [0, 10] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M100 100 L150 60"
        stroke="url(#connectionGradient)"
        strokeWidth="2"
        strokeDasharray="5,5"
        animate={{ strokeDashoffset: [0, 10] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M100 100 L50 150"
        stroke="url(#connectionGradient)"
        strokeWidth="2"
        strokeDasharray="5,5"
        animate={{ strokeDashoffset: [0, 10] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M100 100 L150 150"
        stroke="url(#connectionGradient)"
        strokeWidth="2"
        strokeDasharray="5,5"
        animate={{ strokeDashoffset: [0, 10] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      {/* Central mentor figure */}
      <motion.g
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "100px 100px" }}
      >
        <circle cx="100" cy="85" r="18" fill="url(#mentorGradient)" />
        <path d="M80 105 Q100 120 120 105 L115 130 L85 130 Z" fill="url(#mentorGradient)" />
        {/* Heart symbol */}
        <path
          d="M100 95 C95 90 90 95 90 100 C90 105 100 115 100 115 C100 115 110 105 110 100 C110 95 105 90 100 95"
          fill="#f43f5e"
          transform="translate(0, 20) scale(0.5)"
          style={{ transformOrigin: "100px 100px" }}
        />
      </motion.g>

      {/* Mentee figures */}
      {[
        { cx: 50, cy: 60, delay: 0 },
        { cx: 150, cy: 60, delay: 0.2 },
        { cx: 50, cy: 150, delay: 0.4 },
        { cx: 150, cy: 150, delay: 0.6 },
      ].map((pos, i) => (
        <motion.g
          key={i}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: pos.delay }}
        >
          <circle cx={pos.cx} cy={pos.cy - 8} r="12" fill={i % 2 === 0 ? "#f43f5e" : "#ec4899"} />
          <path
            d={`M${pos.cx - 12} ${pos.cy + 5} Q${pos.cx} ${pos.cy + 15} ${pos.cx + 12} ${pos.cy + 5} L${pos.cx + 8} ${pos.cy + 22} L${pos.cx - 8} ${pos.cy + 22} Z`}
            fill={i % 2 === 0 ? "#f43f5e" : "#ec4899"}
          />
        </motion.g>
      ))}

      {/* Floating hearts */}
      <motion.text
        x="70"
        y="85"
        fontSize="12"
        animate={{ y: [85, 75, 85], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💜
      </motion.text>
      <motion.text
        x="125"
        y="120"
        fontSize="10"
        animate={{ y: [120, 110, 120], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        💗
      </motion.text>

      <defs>
        <linearGradient id="mentorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Decorative floating shapes
export function FloatingShapes({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Floating geometric shapes */}
      <motion.rect
        x="50"
        y="50"
        width="30"
        height="30"
        rx="5"
        fill="#a855f7"
        opacity="0.3"
        animate={{ y: [50, 40, 50], rotate: [0, 45, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.circle
        cx="350"
        cy="100"
        r="20"
        fill="#ec4899"
        opacity="0.3"
        animate={{ y: [100, 90, 100] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      <motion.polygon
        points="100,350 120,320 140,350"
        fill="#f97316"
        opacity="0.3"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
      />
      <motion.rect
        x="300"
        y="300"
        width="25"
        height="25"
        fill="#22c55e"
        opacity="0.3"
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ transformOrigin: "312.5px 312.5px" }}
      />
      <motion.circle
        cx="80"
        cy="250"
        r="15"
        fill="#3b82f6"
        opacity="0.3"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
      />
    </svg>
  );
}
