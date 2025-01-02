import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Github } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PROJECTS, SOCIALS, VERSION } from "./app-config";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl space-y-16 px-4 py-12 md:py-16 lg:py-24">
        <div className="space-y-6 pl-4">
          <div>
            <h1 className="text-2xl font-semibold">Pawel Boguta</h1>
            <p className="text-muted-foreground">Design Engineer</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pl-4">
          {SOCIALS.map((link) => (
            <Button
              key={link.platform}
              variant="outline"
              asChild
              className="h-auto bg-gray-50 hover:bg-gray-100 px-3 py-1"
            >
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mr-1"
              >
                <link.icon className="h-4 w-4" />
                <span className="font-semibold">{link.handle}</span>
                <ExternalLink className="h-3 w-3 ml-1 text-muted-foreground" />
              </Link>
            </Button>
          ))}
        </div>

        <section className="pl-4">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I am a design engineer and founder of Myno Studio. I want to make
            developers and designers life easier ◡̈
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium pl-4">Projects</h2>
          <div className="space-y-2">
            {PROJECTS.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener"
                className="group block space-y-2  hover:bg-gray-50 p-4 rounded"
              >
                <h3 className="text-lg font-medium group-hover:text-primary group-focus-visible:text-primary">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">{project.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* IN 0.2 */}
        {/* <section className="space-y-4">
          <h2 className="text-xl font-medium pl-4">Playground</h2>
        </section> */}

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
      </div>
    </main>
  );
}
