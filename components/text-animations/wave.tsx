import { cn } from "@/lib/utils";
import { BaseTextAnimationProps } from "./types";

export const WaveAnimation = ({
  text,
  className,
  fontSize = 16,
  speed = 100,
  delay = 0,
}: BaseTextAnimationProps) => {
  return (
    <span className={cn("inline-block", className)} style={{ fontSize }}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block animate-wave"
          style={{ animationDelay: `${index * speed + delay}ms` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
