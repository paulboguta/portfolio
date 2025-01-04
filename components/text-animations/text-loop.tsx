import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseTextAnimationProps } from "./types";

const LOOP_LINES = [
  "Hi, how can I help?",
  "Let's draw basic UI",
  "Then make a logo",
];

const variants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export const TextLoopAnimation = ({
  className,
  fontSize = 16,
  speed = 2000,
  delay = 0,
}: Omit<BaseTextAnimationProps, "text">) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Convert speed from ms to seconds for the interval
    const intervalSeconds = speed / 1000;

    // Initial delay then start the interval
    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((current) => (current + 1) % LOOP_LINES.length);
      }, intervalSeconds * 1000);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [speed, delay]);

  return (
    <div className={cn("relative inline-block", className)}>
      <div className="relative w-[500px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            style={{ fontSize }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {LOOP_LINES[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
