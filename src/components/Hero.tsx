"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageSequence from "./ImageSequence";
import { scenes } from "@/lib/scenes";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scene = scenes[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0C]">
        <ImageSequence
          frameFolder={scene.frameFolder}
          frameCount={scene.frameCount}
          containerRef={sectionRef}
        />

        {/* Vignettes so text stays legible over the frame sequence */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0A0A0C] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0A0C] to-transparent" />

        {/* UPPER THIRD: eyebrow + headline + subtext */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute top-[10%] inset-x-0 flex flex-col items-center text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xs tracking-[0.15em] uppercase text-[#8A8A93] mb-6"
          >
            Introducing Aura
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-[#F5F3EF] leading-[0.98] mb-5"
          >
            One sentence.<br />
            <span className="text-[#7C5CFC] italic">A whole world.</span>
          </motion.h1>

         
        </motion.div>

        {/* LOWER THIRD: CTAs only, center stays fully clear for the reveal */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute bottom-[9%] inset-x-0 flex flex-col items-center gap-5"
        >
             <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            className="text-[#8A8A93] text-base md:text-lg max-w-md"
          >
            Aura reads what you type and generates a finished image or a moving scene — no timeline, no brushes, no waiting on a render queue.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            className="pointer-events-auto flex gap-4"
          >
            
            <a
              href="#gallery"
              className="rounded-full bg-[#FF6B4A] text-[#0A0A0C] font-semibold px-7 py-3 text-sm hover:-translate-y-0.5 transition-transform"
            >
              See what it makes
            </a>
            <a
              href="#capabilities"
              className="rounded-full border border-white/15 text-[#F5F3EF] font-semibold px-7 py-3 text-sm hover:border-white/30 transition-colors"
            >
              How it works
            </a>
          </motion.div>

          <motion.span
            style={{ opacity: scrollCueOpacity }}
            className="text-[11px] tracking-[0.1em] uppercase text-[#8A8A93]"
          >
            Scroll to see it generate
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}