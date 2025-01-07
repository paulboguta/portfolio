import { APP_LINK } from "@/app/app-config";
import { LogoCarousel } from "@/components/logo-carousel";
import { cn } from "@/lib/utils";

import Link from "next/link";

const DEMO_LOGOS = [
  {
    src: "/logo-carousel/vercel.svg",
    alt: "Vercel",
  },
  {
    src: "/logo-carousel/notion.svg",
    alt: "Notion",
  },
  {
    src: "/logo-carousel/linear.svg",
    alt: "Linear",
  },
  {
    src: "/logo-carousel/retool.svg",
    alt: "Retool",
  },
  {
    src: "/logo-carousel/square.svg",
    alt: "Square",
  },
  {
    src: "/logo-carousel/jitter.svg",
    alt: "Jitter",
  },
];

export default function LogoCarouselPlayground() {
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
            Logo Carousel
          </h1>
          <p className="text-sm text-muted-foreground">
            Vertical logo carousel animation
          </p>
        </div>

        <div className="relative w-full h-[295px] p-4 border rounded-lg shadow-sm bg-white overflow-hidden">
          <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
          <div className="relative flex items-center justify-center h-full">
            <LogoCarousel logos={DEMO_LOGOS} logoSize={140} speed={2000} />
          </div>
        </div>
      </div>
    </main>
  );
}
