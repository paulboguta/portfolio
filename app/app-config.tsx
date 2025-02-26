import { Github, Twitter } from "@/components/icons";
import { Metadata } from "next";

export const METADATA: Metadata = {
  title: "Pawel Boguta",
  description: "Pawel Boguta -Design Engineer",
  icons: {
    icon: "/favicon.svg",
  },
};

export const APP_LINK =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://pawelboguta.com";

export const APP_DOMAIN = "pawelboguta.com";

export const VERSION = "0.2";

export const CALL_LINK = "https://cal.com/codetive/30min";

export const PROJECTS: {
  title: string;
  description: string;
  href: string;
  soon?: boolean;
}[] = [
  {
    title: "Alternative OSS",
    description:
      "Curated directory of open source alternatives to popular tools.",
    href: "https://alternativeoss.com",
    // soon: true,
  },
  {
    title: "Brilliant Paris",
    description: "Directory of best restaurants, hotels and places in Paris.",
    href: "https://brilliantparis.com",
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
  // {
  //   platform: "Work",
  //   handle: "Myno Studio",
  //   href: "https://myno.studio",
  //   icon: Myno,
  // },
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
