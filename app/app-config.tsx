import { Github, Myno, Twitter } from "@/components/icons";
import { Metadata } from "next";

export const METADATA: Metadata = {
  title: "Pawel Boguta",
  description: "Pawel Boguta -Design Engineer",
  icons: {
    icon: "/favicon.svg",
  },
};

export const APP_LINK = "https://pawelboguta.com";
export const APP_DOMAIN = "pawelboguta.com";

export const VERSION = "0.1";

export const PROJECTS = [
  {
    title: "uikits",
    description: "TailwindCSS components based on shadcn/ui.",
    href: "https://uikits.io",
  },
  {
    title: "Herrro",
    description: "Curated library of the best hero sections on the web.",
    href: "https://herrro.com",
  },
  {
    title: "Codetive",
    description: "Interactive learning platform for frontend developers.",
    href: "https://codetive.dev",
  },
];

export const SOCIALS = [
  {
    platform: "Work",
    handle: "Myno Studio",
    href: "https://myno.studio",
    icon: Myno,
  },
  {
    platform: "Twitter",
    handle: "@pawelboguta",
    href: "https://twitter.com/PawelBoguta",
    icon: Twitter,
  },
  {
    platform: "Github",
    handle: "@paulboguta",
    href: "https://github.com/paulboguta",
    icon: Github,
  },
];
