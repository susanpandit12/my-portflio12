import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Arrow, Asterisk } from "./Icons.jsx";

const chapters = [
  {
    label: "THE CURIOSITY",
    title: "Start with",
    emphasis: "a what if.",
    description:
      "The best things I build start with a question. What if this could be simpler, more useful, a little more human?",
    word: "THINK",
    tag: "01 / FIND THE POSSIBILITY",
  },
  {
    label: "THE CRAFT",
    title: "Make every",
    emphasis: "detail count.",
    description:
      "Thoughtful interfaces. Dependable systems. I connect what you see with everything that makes it work.",
    word: "BUILD",
    tag: "02 / CONNECT THE DOTS",
  },
  {
    label: "THE FEELING",
    title: "Leave a little",
    emphasis: "personality.",
    description:
      "Because useful can be beautiful, too. A moment of motion. An unexpected detail. Something that feels like someone cared.",
    word: "FEEL",
    tag: "03 / MAKE IT MEMORABLE",
  },
];

export default function ScrollStory({ animated }) {
  const section = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (value) =>
    setActive(Math.min(2, Math.floor(value * 3))),
  );
  const rotation = useTransform(scrollYProgress, [0, 1], [-25, 155]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85]);
  const current = animated ? active : 0;

  return (
    <section
      className="scroll-story"
      id="perspective"
      ref={section}
      aria-labelledby="story-title"
    >
      <div className="story-pin">
        <div className="story-top mono">
          <span>THE WAY I SEE IT</span>
          <span>IDEAS → CODE → CONNECTION</span>
        </div>
        <h2 id="story-title" className="sr-only">
          The thinking behind the work
        </h2>
        <div className="story-layout">
          <div className="story-index" aria-hidden="true">
            <span className="mono">A LITTLE OF MY PROCESS</span>
            {chapters.map((chapter, index) => (
              <div
                key={chapter.label}
                className={`story-step ${current === index ? "is-active" : ""}`}
              >
                <span className="mono">0{index + 1}</span>
                <span>{chapter.word}</span>
                <span className="story-step-dot" />
              </div>
            ))}
            <motion.div
              className="story-flower"
              style={animated ? { rotate: rotation, scale } : undefined}
            >
              <Asterisk />
            </motion.div>
          </div>
          <div className="story-panels">
            {chapters.map((chapter, index) => (
              <article
                className={`story-panel ${current === index ? "is-active" : ""}`}
                key={chapter.label}
              >
                <span className="story-label mono">{chapter.label}</span>
                <h3>
                  {chapter.title}
                  <br />
                  <span>{chapter.emphasis}</span>
                </h3>
                <p>{chapter.description}</p>
                <span className="story-tag mono">{chapter.tag}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="story-bottom mono">
          <span>THOUGHTFUL BY DESIGN. HUMAN AT HEART.</span>
          <a href="#about">
            MEET THE DEVELOPER <Arrow />
          </a>
        </div>
        <div className="story-progress" aria-hidden="true">
          <motion.span style={{ scaleX: animated ? scrollYProgress : 1 }} />
        </div>
      </div>
    </section>
  );
}
