import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col transition-colors duration-300">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-cyan-300 via-blue-400 to-violet-500 dark:from-cyan-900 dark:via-blue-900 dark:to-violet-900 animate-gradient-move opacity-95 transition-colors duration-300" />
        <div className="absolute inset-0 bg-white/10 dark:bg-white/10 backdrop-blur-2xl" />
        <div className="absolute -top-32 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-300/20 dark:bg-cyan-400/20 rounded-full blur-3xl animate-blob1" />
        <div className="absolute top-1/2 right-0 w-56 sm:w-80 h-56 sm:h-80 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-2xl animate-blob2" />
        <div className="absolute bottom-0 left-1/3 w-48 sm:w-72 h-48 sm:h-72 bg-violet-400/20 dark:bg-violet-500/20 rounded-full blur-2xl animate-blob3" />
      </div>

      {/* Hero Section */}
      <section className="flex-grow relative flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 sm:py-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-36 sm:w-48 h-36 sm:h-48 mb-8 rounded-full p-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_60px_#60a5fa55] hover:scale-105 transition-transform duration-300"
        >
          <div className="rounded-full h-full w-full bg-white/20 dark:bg-white/10 backdrop-blur-xl p-2">
            <img
              src="assets/profile.jpg"
              alt="Susan Pandit"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        </motion.div>

        <motion.h2
          className="text-base uppercase tracking-widest text-gray-700 dark:text-white/60 mb-2 font-poppins"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hello World, I'm
        </motion.h2>

        <motion.h1
          className="text-5xl xs:text-6xl sm:text-7xl font-extrabold font-poppins tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 dark:from-cyan-300 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-lg relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Susan Pandit
          <span className="block mx-auto mt-3 h-1 w-24 sm:w-32 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 rounded-full animate-pulse" />
        </motion.h1>

        <motion.p
          className="mt-2 text-xl font-semibold text-gray-900 dark:text-white drop-shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Software Developer <span className="mx-2">|</span>
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Version: Evolving</span>
        </motion.p>

        <motion.div
          className="mt-3 flex items-center justify-center gap-4 text-sm text-gray-800 dark:text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-1">
            🇳🇵 <span className="opacity-60">Nepal</span>
          </div>
          <span className="text-blue-400">➔</span>
          <div className="flex items-center gap-1">
            🇺🇸 <span className="opacity-60">Atlanta, Georgia</span>
          </div>
        </motion.div>

        <motion.p
          className="mt-5 max-w-3xl text-base leading-relaxed text-gray-800 dark:text-white/80 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          I’m a <span className="text-blue-500 font-semibold">Software Developer</span> with a deep-rooted passion for computers and technology.
          From a young age, I’ve been fascinated by how things work under the hood — an interest that naturally led me into development.
          I’ve worked with <span className="text-violet-500 font-semibold">Java</span>, <span className="text-violet-500 font-semibold">Spring Boot</span>, and modern front‑end tools like <span className="text-violet-500 font-semibold">React</span> and <span className="text-violet-500 font-semibold">Angular</span>, and I'm currently exploring scalable systems, modern UI frameworks, and the wild frontier of <span className="text-cyan-500 font-semibold">AI</span>.
          <br /><br />
          I love building <span className="text-blue-500 font-semibold">clean</span>, <span className="text-violet-500 font-semibold">user-friendly</span> experiences using tools like
          <span className="text-cyan-500 font-semibold"> Tailwind</span>, <span className="text-cyan-500 font-semibold">Angular</span>, and <span className="text-cyan-500 font-semibold">HTML/CSS</span>.
          When I’m not coding, I’m watching <span className="text-blue-500 font-semibold">cricket</span>, movies, soccer — or gaming to recharge.
          Curiosity and creativity keep me pushing forward.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowVideo(!showVideo)}
          className="mt-10 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-full shadow-2xl font-semibold text-lg transition-all duration-200 border-2 border-white/10 font-poppins shine float-soft"
        >
          <span className="inline-flex items-center gap-2">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block"><path d="M8 5v14l11-7z" /></svg>
            Pronounce My Name
          </span>
        </motion.button>

        {showVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-8 max-w-xl w-full overflow-hidden rounded-2xl ring-2 ring-blue-400/30 shadow-2xl bg-black/80 backdrop-blur-lg"
          >
            <ReactPlayer url="https://www.youtube.com/watch?v=4Ssu98-P6V4" controls width="100%" height="360px" />
          </motion.div>
        )}
      </section>

      {/* Custom Animations */}
      <style>{`
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 12s ease-in-out infinite;
        }
        @keyframes blob1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-40px) scale(1.13); }
        }
        .animate-blob1 { animation: blob1 9s ease-in-out infinite; }
        @keyframes blob2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(50px) scale(1.12); }
        }
        .animate-blob2 { animation: blob2 11s ease-in-out infinite; }
        @keyframes blob3 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.15); }
        }
        .animate-blob3 { animation: blob3 13s ease-in-out infinite; }
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .shine {
          background: linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shine 1.5s linear infinite;
        }
        .float-soft {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translatey(0); }
          50% { transform: translatey(-10px); }
        }
      `}</style>
    </div>
  );
}