import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseTextAnimationProps } from "./types";

export const FadeCharLeftAnimation = ({
  text,
  className,
  fontSize = 16,
  speed = 50,
  delay = 0,
}: BaseTextAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const characters = text.split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, text]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <span className={cn("inline-flex", className)}>
          {characters.map((char, index) => (
            <motion.span
              key={index}
              style={{ fontSize }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: speed / 1000,
                delay: (index * speed) / 1000,
                ease: "easeOut",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      )}
    </AnimatePresence>
  );
};
