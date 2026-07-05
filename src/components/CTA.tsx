"use client";

import { motion } from "framer-motion";
import FallingDrops from "./FallingDrops";
import MagneticButton from "./MagneticButton";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-[#0A0A0C]">
      <FallingDrops />

      <motion.span
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 text-xs tracking-[0.12em] uppercase text-[#8A8A93] mb-6"
      >
        Start creating
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        className="relative z-10 font-serif text-4xl md:text-6xl font-medium tracking-tight text-[#F5F3EF] leading-[1.05] max-w-2xl mb-10"
      >
        Your next idea is<br />
        <em className="text-[#7C5CFC] not-italic italic">one sentence away.</em>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
        className="relative z-10"
      >
        <MagneticButton href="#" variant="primary">
          Start creating free
        </MagneticButton>
      </motion.div>
    </section>
  );
}