"use client";

import { useEffect, useRef } from "react";

interface FlickeringGridProps {
  dotSize?: number;
  spacing?: number;
  opacity?: number;
  flickerRate?: number;
  colors?: string[];
  className?: string;
  speed?: number;
}

interface DotState {
  currentColor: number[];
  targetColor: number[];
  transitionProgress: number;
}

export const FlickeringGrid = ({
  dotSize = 2,
  spacing = 20,
  opacity = 0.2,
  flickerRate = 0.1,
  colors = ["0, 0, 0"],
  className = "w-full h-full",
  speed = 50,
}: FlickeringGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const dotsRef = useRef<Map<string, DotState>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parsedColors = colors.map((color) => color.split(",").map(Number));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const lerp = (start: number, end: number, t: number) => {
      return start + (end - start) * t;
    };

    const getOrCreateDotState = (key: string): DotState => {
      if (!dotsRef.current.has(key)) {
        const initialColor =
          parsedColors[Math.floor(Math.random() * parsedColors.length)];
        dotsRef.current.set(key, {
          currentColor: [...initialColor],
          targetColor: [...initialColor],
          transitionProgress: 1,
        });
      }
      return dotsRef.current.get(key)!;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= speed) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const { width, height } = container.getBoundingClientRect();

        for (let x = 0; x < width; x += spacing) {
          for (let y = 0; y < height; y += spacing) {
            const key = `${x},${y}`;
            const dotState = getOrCreateDotState(key);

            if (
              Math.random() > flickerRate ||
              dotState.transitionProgress < 1
            ) {
              // Update transition progress
              dotState.transitionProgress = Math.min(
                1,
                dotState.transitionProgress + 0.1
              );

              // If transition is complete, possibly pick new target color
              if (dotState.transitionProgress === 1 && Math.random() > 0.95) {
                dotState.currentColor = [...dotState.targetColor];
                dotState.targetColor = [
                  ...parsedColors[
                    Math.floor(Math.random() * parsedColors.length)
                  ],
                ];
                dotState.transitionProgress = 0;
              }

              // Interpolate current color
              const r = lerp(
                dotState.currentColor[0],
                dotState.targetColor[0],
                dotState.transitionProgress
              );
              const g = lerp(
                dotState.currentColor[1],
                dotState.targetColor[1],
                dotState.transitionProgress
              );
              const b = lerp(
                dotState.currentColor[2],
                dotState.targetColor[2],
                dotState.transitionProgress
              );

              ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(
                g
              )}, ${Math.round(b)}, ${opacity})`;
              ctx.fillRect(x, y, dotSize, dotSize);
            }
          }
        }

        lastUpdateRef.current = timestamp;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      resizeObserver.disconnect();
      dotsRef.current.clear();
    };
  }, [dotSize, spacing, opacity, flickerRate, colors, speed]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas ref={canvasRef} className={className} />
    </div>
  );
};
