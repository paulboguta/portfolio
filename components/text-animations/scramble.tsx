import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BaseTextAnimationProps } from "./types";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export const ScrambleAnimation = ({
  text,
  className,
  fontSize = 16,
  speed = 50,
  delay = 0,
}: BaseTextAnimationProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let frame = 0;
    const resolvedChars = new Set<number>();

    const startAnimation = () => {
      setIsAnimating(true);
      interval = setInterval(() => {
        frame++;

        // Build the current display text
        const newText = text
          .split("")
          .map((char, index) => {
            // If this character is already resolved, keep it
            if (resolvedChars.has(index)) return char;

            // Resolve this character if it's time
            if (frame > index * 3) {
              resolvedChars.add(index);
              return char;
            }

            // Otherwise show a random character
            if (char === " ") return " ";
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join("");

        setDisplayText(newText);

        // Stop when all characters are resolved
        if (resolvedChars.size === text.replace(/ /g, "").length) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, speed);
    };

    const timer = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <span className={cn("font-mono", className)} style={{ fontSize }}>
      {displayText || text.replace(/./g, " ")}
    </span>
  );
};
