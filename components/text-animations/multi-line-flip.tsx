import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseTextAnimationProps } from "./types";

export const MultiLineFlipAnimation = ({
  text,
  className,
  fontSize = 16,
  speed = 600,
  delay = 0,
}: BaseTextAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const lines = Array(3).fill(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, text]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <div className={cn("flex flex-col items-center gap-2", className)}>
          {lines.map((line, index) => (
            <motion.div
              key={index}
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
                delay: (index * speed) / 3000,
                type: "spring",
                damping: 12,
              }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};
