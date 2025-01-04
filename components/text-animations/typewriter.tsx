import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BaseTextAnimationProps } from "./types";

export const TypewriterAnimation = ({
  text,
  className,
  fontSize = 16,
  speed = 100,
  delay = 0,
}: BaseTextAnimationProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const startAnimation = () => {
      setIsAnimating(true);
      setDisplayText("");
      let index = 0;

      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(intervalId);
          setIsAnimating(false);
        }
      }, speed);
    };

    // eslint-disable-next-line prefer-const
    timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return (
    <span className={cn("inline-block", className)} style={{ fontSize }}>
      {displayText}
      {isAnimating && (
        <span className="ml-0.5 inline-block h-4 w-0.5 animate-blink bg-current" />
      )}
    </span>
  );
};
