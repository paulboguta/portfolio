"use client";

import { APP_LINK } from "@/app/app-config";
import Dock from "@/components/dock";
import { Github, Twitter } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  Aperture,
  BookOpenIcon,
  BrainCircuitIcon,
  Cat,
  MusicIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ALL_ICONS = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="24"
          height="24"
          rx="99999"
          fill="url(#paint0_linear_79_2)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_79_2"
            x1="8"
            y1="0"
            x2="8"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#A965ED" />
            <stop offset="1" stop-color="#22FF3C" />
          </linearGradient>
        </defs>
      </svg>
    ),
    label: "Profile Gradient",
    href: APP_LINK,
    newTab: false,
  },
  {
    icon: <Aperture className="w-6 h-6 text-zinc-800" />,
    label: "Aperture",
    href: APP_LINK,
    newTab: true,
  },
  {
    icon: <Cat className="w-6 h-6 text-zinc-800" />,
    label: "Cat",
    href: APP_LINK,
    newTab: true,
  },
  {
    icon: <MusicIcon className="w-6 h-6 text-zinc-800" />,
    label: "Music",
    href: APP_LINK,
    newTab: true,
  },
  {
    icon: <Github className="w-6 h-6 text-zinc-800" />,
    label: "Github",
    href: APP_LINK,
    newTab: true,
  },
  {
    icon: <Twitter className="w-6 h-6 text-zinc-800" />,
    label: "Twitter",
    href: APP_LINK,
    newTab: true,
  },
  {
    icon: <BrainCircuitIcon className="w-6 h-6 text-zinc-800" />,
    label: "AI",
    href: APP_LINK,
    newTab: true,
  },
  {
    icon: <BookOpenIcon className="w-6 h-6 text-zinc-800" />,
    label: "Docs",
    href: APP_LINK,
    newTab: true,
  },
];

const PRESETS = {
  smooth: {
    magnification: 1.3,
    distance: 140,
    iconMagnification: 1.4,
    springMass: 0.35,
    springStiffness: 190,
    springDamping: 13,
    iconCount: 5,
  },
  subtle: {
    magnification: 1.4,
    distance: 60,
    iconMagnification: 1.3,
    springMass: 0.2,
    springStiffness: 140,
    springDamping: 18,
    iconCount: 6,
  },
  nightmare: {
    magnification: 3,
    distance: 110,
    iconMagnification: 2.4,
    springMass: 0.5,
    springStiffness: 290,
    springDamping: 5,
    iconCount: 6,
  },
} as const;

interface DockControls {
  magnification: number;
  distance: number;
  iconMagnification: number;
  springMass: number;
  springStiffness: number;
  springDamping: number;
  iconCount: number;
}

const DEFAULT_CONTROLS: DockControls = {
  magnification: 1.6,
  distance: 100,
  iconMagnification: 1.8,
  springMass: 0.1,
  springStiffness: 150,
  springDamping: 12,
  iconCount: 5,
};

const DockPlayground = () => {
  const [controls, setControls] = useState<DockControls>(DEFAULT_CONTROLS);

  const handleControlChange =
    (key: keyof DockControls) => (value: number[]) => {
      setControls((prev) => ({
        ...prev,
        [key]: value[0],
      }));
    };

  const handleReset = () => {
    setControls(DEFAULT_CONTROLS);
  };

  const controlConfigs = {
    magnification: {
      min: 1.2,
      max: 3,
      step: 0.1,
      label: "Magnification",
      unit: "x",
    },
    distance: {
      min: 50,
      max: 200,
      step: 10,
      label: "Distance",
      unit: "px",
    },
    iconMagnification: {
      min: 1,
      max: 2.5,
      step: 0.1,
      label: "Icon Scale",
      unit: "x",
    },
    springMass: {
      min: 0.05,
      max: 0.5,
      step: 0.05,
      label: "Spring Mass",
      unit: "",
    },
    springStiffness: {
      min: 50,
      max: 300,
      step: 10,
      label: "Spring Stiffness",
      unit: "",
    },
    springDamping: {
      min: 5,
      max: 30,
      step: 1,
      label: "Spring Damping",
      unit: "",
    },
    iconCount: {
      min: 3,
      max: 6,
      step: 1,
      label: "Icon Count",
      unit: "",
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
            Dock Playground
          </h1>
          <p className="text-sm text-muted-foreground">
            Experiment with different parameters to customize the dock
            animations.
          </p>
        </div>

        <div className="relative w-full h-[295px] p-4 border rounded-lg shadow-sm bg-white overflow-hidden">
          <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
          <div className="relative flex items-center justify-center h-full">
            <Dock
              items={ALL_ICONS.slice(0, controls.iconCount)}
              magnification={controls.magnification}
              distance={controls.distance}
              iconMagnification={controls.iconMagnification}
              springConfig={{
                mass: controls.springMass,
                stiffness: controls.springStiffness,
                damping: controls.springDamping,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset to Default
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setControls(PRESETS.smooth)}
            >
              Smooth
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setControls(PRESETS.subtle)}
            >
              Subtle
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setControls(PRESETS.nightmare)}
            >
              UX Nightmare 👻
            </Button>
          </div>
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
                  {controls[key]}
                  {controlConfigs[key].unit}
                </span>
              </div>
              <Slider
                value={[controls[key]]}
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

export default DockPlayground;
