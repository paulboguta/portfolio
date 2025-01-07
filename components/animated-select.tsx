"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { User2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  DEMO_MEMBERS,
  Difficulty,
  MOCK_ROWS,
  StaticMembers,
  Status,
  TableHead,
} from "./mocks/animated-select-mocks";

interface Member {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

interface AnimatedSelectProps {
  members?: Member[];
  showNames?: boolean;
  playground?: boolean;
}

interface SelectedMemberProps {
  member: Member;
  showNames: boolean;
  onRemove: (id: number) => void;
}

function SelectedMember({ member, showNames, onRemove }: SelectedMemberProps) {
  return (
    <motion.div
      key={member.id}
      layout
      initial={{ width: 0, opacity: 0, scale: 0.6 }}
      animate={{
        width: "fit-content",
        opacity: 1,
        scale: 1,
      }}
      exit={{ width: 0, opacity: 0, scale: 0.6 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
        opacity: { duration: 0.2 },
      }}
      className={cn(
        "flex items-center gap-1 shrink-0",
        showNames ? "bg-accent/50 rounded-full py-0.5" : "rounded-full"
      )}
      style={{ originX: 0 }}
    >
      <motion.div
        layoutId={`avatar-${member.id}`}
        layout
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 28,
        }}
        className={cn("relative shrink-0", showNames ? "h-4 w-4" : "h-6 w-6")}
      >
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          className="object-cover rounded-full"
        />
        <motion.div initial={false} className="absolute inset-0 z-50">
          <Image
            src={member.avatar}
            alt={member.name}
            fill
            className="object-cover rounded-full"
          />
        </motion.div>
      </motion.div>
      {showNames && (
        <>
          <span className="text-xs font-medium whitespace-nowrap">
            {member.name}
          </span>
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 hover:bg-black/5 rounded-full pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(member.id);
            }}
          >
            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
          </button>
        </>
      )}
    </motion.div>
  );
}

interface MemberItemProps {
  member: Member;
  isSelected: boolean;
  isAnimating: boolean;
}

function MemberItem({ member, isSelected, isAnimating }: MemberItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-8 w-8">
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          className={cn(
            "object-cover rounded-full transition-opacity duration-200 delay-200",
            isSelected && "opacity-60"
          )}
        />
        {(!isSelected || isAnimating) && (
          <motion.div
            layoutId={`avatar-${member.id}`}
            layout
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 28,
            }}
            className="absolute inset-0 z-50"
          >
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              className="object-cover rounded-full"
            />
          </motion.div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm">{member.name}</span>
        <span className="text-xs text-muted-foreground">{member.role}</span>
      </div>
    </div>
  );
}

interface MemberSelectProps {
  members: Member[];
  selectedMembers: Member[];
  animatingId: number | null;
  onSelect: (member: Member, e: Event) => void;
}

function MemberSelect({
  members,
  selectedMembers,
  animatingId,
  onSelect,
}: MemberSelectProps) {
  return (
    // Using dropdown here-not select, because I plan to expand this to be a dropdown with more features in the future.
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {selectedMembers.length === 0 ? (
          <div className="flex items-center gap-2 text-muted-foreground h-6 cursor-pointer select-none">
            <User2 className="h-4 w-4" />
            <span className="text-sm">Assign members</span>
          </div>
        ) : (
          <div className="h-6 w-full" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        sideOffset={12}
        align="start"
        alignOffset={-8}
        className="z-40"
      >
        <DropdownMenuLabel>Team members</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {members.map((member, index) => (
          <DropdownMenuItem
            key={member.id}
            index={index}
            onSelect={(e) => onSelect(member, e)}
            className={cn(
              "transition-colors cursor-pointer mb-0.5 hover:bg-muted/50",
              selectedMembers.some((m) => m.id === member.id) && "bg-muted/80"
            )}
          >
            <MemberItem
              member={member}
              isSelected={selectedMembers.some((m) => m.id === member.id)}
              isAnimating={animatingId === member.id}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AnimatedSelect({
  members = DEMO_MEMBERS,
  showNames = true,
  playground = false,
}: AnimatedSelectProps) {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  const handleSelect = (member: Member, e: Event) => {
    e.preventDefault();
    const isSelected = selectedMembers.find((m) => m.id === member.id);

    if (isSelected) {
      setSelectedMembers((prev) => prev.filter((m) => m.id !== member.id));
      return;
    }

    setAnimatingId(member.id);
    setSelectedMembers((prev) => [...prev, member]);
    setTimeout(() => setAnimatingId(null), 300);
  };

  const handleRemove = (memberId: number) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  return (
    <div className="rounded-md border shadow-sm bg-white relative">
      <table className="w-full">
        <TableHead />
        <tbody>
          {MOCK_ROWS.map((row, index) => (
            <tr key={index}>
              <td className="px-2.5 py-1 whitespace-nowrap border-b hidden md:table-cell">
                <span className="font-medium text-sm">{row.project}</span>
              </td>
              <td className="px-2.5 py-1 whitespace-nowrap border-b border-l">
                <span className="font-medium text-sm">{row.task}</span>
              </td>
              <td className="px-2.5 py-1 whitespace-nowrap border-b border-l">
                <Status variant={row.status.variant} label={row.status.label} />
              </td>
              <td className="px-2.5 py-1 whitespace-nowrap border-b border-l hidden md:table-cell">
                <Difficulty
                  variant={row.difficulty.variant}
                  label={row.difficulty.label}
                />
              </td>
              <td className="px-2.5 py-1 whitespace-nowrap border-b border-l hidden md:table-cell">
                <span className="text-sm text-muted-foreground">
                  {row.date}
                </span>
              </td>
              <td
                className={cn(
                  "px-2.5 py-1 h-[40px] border-b border-l",
                  index === 0 ? "" : "w-[160px] min-w-[80px]"
                )}
              >
                {index === 0 ? (
                  <LayoutGroup>
                    <div className="relative cursor-pointer">
                      {selectedMembers.length > 0 && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center gap-1 pointer-events-none">
                          <AnimatePresence>
                            {selectedMembers.map((member) => (
                              <SelectedMember
                                key={member.id}
                                member={member}
                                showNames={showNames}
                                onRemove={handleRemove}
                              />
                            ))}
                          </AnimatePresence>
                        </div>
                      )}

                      <MemberSelect
                        members={members}
                        selectedMembers={selectedMembers}
                        animatingId={animatingId}
                        onSelect={handleSelect}
                      />
                    </div>
                  </LayoutGroup>
                ) : (
                  <StaticMembers avatars={row.members} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {playground && (
        <div className="absolute inset-x-0 -bottom-32 w-[calc(100%+32px)] -left-4 h-64 bg-gradient-to-t from-white via-white to-transparent pointer-events-none" />
      )}
    </div>
  );
}
