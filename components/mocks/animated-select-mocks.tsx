import { cn } from "@/lib/utils";
import Image from "next/image";

export const DEMO_MEMBERS = [
  {
    id: 1,
    name: "Sarah Wilson",
    avatar: "/memoji/memoji-1.png",
    role: "Product Designer",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/memoji/memoji-2.png",
    role: "Frontend Developer",
  },
  {
    id: 3,
    name: "Emma Garcia",
    avatar: "/memoji/memoji-3.png",
    role: "Product Manager",
  },
  {
    id: 4,
    name: "James Lee",
    avatar: "/memoji/memoji-4.png",
    role: "Backend Developer",
  },
];

export function TableHead() {
  return (
    <thead>
      <tr className="bg-muted/10">
        <th className="px-2.5 py-1 whitespace-nowrap border-b text-left hidden md:table-cell">
          <span className="text-xs font-medium text-muted-foreground">
            Project
          </span>
        </th>
        <th className="px-2.5 py-1 whitespace-nowrap border-b border-l text-left">
          <span className="text-xs font-medium text-muted-foreground">
            Task
          </span>
        </th>
        <th className="px-2.5 py-1 whitespace-nowrap border-b border-l text-left">
          <span className="text-xs font-medium text-muted-foreground">
            Status
          </span>
        </th>
        <th className="px-2.5 py-1 whitespace-nowrap border-b border-l text-left hidden md:table-cell">
          <span className="text-xs font-medium text-muted-foreground">
            Difficulty
          </span>
        </th>
        <th className="px-2.5 py-1 whitespace-nowrap border-b border-l text-left hidden md:table-cell">
          <span className="text-xs font-medium text-muted-foreground">
            Date
          </span>
        </th>
        <th className="px-2.5 py-1 whitespace-nowrap border-b border-l text-left">
          <span className="text-xs font-medium text-muted-foreground">
            Members
          </span>
        </th>
      </tr>
    </thead>
  );
}

interface StatusProps {
  variant: "inProgress" | "planning" | "done" | "backlog";
  label: string;
}

export function Status({ variant, label }: StatusProps) {
  const styles = {
    inProgress: "bg-amber-50 text-amber-700 border-amber-200",
    planning: "bg-blue-50 text-blue-700 border-blue-200",
    done: "bg-green-50 text-green-700 border-green-200",
    backlog: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
        styles[variant]
      )}
    >
      {label}
    </div>
  );
}

interface DifficultyProps {
  variant: "high" | "medium" | "low";
  label: string;
}

export function Difficulty({ variant, label }: DifficultyProps) {
  const styles = {
    high: "bg-red-50 text-red-700 border-red-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    low: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
        styles[variant]
      )}
    >
      {label}
    </div>
  );
}

interface StaticMembersProps {
  avatars: string[];
}

export function StaticMembers({ avatars }: StaticMembersProps) {
  return (
    <div className="flex items-center gap-1">
      {avatars.map((avatar, index) => (
        <div key={index} className="relative h-6 w-6">
          <Image
            src={avatar}
            alt="Team member"
            fill
            className="object-cover rounded-full"
          />
        </div>
      ))}
    </div>
  );
}

export const MOCK_ROWS = [
  {
    project: "Website",
    task: "Redesign",
    status: { variant: "inProgress" as const, label: "In Progress" },
    difficulty: { variant: "high" as const, label: "High" },
    date: "Dec 19, 2023",
    members: [],
  },
  {
    project: "Backend",
    task: "API Integration",
    status: { variant: "planning" as const, label: "Planning" },
    difficulty: { variant: "medium" as const, label: "Medium" },
    date: "Dec 24, 2023",
    members: ["/memoji/memoji-2.png", "/memoji/memoji-3.png"],
  },
  {
    project: "Research",
    task: "User Testing",
    status: { variant: "done" as const, label: "Done" },
    difficulty: { variant: "low" as const, label: "Low" },
    date: "Dec 28, 2023",
    members: [
      "/memoji/memoji-1.png",
      "/memoji/memoji-4.png",
      "/memoji/memoji-2.png",
    ],
  },
  {
    project: "Docs",
    task: "Documentation",
    status: { variant: "backlog" as const, label: "Backlog" },
    difficulty: { variant: "medium" as const, label: "Medium" },
    date: "Jan 2, 2024",
    members: ["/memoji/memoji-3.png"],
  },
];
