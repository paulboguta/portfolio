import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseTextAnimationProps } from "./types";

export const FlipAnimation = ({
  text,
  className,
  fontSize = 16,
  speed = 100,
  delay = 0,
}: BaseTextAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, text]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.span
          className={cn("inline-block", className)}
          style={{
            fontSize,
            perspective: "800px",
            transformStyle: "preserve-3d",
          }}
          initial={{
            opacity: 0,
            rotateX: -90,
            y: 20,
          }}
          animate={{
            opacity: 1,
            rotateX: 0,
            y: 0,
          }}
          transition={{
            duration: speed / 1000,
            type: "spring",
            damping: 12,
          }}
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  );
};
