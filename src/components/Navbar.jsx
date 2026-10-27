import React, { useEffect, useRef, useState } from "react";
import { Arrow } from "./Icons.jsx";

const links = [
  ["about", "About"],
  ["expertise", "Expertise"],
  ["projects", "Projects"],
  ["tools", "Tools"],
];
export default function Navbar({ animated, reducedMotion, onToggleMotion }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggle = useRef(null);
  useEffect(() => {
    const sections = document.querySelectorAll(
      "#home, #about, #expertise, #projects, #tools, #contact",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  return (
    <header className="header">
      <a
        className="wordmark"
        href="#home"
        aria-label="Susan Pandit, home"
        onClick={() => setOpen(false)}
      >
        <span className="brand-monogram">
          SP<span>®</span>
        </span>
        <span className="brand-name">
          SUSAN
          <br />
          PANDIT
        </span>
      </a>
      <nav
        className={`nav-links ${open ? "is-open" : ""}`}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          aria-current={active === "contact" ? "location" : undefined}
          onClick={() => setOpen(false)}
        >
          Contact <Arrow />
        </a>
      </nav>
      <div className="nav-actions">
        <button
          className="motion-toggle mono"
          onClick={onToggleMotion}
          disabled={Boolean(reducedMotion)}
          aria-label={
            reducedMotion
              ? "Motion disabled by system preference"
              : animated
                ? "Pause motion"
                : "Play motion"
          }
          aria-pressed={!animated}
          title={
            reducedMotion
              ? "Respects your reduced motion setting"
              : animated
                ? "Pause animations"
                : "Play animations"
          }
        >
          <span aria-hidden="true">{animated ? "Ⅱ" : "▷"}</span>
          <span>MOTION {animated ? "ON" : "OFF"}</span>
        </button>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
