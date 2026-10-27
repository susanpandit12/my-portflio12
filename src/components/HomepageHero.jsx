import React, { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Arrow, Asterisk } from "./Icons.jsx";

const Sculpture = lazy(() => import("./Sculpture.jsx"));

export default function HomepageHero({ animated }) {
  const section = useRef(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const titleX = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [-12, 24]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const lineX = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      className="hero"
      id="home"
      ref={section}
      aria-labelledby="hero-title"
    >
      <div className="hero-pin">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-topline mono">
          <span>
            <i className="status-dot" /> OPEN TO CONVERSATIONS
          </span>
          <span>BASED IN ATLANTA · ROOTED IN NEPAL</span>
          <span>PORTFOLIO / 2026</span>
        </div>

        <motion.div
          className="hero-copy"
          style={animated ? { x: titleX, y: titleY } : undefined}
        >
          <p className="hero-name mono">
            <span>नमस्ते,</span> I’M SUSAN PANDIT
          </p>
          <h1 id="hero-title">
            <span className="hero-title-line">CODE WITH</span>
            <span className="hero-title-line hero-title-serif">
              character<span className="heading-period">.</span>
            </span>
          </h1>
          <div className="hero-description">
            <span className="hero-copy-mark" aria-hidden="true">
              ↳
            </span>
            <p>
              A software developer turning complex ideas into simple
              experiences. A little logic. A little imagination.
            </p>
          </div>
          <div className="hero-links">
            <a className="contact-button" href="#projects">
              Explore my work <Arrow />
            </a>
            <a
              className="hero-text-link"
              href="mailto:susan.pandit98@gmail.com"
            >
              Have an idea? <Arrow />
            </a>
          </div>
        </motion.div>

        <div className="hero-visual">
          <div className="hero-coordinate mono" aria-hidden="true">
            FIG. 01 — THINKING IN MOTION
          </div>
          <motion.div
            className="orbit-diagram"
            aria-hidden="true"
            style={animated ? { rotate: ringRotate } : undefined}
          >
            <span className="orbit-ring" />
            <span className="orbit-ring" />
            <span className="orbit-dot" />
          </motion.div>
          <motion.div
            className="sculpture"
            style={
              animated ? { rotate: artRotate, scale: artScale } : undefined
            }
          >
            <Suspense
              fallback={
                <div className="sculpture-fallback" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              }
            >
              <Sculpture animated={animated} scrollProgress={scrollYProgress} />
            </Suspense>
          </motion.div>
          <span className="hero-visual-caption mono" aria-hidden="true">
            CURIOUS MIND.
            <br />
            ENDLESS POSSIBILITIES.
          </span>
          <span className="hero-crosshair" aria-hidden="true">
            +
          </span>
        </div>

        <div className="hero-bottomline">
          <a className="hero-scroll mono" href="#perspective">
            <span className="scroll-arrow">↓</span>
            <span>
              SCROLL A LITTLE.
              <br />
              DISCOVER A LOT.
            </span>
          </a>
          <motion.p
            className="hero-mantra"
            aria-hidden="true"
            style={animated ? { x: lineX } : undefined}
          >
            GOOD CODE. <span>GREAT FEELING.</span>
          </motion.p>
          <span className="hero-edition mono">
            <Asterisk /> INDEPENDENT MIND
            <br />
            ALWAYS IN PROGRESS
          </span>
        </div>
        <div className="hero-scroll-track" aria-hidden="true">
          <motion.span style={{ scaleX: animated ? scrollYProgress : 1 }} />
        </div>
      </div>
    </section>
  );
}
