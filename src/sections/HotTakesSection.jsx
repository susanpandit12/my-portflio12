import React, { useState } from "react";
import { motion } from "framer-motion";

const hotTakes = [
  
  {
    icon: "⚡",
    label: "AMD > Intel",
    description: "More cores. Less noise. Real performance for real people.",
  },
  {
    icon: "📱",
    label: "Android > iOS",
    description: "Freedom over fences. Custom UI, real multitasking, and a dev-first vibe.",
  },
  {
    icon: "🎮",
    label: "PS5 > Xbox",
    description: "Better exclusives. Sleek hardware. DualSense adds emotion to gaming.",
  },
  {
    icon: "🐐",
    label: "Joe Root is the best Test batsman of the modern era",
    description: "Technically flawless, mentally solid, and runs everywhere — elite elegance.",
  },
  {
    icon: "💬",
    label: "Reddit > Facebook",
    description: "You get insight, memes, and actual conversation — not family drama.",
  },
  {
    icon: "🏏",
    label: "Cricket > Baseball",
    description: "Layered tension, more strategy, and rhythm that tells a story.",
  },
  {
    icon: "🎬",
    label: "Animated movies deserve Oscars over live-action",
    description: "Art direction, pacing, and pure visual invention — animation rules harder.",
  },
  {
    icon: "🚀",
    label: "Fast internet beats fancy hardware",
    description: "Lag kills vibe. Give me 1 Gbps over 16 cores any day.",
  },
  {
    icon: "🕹️",
    label: "Red Dead Redemption 2 is Rockstar's best game",
    description: "Not just a game — it’s cinematic art, emotional grit, and impeccable realism.",
  },
  {
    icon: "🖥️️",
    label: "React > Angular",
    description: "I am coding this in React , nothing more to say.",
  },
];

export default function HotTakesSection() {
  const [highlight, setHighlight] = useState(null);

  const sparkTake = (label) => {
    setHighlight(label);
    setTimeout(() => setHighlight(null), 1000);
  };

  // Staggered animations for a smoother, modern reveal
  const list = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } }
  };

  return (
    <div className="relative py-24 bg-gradient-to-br from-[#e0eafc] via-[#cfdef3] to-[#a1c4fd] dark:from-[#232946] dark:via-[#1e3c72] dark:to-[#0f2027] text-black dark:text-white transition-colors duration-300 overflow-hidden">
      {/* Ambient mesh + grid overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(600px 200px at 10% 0%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(500px 200px at 90% 100%, rgba(139,92,246,0.18), transparent 60%)"
          }}
        />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <h2 className="text-center text-5xl sm:text-6xl font-extrabold font-poppins tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 dark:from-cyan-300 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-lg mb-3">
        🔥 My Hot Takes
      </h2>
      <p className="text-center text-sm sm:text-base text-gray-700/70 dark:text-white/60 max-w-2xl mx-auto">
        Unfiltered opinions • Glassy cards • Subtle glow
      </p>
      <span className="block mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 rounded-full animate-pulse" />

      {/* Grid with staggered children */}
      <motion.div
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-14 px-4 sm:px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {hotTakes.map((take, i) => (
          <motion.div
            key={take.label}
            variants={item}
            onClick={() => sparkTake(take.label)}
            className={[
              "group relative rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-xl",
              "border border-blue-200/40 dark:border-blue-400/10 p-6 sm:p-8",
              "transition-all text-left text-black dark:text-white",
              "hover:-translate-y-2 hover:scale-[1.02] will-change-transform",
              highlight === take.label ? "ring-2 ring-cyan-400/60" : "ring-0"
            ].join(" ")}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Top accent + hover glow ring */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 opacity-90" />
            <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition duration-300 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

            {/* Header: gradient icon badge + gradient title */}
            <div className="relative flex items-center gap-3 text-xl font-bold">
              <span className="inline-grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 text-white shadow-lg">
                {take.icon}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
                {take.label}
              </span>
              {highlight === take.label && (
                <motion.span
                  className="ml-1"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1.2, rotate: 0 }}
                  exit={{ opacity: 0 }}
                >
                  🔥
                </motion.span>
              )}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {take.description}
            </p>

            {/* Footer: subtle pill + quick spark button */}
            <div className="mt-5 flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/10 text-gray-700 dark:text-white/80">
                Hot take
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); sparkTake(take.label); }}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow"
                aria-label={`Spice ${take.label}`}
              >
                <span>Spice it</span> <span>⚡</span>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
