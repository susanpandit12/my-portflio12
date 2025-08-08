import React, { useEffect, useState } from "react";

export default function ParallaxLayers() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      setPos({ x, y });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const t = (depth) => ({
   transform: `translate3d(${pos.x * depth}px, ${pos.y * depth}px, 0)`
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <div style={t(-20)} className="absolute -top-10 -left-10 w-80 h-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div style={t(25)} className="absolute -bottom-16 -right-10 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div style={t(-10)} className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl" />
    </div>
  );
}
