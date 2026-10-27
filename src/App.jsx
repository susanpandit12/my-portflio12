import React, { createContext, useContext, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import { Arrow, Asterisk } from "./components/Icons.jsx";

import HomepageHero from "./components/HomepageHero.jsx";
import ScrollStory from "./components/ScrollStory.jsx";
import Workbench from "./components/Workbench.jsx";
const MotionContext = createContext(true);
const EMAIL = "susan.pandit98@gmail.com";
const CONTACT = `mailto:${EMAIL}`;
const GITHUB = "https://github.com/susanpandit12";

function Reveal({ children, className = "", delay = 0 }) {
  const animated = useContext(MotionContext);
  return (
    <motion.div
      className={className}
      initial={animated ? { opacity: 0, y: 28 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: animated ? 0.7 : 0,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress({ animated }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="scroll-progress"
      aria-hidden="true"
      style={{ scaleX: animated ? progress : 0 }}
    />
  );
}

const technologies = [
  "REACT",
  "JAVA",
  "SPRING BOOT",
  "ANGULAR",
  "TAILWIND",
  "CREATIVE CODE",
];
function Marquee() {
  return (
    <div
      className="marquee"
      role="img"
      aria-label="Technologies: React, Java, Spring Boot, Angular, Tailwind, creative code"
    >
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {technologies.map((text) => (
              <span key={text}>
                {text}
                <Asterisk />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section
      className="about section-shell"
      id="about"
      aria-labelledby="about-title"
    >
      <Reveal className="section-kicker mono">
        <span>01 / A LITTLE ABOUT ME</span>
        <Asterisk />
      </Reveal>
      <div className="about-grid">
        <Reveal className="portrait-wrap">
          <div className="portrait-frame">
            <img
              src="/assets/profile.jpg"
              alt="Susan Pandit"
              width="807"
              height="546"
              loading="lazy"
            />
            <span className="portrait-index mono">SP / OFFLINE</span>
          </div>
          <div className="portrait-caption mono">
            <span>NEPAL → ATLANTA, GA</span>
            <span>नमस्ते</span>
          </div>
        </Reveal>
        <div className="about-copy">
          <Reveal>
            <h2 id="about-title">
              A curious mind.
              <br />A <span className="serif-word">builder’s</span> instinct.
            </h2>
          </Reveal>
          <Reveal>
            <p className="about-lead">
              I’m Susan Pandit, a software developer who cares as much about how
              something feels as how it works.
            </p>
            <p>
              My curiosity about computers grew into a love for building with
              Java, Spring Boot, React, and Angular. Today, I’m connecting
              reliable systems with thoughtful interfaces — and exploring what
              AI makes possible.
            </p>
            <p>
              Originally from Nepal and based in Atlanta, I bring curiosity and
              a fresh perspective to what I build. Away from the screen?
              Cricket, soccer, movies, and a good game.
            </p>
          </Reveal>
          <Reveal className="about-signoff">
            <span>Always learning. Always making.</span>
            <span className="signature">Susan.</span>
          </Reveal>
        </div>
      </div>
      <Reveal className="education">
        <div className="mono education-label">THE FOUNDATION</div>
        <div>
          <span className="mono">2021 / SAINT CLOUD STATE UNIVERSITY</span>
          <h3>Information Systems</h3>
          <p>Bachelor’s degree</p>
        </div>
        <div>
          <span className="mono">2026 / TRINE UNIVERSITY</span>
          <h3>Business Analytics</h3>
          <p>Master’s program</p>
        </div>
      </Reveal>
    </section>
  );
}

const services = [
  {
    name: "Full-stack development",
    description:
      "From the first interaction to the logic behind it. Thoughtful interfaces connected to dependable applications.",
    tools: "Java · Spring Boot · React · Angular",
    detail:
      "I bring frontend and backend thinking together: clear application structure, reusable components, and APIs that make the experience work as a whole.",
  },
  {
    name: "Web experiences",
    description:
      "Clean layouts, expressive motion, and the small details that make a website feel good to use.",
    tools: "Responsive design · Tailwind CSS · Framer Motion",
    detail:
      "I build interfaces that adapt to different screens, work with keyboards, and respect motion preferences. The goal is a website that feels considered on every device.",
  },
  {
    name: "Practical digital tools",
    description:
      "Useful software that makes an everyday task simpler. Built around people and the way they actually work.",
    tools: "Product thinking · Browser tools · User experience",
    detail:
      "I enjoy turning a repeated task into a useful tool: fewer steps, clearer feedback, and an interface that helps people get straight to what they need.",
  },
  {
    name: "Data & exploration",
    description:
      "Connecting technology with business questions. Learning, experimenting, and turning curiosity into what comes next.",
    tools: "Business analytics · Scalable systems · AI exploration",
    detail:
      "My Information Systems background and Business Analytics studies shape how I approach a problem: understand the need, explore the data, and build something useful.",
  },
  {
    name: "APIs & integrations",
    description:
      "Connect the moving parts. Clean APIs and integrations that help applications work together.",
    tools: "REST APIs · Spring Boot · Third-party integrations",
    detail:
      "From defining endpoints to handling errors and validating input, I build connections that are understandable, maintainable, and useful to the people building on top of them.",
  },
  {
    name: "Performance & accessibility",
    description:
      "Make the details count. Faster pages, clearer interactions, and experiences more people can use.",
    tools: "Responsive layouts · Keyboard navigation · Motion preferences",
    detail:
      "I review loading behavior, screen-size adaptations, semantic markup, and keyboard interactions, then turn the findings into practical improvements to the experience.",
  },
];
function Services() {
  const [open, setOpen] = useState(null);
  return (
    <section
      className="services section-shell"
      id="expertise"
      aria-labelledby="services-title"
    >
      <Reveal className="section-kicker mono">
        <span>02 / WHAT I BRING TO THE TABLE</span>
        <span>IDEA → EXPERIENCE</span>
      </Reveal>
      <Reveal className="services-heading">
        <h2 id="services-title">
          BUILT WITH
          <br />
          <span className="serif-word">intention.</span>
        </h2>
        <p>
          A developer’s mindset.
          <br />
          An eye for the experience.
          <br />
          Care in every detail.
        </p>
      </Reveal>
      <div className="services-list">
        {services.map((service, index) => (
          <Reveal key={service.name}>
            <article
              className={`service-row ${open === index ? "is-open" : ""}`}
            >
              <button
                className="service-trigger"
                onClick={() => setOpen(open === index ? null : index)}
                aria-expanded={open === index}
                aria-controls={`service-${index}`}
              >
                <span className="service-number">0{index + 1}</span>
                <span className="service-summary">
                  <span className="service-name">{service.name}</span>
                  <span className="service-description">
                    {service.description}
                  </span>
                </span>
                <span className="service-toggle" aria-hidden="true">
                  {open === index ? "−" : "+"}
                </span>
              </button>
              <div
                className="service-detail"
                id={`service-${index}`}
                hidden={open !== index}
              >
                <p>{service.detail}</p>
                <span className="mono">{service.tools}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const projectsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"],
  });
  const projectTilt = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -5]);
  const projectLift = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -25]);
  const animated = useContext(MotionContext);
  return (
    <section
      className="projects section-shell"
      id="projects"
      ref={projectsRef}
      aria-labelledby="projects-title"
    >
      <Reveal className="section-kicker mono">
        <span>03 / CODE MEETS CHARACTER</span>
        <span>SELECTED WORK — 2026</span>
      </Reveal>
      <Reveal className="projects-heading">
        <h2 id="projects-title" className="metallic">
          IDEAS INTO
          <br />
          <span className="serif-word">interfaces.</span>
        </h2>
        <span className="project-count mono">ALWAYS A WORK IN PROGRESS ↙</span>
      </Reveal>
      <Reveal>
        <motion.article
          className="project-card"
          style={
            animated ? { rotateX: projectTilt, y: projectLift } : undefined
          }
        >
          <div className="project-meta">
            <span className="project-number">01</span>
            <div>
              <span className="mono">
                PERSONAL PROJECT / CREATIVE DEVELOPMENT
              </span>
              <h3>
                The personal space<span className="orange-dot">.</span>
              </h3>
            </div>
            <a
              className="outline-button"
              href={`${GITHUB}/my-portflio12`}
              target="_blank"
              rel="noreferrer"
            >
              View source <Arrow />
            </a>
          </div>
          <div className="portfolio-preview" aria-hidden="true">
            <div className="portfolio-preview-top mono">
              <span>SUSAN PANDIT®</span>
              <span>A SPACE TO EXPLORE.</span>
              <Asterisk />
            </div>
            <div className="mini-heading">
              CURIOUS.
              <br />
              <span>BY DESIGN.</span>
            </div>
            <div className="orbital-art">
              <i />
              <i />
              <i />
              <span />
            </div>
            <div className="portfolio-preview-bottom mono">
              <span>CODE MEETS CHARACTER.</span>
              <span>2026 EDITION ↗</span>
            </div>
          </div>
          <div className="project-footer">
            <p>A little code. A little motion. A lot of me.</p>
            <div className="tags">
              <span>React</span>
              <span>Three.js</span>
              <span>Motion</span>
            </div>
          </div>
        </motion.article>
      </Reveal>
      <Reveal>
        <a
          className="side-project"
          href="https://itsathi.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="mono">ALSO BUILDING</span>
          <span>
            <strong>IT Sathi</strong>
            <span>A digital toolbox for everyday Nepali life.</span>
          </span>
          <Arrow />
        </a>
      </Reveal>
      <Reveal className="github-note">
        <span>More experiments live over here.</span>
        <a href={GITHUB} target="_blank" rel="noreferrer">
          Explore my GitHub <Arrow />
        </a>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact section-shell" id="contact">
      <Reveal className="section-kicker mono">
        <span>05 / LET’S MAKE SOMETHING GOOD</span>
        <span>
          <i className="status-dot" /> START WITH A HELLO
        </span>
      </Reveal>
      <Reveal>
        <p className="contact-pretitle">
          Have a project, a question, or a good idea?
        </p>
        <a className="contact-title" href={CONTACT}>
          LET’S <span className="serif-word">talk.</span>
          <Arrow />
        </a>
      </Reveal>
      <Reveal className="contact-links">
        <a className="email-link" href={CONTACT}>
          {EMAIL}
          <Arrow />
        </a>
        <div className="social-links">
          {[
            ["GitHub", GITHUB],
            ["LinkedIn", "https://www.linkedin.com/in/susan-pandit/"],
            ["Instagram", "https://www.instagram.com/_susan_23_/"],
          ].map(([label, url]) => (
            <a href={url} key={label} target="_blank" rel="noreferrer">
              {label}
              <Arrow />
            </a>
          ))}
        </div>
      </Reveal>
      <div className="footer-bottom mono">
        <a href="#home" className="footer-brand">
          SP<span>®</span>
        </a>
        <span>© {new Date().getFullYear()} SUSAN PANDIT</span>
        <span>BUILT WITH CURIOSITY. जय नेपाल.</span>
        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const animated = !reducedMotion && !paused;
  return (
    <MotionContext.Provider value={animated}>
      <MotionConfig reducedMotion={animated ? "never" : "always"}>
        <div
          className="site-wrapper"
          data-motion={animated ? "playing" : "paused"}
        >
          <ScrollProgress animated={animated} />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navbar
            animated={animated}
            reducedMotion={reducedMotion}
            onToggleMotion={() => setPaused((value) => !value)}
          />
          <main id="main">
            <HomepageHero animated={animated} />
            <Marquee />
            <ScrollStory animated={animated} />
            <About />
            <Services />
            <Projects />
            <Workbench />
          </main>
          <Contact />
        </div>
      </MotionConfig>
    </MotionContext.Provider>
  );
}
