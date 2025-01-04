import { BounceAnimation } from "./bounce";
import { FadeAnimation } from "./fade";
import { FadeCharLeftAnimation } from "./fade-char-left";
import { FadeWordsAnimation } from "./fade-words";
import { FlipAnimation } from "./flip";
import { FlipBlurAnimation } from "./flip-blur";
import { MultiLineFlipAnimation } from "./multi-line-flip";
import { ScrambleAnimation } from "./scramble";
import { ShimmerAnimation } from "./shimmer";
import { TextLoopAnimation } from "./text-loop";
import { AnimationEffect, BaseTextAnimationProps } from "./types";
import { TypewriterAnimation } from "./typewriter";
import { WaveAnimation } from "./wave";

export interface TextAnimationProps extends BaseTextAnimationProps {
  effect: AnimationEffect;
}

export const TextAnimation = ({ effect, ...props }: TextAnimationProps) => {
  switch (effect) {
    case "typewriter":
      return <TypewriterAnimation {...props} />;
    case "fade":
      return <FadeAnimation {...props} />;
    case "wave":
      return <WaveAnimation {...props} />;
    case "bounce":
      return <BounceAnimation {...props} />;
    case "flip":
      return <FlipAnimation {...props} />;
    case "flip-blur":
      return <FlipBlurAnimation {...props} />;
    case "multi-line-flip":
      return <MultiLineFlipAnimation {...props} />;
    case "fade-char-left":
      return <FadeCharLeftAnimation {...props} />;
    case "shimmer":
      return <ShimmerAnimation {...props} />;
    case "scramble":
      return <ScrambleAnimation {...props} />;
    case "fade-words":
      return <FadeWordsAnimation {...props} />;
    case "text-loop":
      return <TextLoopAnimation {...props} />;
    default:
      return null;
  }
};
