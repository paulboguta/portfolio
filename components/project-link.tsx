import Link from "next/link";

export function ProjectLink({
  title,
  description,
  href,
  soon,
}: {
  title: string;
  description: string;
  href: string;
  soon?: boolean;
}) {
  return (
    <Link
      key={title}
      href={soon ? "#" : href}
      target={soon ? undefined : "_blank"}
      rel="noopener"
      className="group flex items-center justify-between hover:bg-gray-50 p-1 rounded ml-3"
    >
      <h3 className="text-base font-medium group-hover:text-primary group-focus-visible:text-primary flex items-center gap-2 m-0">
        <div className="flex gap-2 items-center">
          {title}
          {soon && (
            <span className="flex items-center gap-1 bg-cyan-50 px-1.5 py-0.5 rounded text-xs text-cyan-700 font-normal">
              <div className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
              </div>
              Soon
            </span>
          )}
        </div>
      </h3>
      <p className="text-muted-foreground text-sm m-0 ml-auto text-right">
        {description}
      </p>
    </Link>
  );
}
