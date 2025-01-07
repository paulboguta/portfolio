"use client";

import { APP_LINK } from "@/app/app-config";
import { AnimatedSelect } from "@/components/animated-select";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AnimatedSelectPlayground() {
  return (
    <main className="min-h-[90vh] bg-background">
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
            Animated Dropdown
          </h1>
          <p className="text-sm text-muted-foreground">
            Try to assign members to the first task.
          </p>
        </div>

        <div className="relative w-full h-[295px] overflow-hidden">
          <div className="relative flex items-center justify-start h-full">
            <AnimatedSelect showNames={false} playground />
          </div>
        </div>
      </div>
    </main>
  );
}
