"use client";

import { motion } from "framer-motion";

type GalleryItem = {
  label: string;
  image?: string; // real generated still, if you have one
  gradientFrom?: string;
  gradientTo?: string;
};

const items: GalleryItem[] = [
  {
    label: "lighthouse, dawn",
    image: "/frames/lighthouse/frame_001.jpg", // real asset you already have
  },
  { label: "coffee, rainy window", gradientFrom: "#7C5CFC", gradientTo: "#4A3AAF" },
  { label: "forest, drone", gradientFrom: "#FF6B4A", gradientTo: "#7C5CFC" },
  { label: "neon alley, night", gradientFrom: "#4A3AAF", gradientTo: "#0A0A0C" },
  { label: "desert dunes, noon", gradientFrom: "#7C5CFC", gradientTo: "#FF6B4A" },
  { label: "portrait, soft light", gradientFrom: "#8A8A93", gradientTo: "#0A0A0C" },
  { label: "harbor, blue hour", gradientFrom: "#4A3AAF", gradientTo: "#7C5CFC" },
  { label: "mountain ridge, storm", gradientFrom: "#0A0A0C", gradientTo: "#7C5CFC" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="border-t border-white/10 px-6 md:px-[5vw] py-24 md:py-32 bg-[#0A0A0C]">
      <div className="text-center mb-14 md:mb-16">
        <span className="text-xs tracking-[0.12em] uppercase text-[#7C5CFC]">Made with Aura</span>
        <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-[#F5F3EF] mt-4">
          A few things people asked for
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: "easeOut" }}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#121216]"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: `linear-gradient(160deg, ${item.gradientFrom}, ${item.gradientTo})`,
                }}
              />
            )}
            <span className="absolute bottom-3 left-3 text-[11px] text-[#F5F3EF] bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}