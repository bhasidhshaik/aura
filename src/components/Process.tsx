"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

// Shared coordinate space: 0-100 on both axes, mapped directly to % for
// both the SVG (viewBox="0 0 100 100" + preserveAspectRatio="none") and the
// absolutely-positioned DOM boxes — this is what keeps everything aligned
// regardless of the container's actual pixel width/height.
const PIPE_PATH = "M 40 14 L 54 14 Q 62 14 62 22 L 62 42";

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const progress = useSpring(rawProgress, { stiffness: 110, damping: 22, mass: 0.5 });

  // Prompt text reveal (typing-style, via width mask) — first 30%
  const promptWidth = useTransform(progress, [0, 0.3], ["0%", "100%"]);

  // Pipe draw — middle chunk
  const pipeLength = useTransform(progress, [0.08, 0.75], [0, 1]);

  // Reveal box — last quarter
  const revealOpacity = useTransform(progress, [0.672, 0.796], [0, 1]);
  const revealScale = useTransform(progress, [0.472, 0.96], [0.94, 1]);

  // Traveling glow dot along the same two-segment path
  const dotOpacity = useTransform(progress, [0, 0.06, 0.78, 0.86], [0, 1, 1, 0]);
  const dotXRaw = useTransform(progress, [0.08, 0.45, 0.75], [40, 62, 62]);
  const dotYRaw = useTransform(progress, [0.08, 0.45, 0.75], [14, 14, 42]);
  const dotLeft = useMotionTemplate`${dotXRaw}%`;
  const dotTop = useMotionTemplate`${dotYRaw}%`;

  return (
    <section ref={sectionRef} className="border-t border-white/10 bg-[#0A0A0C] px-6 md:px-[6vw] py-24 md:py-32">
      <div className="text-center mb-16 md:mb-20">
        <span className="text-xs tracking-[0.12em] uppercase text-[#7C5CFC]">How it works</span>
        <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-[#F5F3EF] mt-4">
          From words to motion.
        </h2>
      </div>

      <div className="relative w-full max-w-5xl mx-auto h-[560px] md:h-[720px]">
        {/* Base pipe (dim, always visible — shows the full path) */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d={PIPE_PATH}
            fill="none"
            stroke="rgba(245,243,239,0.08)"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          <motion.path
            d={PIPE_PATH}
            fill="none"
            stroke="#7C5CFC"
            strokeWidth="0.6"
            strokeLinecap="round"
            style={{ pathLength: pipeLength }}
          />
        </svg>

        {/* Traveling glow dot */}
        <motion.div
          style={{ left: dotLeft, top: dotTop, opacity: dotOpacity }}
          className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#7C5CFC]"
        >
          <div className="absolute inset-0 rounded-full bg-[#7C5CFC] blur-md opacity-70" />
        </motion.div>

        {/* Prompt card — top-left, ends where the pipe begins */}
        <div
          className="absolute rounded-2xl border border-white/10 bg-[#121216] px-5 py-4 flex items-center"
          style={{ left: "4%", top: "6%", width: "36%", height: "14%" }}
        >
          <div className="overflow-hidden whitespace-nowrap">
            <motion.p style={{ width: promptWidth }} className="overflow-hidden font-serif italic text-[#F5F3EF] text-sm md:text-base whitespace-nowrap">
              a lighthouse on a rocky coast at dawn
            </motion.p>
          </div>
        </div>

        {/* Reveal box — large, bottom-right, where the pipe ends */}
        <motion.div
          style={{
            left: "18%",
            top: "42%",
            width: "78%",
            height: "56%",
            opacity: revealOpacity,
            scale: revealScale,
          }}
          className="absolute rounded-3xl overflow-hidden bg-[#121216]"
        >
          <video
  src="/video/vid.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
/>
          <div className="absolute bottom-4 left-4 text-xs text-[#F5F3EF] bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            generated scene
          </div>
        </motion.div>
      </div>
    </section>
  );
}