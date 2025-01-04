import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseTextAnimationProps } from "./types";

export const FadeWordsAnimation = ({
  text,
  className,
  fontSize = 16,
  speed = 400,
  delay = 0,
}: BaseTextAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, text]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <span className={cn("inline-flex flex-wrap gap-x-2", className)}>
          {words.map((word, index) => (
            <motion.span
              key={index}
              style={{ fontSize }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: speed / 1000,
                delay: (index * speed) / 2000,
                ease: "easeOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      )}
    </AnimatePresence>
  );
};
