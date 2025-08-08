import React from "react";

export default function SvgDivider({ variant = "wave" }) {
  return (
    <div className="relative isolate h-16 sm:h-20 overflow-hidden">
      {/* Soft animated bridge + grain */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent dark:via-white/5" />
        <div className="absolute inset-0 opacity-50 mix-blend-soft-light glow-band" />
        <div className="absolute inset-0 grain-fade" />
      </div>

      {/* Shape */}
      {variant === "zigzag" ? (
        <svg className="absolute inset-x-0 bottom-0 w-full text-blue-500/25 dark:text-white/10" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,30 L60,0 L120,30 L180,0 L240,30 L300,0 L360,30 L420,0 L480,30 L540,0 L600,30 L660,0 L720,30 L780,0 L840,30 L900,0 L960,30 L1020,0 L1080,30 L1140,0 L1200,30 L1260,0 L1320,30 L1380,0 L1440,30" fill="currentColor"/>
        </svg>
      ) : (
        <svg className="absolute inset-x-0 bottom-0 w-full text-blue-500/25 dark:text-white/10" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,80C1120,64,1280,32,1360,16L1440,0L1440,110L1360,110C1280,110,1120,110,960,110C800,110,640,110,480,110C320,110,160,110,80,110L0,110Z" fill="currentColor"/>
        </svg>
      )}
    </div>
  );
}
