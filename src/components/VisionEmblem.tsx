import React from 'react';
import { motion } from 'motion/react';

interface VisionEmblemProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBackgroundText?: boolean;
}

export default function VisionEmblem({ size = 'md', showBackgroundText = false }: VisionEmblemProps) {
  // Determine pixel sizes
  const sizeMap = {
    xs: { width: 40, height: 40 },
    sm: { width: 80, height: 80 },
    md: { width: 140, height: 140 },
    lg: { width: 220, height: 220 },
    xl: { width: 320, height: 320 },
  };

  const { width, height } = sizeMap[size];

  // Colors straight from the Saudi Vision 2030 logo uploaded:
  // - Vibrant Mint Green: #00b074
  // - Premium Turquoise Cyan: #00b4d8
  // - Bright Leaf Green: #8dc63f
  // - Deep Pines/Teal: #104f3e
  // - Golden Sand: #d4af37

  return (
    <div 
      className="relative flex items-center justify-center select-none"
      style={{ width, height }}
    >
      {/* Dynamic Background Glow/Atmosphere */}
      <motion.div
        animate={{
          scale: [1, 1.05, 0.98, 1],
          opacity: [0.3, 0.45, 0.35, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(0, 176, 116, 0.25) 0%, rgba(0, 180, 216, 0.15) 50%, transparent 100%)`,
        }}
      />

      {/* SVG Outer Structure representing the custom Vision 2030 Geometric Ring */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,176,116,0.15)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Defs & Gradients */}
          <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8dc63f" /> {/* Leaf green left in image */}
            <stop offset="50%" stopColor="#00b074" /> {/* Core mint green */}
            <stop offset="100%" stopColor="#00b4d8" /> {/* Turquoise right in image */}
          </linearGradient>

          <linearGradient id="foilGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#104f3e" />
            <stop offset="50%" stopColor="#00b074" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>

          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#f3e5ab" />
          </linearGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Rotating Mosaic Pattern (8 or 16 symmetrical dots/tiles from vision 2030 flower) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: '100px 100px' }}
        >
          {/* Ring of geometric flower tiles in turquoise, gold and emerald */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            const color = i % 4 === 0 
              ? '#d4af37' // Gold accent
              : i % 3 === 0 
                ? '#00b4d8' // Sky cyan
                : i % 2 === 0 
                  ? '#00b074' // Emerald
                  : '#8dc63f'; // Leaf green
            
            return (
              <g key={i} transform={`rotate(${angle} 100 100)`}>
                {/* Visual flower-petal shaped tile */}
                <polygon
                  points="100,24 104,38 100,48 96,38"
                  fill={color}
                  fillOpacity="0.85"
                />
                <circle
                  cx="100"
                  cy="18"
                  r="2.5"
                  fill={color}
                  opacity="0.9"
                />
              </g>
            );
          })}
        </motion.g>

        {/* Middle Counter-rotating Mosaic Ring */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: '100px 100px' }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const color = i % 3 === 0 ? '#00b4d8' : i % 2 === 0 ? '#8dc63f' : '#00b074';
            return (
              <g key={i} transform={`rotate(${angle} 100 100)`}>
                <polygon
                  points="100,50 103,58 100,64 97,58"
                  fill={color}
                  fillOpacity="0.75"
                />
              </g>
            );
          })}
        </motion.g>

        {/* Central Glowing Shield Background */}
        <circle
          cx="100"
          cy="100"
          r="48"
          fill="#070c0a"
          fillOpacity="0.8"
          stroke="url(#primaryGrad)"
          strokeWidth="2"
        />

        {/* Subtle geometric grid inside shield */}
        <circle cx="100" cy="100" r="38" stroke="#1c2b26" strokeWidth="1" strokeDasharray="3 3" />

        {/* THE SAUDI EMBLEM (Palm tree + Crossed Swords) */}
        {/* Palm tree sways gently in a life-like manner! ('اعمل صوره النخلة فيها شوية انميشن') */}
        <motion.g
          animate={{
            rotate: [0, 2, -2, 1, -1, 0],
            skewX: [0, 1.5, -1.5, 0.5, -0.5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: '100px 115px' }} // Pivot from the base of the palm tree trunk
        >
          {/* Palm Tree Trunk */}
          <path
            d="M98,112 L102,112 L101.5,86 L98.5,86 Z"
            fill="url(#primaryGrad)"
          />
          {/* Trunk ridges */}
          <path d="M98.5,106 H101.5" stroke="#070c0a" strokeWidth="1" />
          <path d="M98.3,101 H101.7" stroke="#070c0a" strokeWidth="1" />
          <path d="M98.2,96 H101.8" stroke="#070c0a" strokeWidth="1" />
          <path d="M98.3,91 H101.7" stroke="#070c0a" strokeWidth="1" />

          {/* Palm Tree Fronds (Leaves) configured beautifully inside */}
          {/* Center Up Leaf */}
          <path
            d="M100,85 C100,74 98,63 94,56 C102,63 100,74 100,85 Z"
            fill="url(#foilGrad)"
          />
          {/* Top-Right Leaf */}
          <path
            d="M100,85 C108,76 114,70 120,67 C113,74 105,80 100,85 Z"
            fill="#00b074"
          />
          {/* Top-Left Leaf */}
          <path
            d="M100,85 C92,76 86,70 80,67 C87,74 95,80 100,85 Z"
            fill="#8dc63f"
          />
          {/* Mid-Right Leaf */}
          <path
            d="M100,85 C111,83 118,80 126,81 C117,84 108,84 100,85 Z"
            fill="#00b4d8"
          />
          {/* Mid-Left Leaf */}
          <path
            d="M100,85 C89,83 82,80 74,81 C83,84 92,84 100,85 Z"
            fill="#00b074"
          />
          {/* Low-Right Leaf */}
          <path
            d="M100,85 C109,92 116,98 123,105 C115,98 107,93 100,85 Z"
            fill="#8dc63f"
          />
          {/* Low-Left Leaf */}
          <path
            d="M100,85 C91,92 84,98 77,105 C85,98 93,93 100,85 Z"
            fill="#00b4d8"
          />
        </motion.g>

        {/* Crossed Swords with subtle gleam / glow animation */}
        <g>
          {/* Curved Sword Right */}
          <motion.path
            d="M74,136 L75,134 C82,126 91,120 100,118 C109,120 118,126 125,134 L126,136"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Curved Sword Sword Left-slanted */}
          <motion.path
            d="M76,136 L79,134 C89,124 104,117 118,115 L121,114"
            stroke="url(#goldGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-90"
          />
          {/* Curved Sword Sword Right-slanted */}
          <motion.path
            d="M124,136 L121,134 C111,124 96,117 82,115 L79,114"
            stroke="url(#goldGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-90"
          />

          {/* Sword hilt right (gold) */}
          <circle cx="78" cy="136" r="3" fill="#d4af37" />
          <path d="M75,135 L81,137" stroke="#d4af37" strokeWidth="2" />

          {/* Sword hilt left (gold) */}
          <circle cx="122" cy="136" r="3" fill="#d4af37" />
          <path d="M125,135 L119,137" stroke="#d4af37" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
