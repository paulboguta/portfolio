"use client";

import { APP_LINK } from "@/app/app-config";
import Dock from "@/components/dock";
import { FlickeringGrid } from "@/components/flickering-grid";
import { TextAnimation } from "@/components/text-animations";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpenIcon, BrainCircuitIcon } from "lucide-react";
import Link from "next/link";

const DEMOS = [
  {
    title: "Text Animations",
    description: "12+ text animations to explore",
    href: "/playground/text-animations",
    preview: (
      <div className="flex items-center justify-center h-full">
        <TextAnimation
          text="Fancy Text Animations"
          effect="shimmer"
          className="font-bold"
          fontSize={24}
        />
      </div>
    ),
  },
  {
    title: "Flickering Grid",
    description: "Interactive grid with flickering dots",
    href: "/playground/flickering-grid",
    preview: (
      <div className="flex items-center justify-center h-full">
        <FlickeringGrid
          dotSize={8}
          spacing={16}
          opacity={0.8}
          flickerRate={0}
          speed={10}
          colors={[
            "82, 82, 91",
            "113, 113, 122",
            "212, 212, 216",
            "244, 244, 245",
          ]}
          className="w-full h-full"
        />
      </div>
    ),
  },
  {
    title: "Dock",
    description: "macOS-like dock with spring animations",
    href: "/playground/dock",
    preview: (
      <div className="flex items-center justify-center h-full">
        <Dock
          magnification={1.5}
          distance={1}
          iconMagnification={1}
          springConfig={{
            mass: 0.1,
            stiffness: 200,
            damping: 10,
          }}
          items={[
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
              label: "Aperture",
              href: "#",
            },
            {
              icon: <BookOpenIcon size={32} />,
              label: "Book",
              href: "#",
            },
            {
              icon: <BrainCircuitIcon size={32} />,
              label: "Brain",
              href: "#",
            },
          ]}
        />
      </div>
    ),
  },
];

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 md:py-16 lg:py-24">
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
          <h1 className="text-2xl font-semibold tracking-tight">Playground</h1>
          <p className="text-sm text-muted-foreground">
            Collection of interactive demos and experiments
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((demo) => (
            <Link
              key={demo.title}
              href={demo.href}
              className={cn(
                "group relative overflow-hidden rounded-lg border bg-background p-2",
                "hover:border-foreground/20 hover:bg-accent/70 transition-colors"
              )}
            >
              <div className="aspect-[4/3] w-full rounded-md bg-white">
                {demo.preview}
              </div>
              <div className="py-4 px-2">
                <h3 className="font-semibold">{demo.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {demo.description}
                </p>
              </div>
              <div
                className={cn(
                  "absolute bottom-6 right-4",
                  "opacity-0 -translate-x-2",
                  "group-hover:opacity-100 group-hover:translate-x-0",
                  "transition-all duration-200"
                )}
              >
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
