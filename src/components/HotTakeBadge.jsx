import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const seeds = [
  "⚡ Spicy by design", "🎯 Opinions shipped", "🌀 Animated convictions", "💎 Polished takes"
];

export default function HotTakeBadge() {
  const ref = useRef(null);
  const [text, setText] = useState(seeds[0]);

  const randomize = () => {
    const s = seeds[Math.floor(Math.random() * seeds.length)];
    setText(s);
  };

  const download = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { backgroundColor: null, scale: 2 });
    const a = document.createElement("a");
    a.download = "susan-hot-take.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  return (
    <div>
      <div
        ref={ref}
        className="relative mx-auto w-full max-w-md rounded-2xl p-6 bg-gradient-to-br from-fuchsia-600 to-indigo-600 text-white text-center shadow-2xl"
      >
        <div className="text-xs uppercase tracking-widest opacity-80">Hot Take Badge</div>
        <div className="mt-2 text-2xl font-semibold">{text}</div>
        <div className="mt-3 text-sm opacity-80">susan.dev • share the spice</div>
      </div>
      <div className="mt-4 flex gap-3 justify-center">
        <button onClick={randomize} className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">Randomize</button>
        <button onClick={download} className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">Download PNG</button>
      </div>
    </div>
  );
}
