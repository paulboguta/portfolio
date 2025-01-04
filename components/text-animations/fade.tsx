import { cn } from "@/lib/utils";
import { BaseTextAnimationProps } from "./types";

export const FadeAnimation = ({
  text,
  className,
  fontSize = 16,
  delay = 0,
}: BaseTextAnimationProps) => {
  return (
    <span
      className={cn("inline-block animate-fadeIn opacity-0", className)}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
        fontSize,
      }}
    >
      {text}
    </span>
  );
};
