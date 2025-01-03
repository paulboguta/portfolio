import { Github } from "@/components/icons";

import Link from "next/link";
import React from "react";
import { VERSION } from "../app-config";

const PlaygroundLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}

      <section className="space-y-4 pb-4">
        <div className="flex items-center justify-center gap-1.5 pt-8">
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          </div>
          <span className="text-xs text-muted-foreground">ver {VERSION}</span>
          <Link
            href="https://github.com/paulboguta/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground ml-1"
          >
            <Github className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PlaygroundLayout;
