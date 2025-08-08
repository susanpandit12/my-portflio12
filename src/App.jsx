import React, { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import EducationSection from "./sections/EducationSection.jsx";
import HotTakesSection from "./sections/HotTakesSection.jsx";
import SocialLinksSection from "./sections/SocialLinksSection.jsx";
import SvgDivider from "./components/SvgDivider.jsx";
import ParallaxLayers from "./components/ParallaxLayers.jsx";

export default function App() {
  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <HelmetProvider>
      <MotionConfig reducedMotion={prefersReduced ? "always" : "never"}>
        <Helmet>
          <title>Susan — Portfolio</title>
          <meta name="description" content="Super-modern portfolio with sleek animations and bold personality by Susan." />
          <meta property="og:title" content="Susan — Portfolio" />
          <meta property="og:description" content="Sleek, animated, unapologetically modern." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/src/assets/profile.jpg" />
          <script type="application/ld+json">{JSON.stringify({
            "@context":"https://schema.org",
            "@type":"Person",
            name:"Susan",
            knowsAbout:["Web Design","Animations","Framer Motion","Vanta.js"]
          })}</script>
        </Helmet>
        <div className="min-h-screen relative transition-colors duration-300">
          {/* Scroll progress bar */}
          <div
            className="fixed top-0 left-0 h-1 z-[9999] bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 rounded-r-full"
            style={{ width: `${scroll}%` }}
          />
          <Navbar />
          <ParallaxLayers />

          <main>
            <section id="hero" className="section">
              <HeroSection />
            </section>
            <SvgDivider variant="wave" />
            <section id="education" className="section">
              <EducationSection />
            </section>
            <SvgDivider variant="zigzag" />
            <section id="hot-takes" className="section">
              <HotTakesSection />
            </section>
            <SvgDivider variant="wave" />
            <section id="social" className="section">
              <SocialLinksSection />
            </section>
          </main>

          <footer className="py-14 px-4 text-center bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 dark:from-[#232946]/60 dark:via-[#1e3c72]/60 dark:to-[#0f2027]/60 relative mt-16">
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow flex items-center gap-1">
                Powered by curiosity, code, and caffeine.
              </span>
              <span className="text-sm text-gray-700 dark:text-white/60">
                Built with <span className="font-semibold text-cyan-500">React</span>, <span className="font-semibold text-blue-500">Tailwind</span>, and <span className="font-semibold text-violet-500">JSP</span>.
              </span>

              {/* Contact Me button */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScDv8ffMaeuWPnIygWhu-113WblitiuaH79SFSpI1bQLVDWYA/viewform?usp=sharing&ouid=100539673984814755174"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact me via Google Form"
                className="mt-3 inline-flex items-center gap-2 px-5 py-2 rounded-full text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 hover:from-cyan-500 hover:via-blue-500 hover:to-violet-500 transition-shadow shadow-lg hover:shadow-cyan-500/30"
              >
                Contact Me
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90">
                  <path d="M7 12h10M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <span className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                &copy; 2025 Susan Pandit. जय नेपाल <span className="text-lg">🇳🇵</span>
              </span>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 rounded-full blur-lg opacity-60 pointer-events-none" />
          </footer>
        </div>
      </MotionConfig>
    </HelmetProvider>
  );
}