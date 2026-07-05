"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

type Props = {
  frameFolder: string;
  frameCount: number;
  containerRef: React.RefObject<HTMLElement | null>;
};

export default function ImageSequence({ frameFolder, frameCount, containerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, "0");
      img.src = `${frameFolder}/frame_${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount && !cancelled) setLoaded(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => { cancelled = true; };
  }, [frameFolder, frameCount]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[Math.round(index)];
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (canvas.width !== canvas.clientWidth) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded) draw(latest);
  });

  useEffect(() => {
    if (loaded) draw(0);
  }, [loaded]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
    />
  );
}