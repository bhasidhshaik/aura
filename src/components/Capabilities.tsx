"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";

// Unsplash License: free to use, no attribution required.
// ?w=400&q=60&auto=format lets Unsplash's CDN serve a pre-resized, compressed version.
const gridImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=60&auto=format",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=60&auto=format",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=60&auto=format",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&q=60&auto=format",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=60&auto=format",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400&q=60&auto=format",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&q=60&auto=format",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=60&auto=format",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=60&auto=format",
];

const videoBgImage =
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=60&auto=format";

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.32, 0.48], [1, 1, 0]);
  const imageY = useTransform(scrollYProgress, [0.32, 0.48], [0, -30]);
  const videoOpacity = useTransform(scrollYProgress, [0.52, 0.68], [0, 1]);
  const videoY = useTransform(scrollYProgress, [0.52, 0.68], [30, 0]);

  const bar0Scale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const bar1Scale = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  const [activeCells, setActiveCells] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const local = Math.min(1, p / 0.45);
    setActiveCells(Math.floor(local * 9));
  });

  return (
    <section ref={sectionRef} className="relative h-[240vh] border-t border-white/10">
      <div className="sticky top-0 h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6 md:px-[6vw] overflow-hidden bg-[#0A0A0C]">
        <div className="absolute left-6 md:left-[6vw] top-[14vh] flex gap-2 z-10">
          <span className="w-7 h-[3px] rounded-full bg-white/10 overflow-hidden relative">
            <motion.i style={{ scaleX: bar0Scale }} className="absolute inset-0 origin-left bg-[#7C5CFC] block" />
          </span>
          <span className="w-7 h-[3px] rounded-full bg-white/10 overflow-hidden relative">
            <motion.i style={{ scaleX: bar1Scale }} className="absolute inset-0 origin-left bg-[#7C5CFC] block" />
          </span>
        </div>

        {/* Visual column */}
        <div className="relative aspect-[1/1.1] rounded-3xl bg-[#121216] overflow-hidden order-1 md:order-none">

          {/* IMAGE GENERATION PANEL — grid of real images, revealing one by one */}
          <motion.div
            style={{ opacity: imageOpacity, y: imageY }}
            className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[2px]"
          >
            {gridImages.map((src, i) => (
              <div key={src} className="relative overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 bg-[#121216] transition-opacity duration-500 ${
                    i < activeCells ? "opacity-0" : "opacity-95"
                  }`}
                />
              </div>
            ))}
          </motion.div>

          {/* VIDEO GENERATION PANEL — one image, with moving scan-light streaks over it */}
          <motion.div style={{ opacity: videoOpacity, y: videoY }} className="absolute inset-0">
            <img
              src={videoBgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col gap-[2px] mix-blend-screen">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-r from-transparent via-[#FF6B4A]/50 to-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{ backgroundPositionX: ["0%", "-200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copy column */}
        <div className="relative h-[260px]">
          <motion.div style={{ opacity: imageOpacity, y: imageY }} className="absolute inset-0 flex flex-col justify-center">
            <span className="text-xs tracking-[0.12em] uppercase text-[#7C5CFC] mb-4">Image generation</span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-[#F5F3EF] mb-4 max-w-[12ch]">
              One line in. A finished frame out.
            </h2>
            <p className="text-[#8A8A93] text-base leading-relaxed max-w-md">
              Type what you're picturing — a mood, a place, a product shot — and Aura renders it in seconds, in the exact style you asked for. Refine with a follow-up line instead of starting over.
            </p>
          </motion.div>

          <motion.div style={{ opacity: videoOpacity, y: videoY }} className="absolute inset-0 flex flex-col justify-center">
            <span className="text-xs tracking-[0.12em] uppercase text-[#FF6B4A] mb-4">Video generation</span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-[#F5F3EF] mb-4 max-w-[12ch]">
              Motion, without a timeline.
            </h2>
            <p className="text-[#8A8A93] text-base leading-relaxed max-w-md">
              Describe the shot, the camera move, the pacing. Aura generates a short clip that holds together frame to frame — ready to drop straight into your edit.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}