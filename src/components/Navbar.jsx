import React from "react";
import clsx from "clsx";
import useScrollSpy from "../hooks/useScrollSpy.js";
import { motion } from "framer-motion";

function NepalFlagIcon({ className }) {
  return (
    <motion.svg
      viewBox="0 0 80 100"
      className={clsx("w-5 h-5", className)}
      aria-hidden="true"
      initial={{ rotate: -10 }}
      animate={{ rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* gradient stroke using Nepal palette */}
      <defs>
        <linearGradient id="np" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--nepal-red)" />
          <stop offset="100%" stopColor="var(--nepal-blue)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M6 6 L60 34 L6 34 Z M6 34 L74 94 L6 94 Z"
        fill="none"
        stroke="url(#np)"
        strokeWidth="6"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "education", label: "Education" },
  { id: "hot-takes", label: "Hot Takes" },
  { id: "social", label: "Social" }
];

export default function Navbar() {
  const active = useScrollSpy(LINKS.map(l => l.id), 80);

  // Fix: force re-render on theme change to ensure Navbar picks up theme class changes
  const [_, setRerender] = React.useState(0);
  React.useEffect(() => {
    const observer = new MutationObserver(() => setRerender(x => x + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-blue-400/20 bg-white/70 dark:bg-[#1e3c72]/80 backdrop-blur-xl transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-8 font-poppins">
        {/* Branding */}
        <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-300">
          <NepalFlagIcon className="text-blue-600 dark:text-cyan-300" />
          <span className="text-lg font-bold uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--nepal-red)] via-blue-500 to-[var(--nepal-blue)]">
            Susan
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex items-center gap-6">
          {LINKS.map(link => {
            const isActive = active === link.id;
            return (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                whileHover={{ scale: 1.08 }}
                className={clsx(
                  "relative px-3 py-1 text-base font-medium transition-all tracking-tight leading-tight font-poppins",
                  "text-blue-700/80 hover:text-blue-700 dark:text-cyan-200/80 dark:hover:text-cyan-100",
                  isActive && "text-blue-700 dark:text-cyan-100 font-bold"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 mx-auto h-0.5 w-full max-w-[56px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 shadow-glow animate-pulse" />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* Accent Dot */}
        <span className="inline-block w-2 h-2 rounded-full bg-blue-400/70 dark:bg-cyan-300/70" />
      </div>
    </motion.nav>
  );
}
