"use client";

import { useEffect, useRef } from "react";

type Drop = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  color: string;
};

export default function FallingDrops() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const colors = ["#7C5CFC", "#FF6B4A", "#F5F3EF"];
    const drops: Drop[] = [];
    const DROP_COUNT = 45;

    function resize() {
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnDrop(initial = false): Drop {
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -20,
        radius: 1 + Math.random() * 2.2,
        speed: 0.4 + Math.random() * 1.1,
        opacity: 0.15 + Math.random() * 0.45,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }

    resize();
    for (let i = 0; i < DROP_COUNT; i++) drops.push(spawnDrop(true));

    let raf: number;
    function tick() {
      ctx!.clearRect(0, 0, width, height);
      for (const d of drops) {
        d.y += d.speed;
        if (d.y > height + 20) {
          Object.assign(d, spawnDrop());
        }
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx!.fillStyle = d.color;
        ctx!.globalAlpha = d.opacity;
        ctx!.shadowColor = d.color;
        ctx!.shadowBlur = 6;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }
    tick();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  );
}