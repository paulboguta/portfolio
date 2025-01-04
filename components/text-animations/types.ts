export interface BaseTextAnimationProps {
  text: string;
  className?: string;
  fontSize?: number;
  speed?: number;
  delay?: number;
}

export type AnimationEffect =
  | "typewriter"
  | "fade"
  | "wave"
  | "bounce"
  | "flip"
  | "flip-blur"
  | "multi-line-flip"
  | "fade-char-left"
  | "shimmer"
  | "scramble"
  | "fade-words"
  | "text-loop";

export const ANIMATION_DEFAULTS: Record<
  AnimationEffect,
  { speed: number; delay: number }
> = {
  typewriter: { speed: 100, delay: 0 },
  fade: { speed: 400, delay: 0 },
  wave: { speed: 100, delay: 0 },
  bounce: { speed: 100, delay: 0 },
  flip: { speed: 600, delay: 0 },
  "flip-blur": { speed: 800, delay: 0 },
  "multi-line-flip": { speed: 600, delay: 0 },
  "fade-char-left": { speed: 50, delay: 0 },
  shimmer: { speed: 2000, delay: 0 },
  scramble: { speed: 50, delay: 0 },
  "fade-words": { speed: 400, delay: 0 },
  "text-loop": { speed: 1500, delay: 0 },
};
