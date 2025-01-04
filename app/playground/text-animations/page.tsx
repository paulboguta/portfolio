"use client";

import { APP_LINK } from "@/app/app-config";
import { TextAnimation } from "@/components/text-animations";
import {
  ANIMATION_DEFAULTS,
  AnimationEffect,
} from "@/components/text-animations/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface AnimationControls {
  text: string;
  effect: AnimationEffect;
  speed: number;
  delay: number;
  fontSize: number;
}

const EFFECTS = [
  "typewriter",
  "fade",
  "wave",
  "bounce",
  "flip",
  "flip-blur",
  "multi-line-flip",
  "fade-char-left",
  "shimmer",
  "scramble",
  "fade-words",
  "text-loop",
] as const;

const DEFAULT_CONTROLS: AnimationControls = {
  text: "Hello, World!",
  effect: "typewriter",
  ...ANIMATION_DEFAULTS["typewriter"],
  fontSize: 16,
};

const TextAnimationsPlayground = () => {
  const [controls, setControls] = useState<AnimationControls>(DEFAULT_CONTROLS);
  const [key, setKey] = useState(0);
  const [showBackground, setShowBackground] = useState(true);

  const handleControlChange = (
    key: keyof AnimationControls,
    value: string | number
  ) => {
    setControls((prev) => ({ ...prev, [key]: value }));
    setKey((prev) => prev + 1);
  };

  const handleReset = () => {
    setControls(DEFAULT_CONTROLS);
    setShowBackground(true);
    setKey((prev) => prev + 1);
  };

  const handleEffectChange = useCallback(
    (direction: "next" | "prev") => {
      const currentIndex = EFFECTS.indexOf(controls.effect);
      let newIndex;

      if (direction === "next") {
        newIndex = currentIndex === EFFECTS.length - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex === 0 ? EFFECTS.length - 1 : currentIndex - 1;
      }

      const newEffect = EFFECTS[newIndex];
      setControls((prev) => ({
        ...prev,
        effect: newEffect,
        ...ANIMATION_DEFAULTS[newEffect],
      }));
      setKey((prev) => prev + 1);
    },
    [controls.effect]
  );

  // Get current effect's speed range
  const getSpeedRange = () => {
    switch (controls.effect) {
      case "typewriter":
      case "wave":
      case "bounce":
      case "scramble":
        return { min: 20, max: 200, step: 10 };
      case "fade":
      case "flip":
      case "flip-blur":
      case "fade-words":
        return { min: 200, max: 1200, step: 100 };
      case "shimmer":
        return { min: 1000, max: 4000, step: 100 };
      default:
        return { min: 50, max: 500, step: 10 };
    }
  };

  const speedRange = getSpeedRange();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleEffectChange("prev");
      } else if (e.key === "ArrowRight") {
        handleEffectChange("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEffectChange]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl space-y-8 px-4 py-12 md:py-16 lg:py-24">
        <div className="space-y-2">
          <Link
            href={APP_LINK}
            className={cn(
              "text-sm text-muted-foreground",
              "hover:text-foreground transition-colors"
            )}
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Text Animations
          </h1>
          <p className="text-sm text-muted-foreground">
            12+ text animations to explore
          </p>
        </div>

        <div className="relative w-full h-[295px] p-4 border rounded-lg shadow-sm bg-white overflow-hidden">
          {showBackground && (
            <>
              <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
            </>
          )}
          <div className="absolute top-3 left-3">
            <span className="text-sm font-medium text-muted-foreground capitalize">
              {controls.effect}
            </span>
          </div>
          <div className="relative flex items-center justify-center h-full">
            <TextAnimation key={key} {...controls} className="font-bold" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <Label className="font-medium">Change effect with</Label>
              <div className="flex items-center gap-2">
                <kbd
                  onClick={() => handleEffectChange("prev")}
                  className="px-2 py-1 bg-muted border rounded-md hover:bg-muted/80 cursor-pointer"
                >
                  ←
                </kbd>
                <kbd
                  onClick={() => handleEffectChange("next")}
                  className="px-2 py-1 bg-muted border rounded-md hover:bg-muted/80 cursor-pointer"
                >
                  →
                </kbd>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="show-bg" className="text-sm">
                Background
              </Label>
              <Switch
                id="show-bg"
                checked={showBackground}
                onCheckedChange={setShowBackground}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Text</Label>
            <Input
              value={controls.text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleControlChange("text", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Font Size (px)</Label>
            <Slider
              min={12}
              max={64}
              step={1}
              value={[controls.fontSize]}
              onValueChange={(value) =>
                handleControlChange("fontSize", value[0])
              }
            />
            <div className="text-right text-sm text-muted-foreground">
              {controls.fontSize}px
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Speed (ms){" "}
              <span className="text-xs text-muted-foreground">
                * different scale for certain animations
              </span>
            </Label>
            <Slider
              min={speedRange.min}
              max={speedRange.max}
              step={speedRange.step}
              value={[controls.speed]}
              onValueChange={(value) => handleControlChange("speed", value[0])}
            />
            <div className="text-right text-sm text-muted-foreground">
              {controls.speed}ms
            </div>
          </div>

          <div className="space-y-2">
            <Label>Delay (ms)</Label>
            <Slider
              min={0}
              max={2000}
              step={100}
              value={[controls.delay]}
              onValueChange={(value) => handleControlChange("delay", value[0])}
            />
            <div className="text-right text-sm text-muted-foreground">
              {controls.delay}ms
            </div>
          </div>

          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>
      </div>
    </main>
  );
};

export default TextAnimationsPlayground;
