import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseTextAnimationProps } from "./types";

export const ShimmerAnimation = ({
  text,
  className,
  fontSize = 16,
  speed = 2000,
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
        <motion.div
          className={cn("relative inline-block overflow-hidden", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize }}
        >
          <span>{text}</span>
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
            }}
            animate={{
              x: ["-200%", "200%"],
            }}
            transition={{
              duration: speed / 1000,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
