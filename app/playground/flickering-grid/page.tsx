"use client";

import { APP_LINK } from "@/app/app-config";
import { FlickeringGrid } from "@/components/flickering-grid";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface GridControls {
  dotSize: number;
  spacing: number;
  opacity: number;
  flickerRate: number;
  speed: number;
}

const DEFAULT_CONTROLS: GridControls = {
  dotSize: 6,
  spacing: 8,
  opacity: 0.3,
  flickerRate: 0.02,
  speed: 300,
};

const FlickeringGridPlayground = () => {
  const [controls, setControls] = useState<GridControls>(DEFAULT_CONTROLS);

  const gridColors = [
    "82, 82, 91",
    "113, 113, 122",
    "212, 212, 216",
    "244, 244, 245",
  ];

  const handleControlChange =
    (key: keyof GridControls) => (value: number[]) => {
      setControls((prev) => ({
        ...prev,
        [key]:
          key === "opacity" || key === "flickerRate"
            ? value[0] / 100
            : value[0],
      }));
    };

  const handleReset = () => {
    setControls(DEFAULT_CONTROLS);
  };

  const controlConfigs = {
    dotSize: { min: 1, max: 20, step: 1, label: "Dot Size", unit: "px" },
    spacing: { min: 4, max: 40, step: 1, label: "Spacing", unit: "px" },
    opacity: { min: 0, max: 100, step: 1, label: "Opacity", unit: "%" },
    flickerRate: {
      min: 0,
      max: 100,
      step: 1,
      label: (
        <div className="text-sm">
          Flicker Rate{" "}
          <span className="text-xs text-muted-foreground">
            chance of dot disappearing
          </span>
        </div>
      ),
      unit: "%",
    },
    speed: {
      min: 50,
      max: 1000,
      step: 50,
      label: "Animation Speed",
      unit: "ms",
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl space-y-8 px-4 py-12 md:py-16 lg:py-24">
        <div className="space-y-2">
          <Link
            href={`${APP_LINK}/playground`}
            className={cn(
              "text-sm text-muted-foreground",
              "hover:text-foreground transition-colors"
            )}
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Flickering Grid Playground
          </h1>
          <p className="text-sm text-muted-foreground">
            Experiment with different parameters to customize the flickering
            grid effect.
          </p>
        </div>

        <div className={cn("w-full h-[295px] p-4 border rounded-lg shadow-sm")}>
          <FlickeringGrid
            {...controls}
            colors={gridColors}
            className="w-full h-full"
          />
        </div>

        <div className="space-y-6">
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset to Default
          </Button>
        </div>

        <div className="grid gap-4">
          {(
            Object.keys(controlConfigs) as Array<keyof typeof controlConfigs>
          ).map((key) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  {controlConfigs[key].label}
                </label>
                <span className="text-sm text-muted-foreground">
                  {key === "opacity" || key === "flickerRate"
                    ? controls[key].toFixed(2)
                    : controls[key]}
                  {controlConfigs[key].unit}
                </span>
              </div>
              <Slider
                value={[
                  key === "opacity" || key === "flickerRate"
                    ? controls[key] * 100
                    : controls[key],
                ]}
                onValueChange={handleControlChange(key)}
                min={controlConfigs[key].min}
                max={controlConfigs[key].max}
                step={controlConfigs[key].step}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FlickeringGridPlayground;
