import { CALL_LINK } from "@/app/app-config";
import Link from "next/link";
import { Button } from "./ui/button";

export function HirePricing() {
  return (
    <Button
      variant="outline"
      asChild
      className="h-auto bg-gray-50 hover:bg-gray-100 p-0"
    >
      <Link
        href={CALL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center mr-1"
      >
        <span className="font-semibold px-3 py-1">
          Hire me for a MVP project
        </span>
        <span className="text-muted-foreground py-1">starting at $2999</span>

        <div className="ml-auto bg-zinc-900 text-white py-1 rounded-lg px-3 shadow-sm">
          Book a call
        </div>
      </Link>
    </Button>
  );
}
