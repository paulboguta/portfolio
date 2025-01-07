"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoCarouselProps {
  logos: {
    src: string;
    alt: string;
  }[];
  className?: string;
  speed?: number;
  delay?: number;
  logoSize?: number;
}

const variants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export const LogoCarousel = ({
  logos,
  className,
  speed = 2000,
  delay = 0,
  logoSize = 40,
}: LogoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((current) => (current + 1) % logos.length);
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [speed, delay, logos.length]);

  return (
    <div className={cn("inline-block", className)}>
      <div className="h-fit flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute"
          >
            <Image
              src={logos[currentIndex].src}
              alt={logos[currentIndex].alt}
              width={logoSize}
              height={logoSize}
              className="object-contain dark:invert"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
