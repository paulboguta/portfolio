"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface SpringConfig {
  mass: number;
  stiffness: number;
  damping: number;
}

interface DockItemProps {
  icon: React.ReactNode;
  mouseX: number;
  magnification: number;
  distance: number;
  iconMagnification: number;
  springConfig: SpringConfig;
  href: string;
  newTab?: boolean;
}

const DockItem = ({
  icon,
  mouseX,
  magnification,
  distance,
  iconMagnification,
  springConfig,
  href,
  newTab,
}: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const distanceFromMouse = useMotionValue(Infinity);

  const width = useSpring(
    useTransform(
      distanceFromMouse,
      [-distance, 0, distance],
      [48, 48 * magnification, 48]
    ),
    springConfig
  );

  const translateY = useTransform(
    width,
    [48, 48 * magnification],
    [0, -48 / 2]
  );

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const distance = mouseX - (rect.left + rect.width / 2);
    distanceFromMouse.set(mouseX === 0 ? Infinity : distance);
  }, [mouseX, distanceFromMouse]);

  const content = (
    <motion.div
      className="flex items-center justify-center bg-zinc-50 rounded-full shadow-sm border  origin-bottom"
      style={{
        width,
        height: width,
        y: translateY,
      }}
    >
      <motion.div
        style={{
          scale: useTransform(
            width,
            [48, 48 * magnification],
            [1, iconMagnification]
          ),
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      ref={ref}
      className="relative flex items-end justify-center"
      style={{ width }}
    >
      {newTab ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          {content}
        </a>
      ) : (
        <Link href={href} className="cursor-pointer">
          {content}
        </Link>
      )}
    </motion.div>
  );
};

interface DockProps {
  items: Array<{
    icon: React.ReactNode;
    label: string;
    href: string;
    newTab?: boolean;
  }>;
  className?: string;
  magnification?: number;
  distance?: number;
  iconMagnification?: number;
  springConfig?: SpringConfig;
}

const Dock = ({
  items,
  className,
  magnification = 2,
  distance = 100,
  iconMagnification = 1.8,
  springConfig = {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  },
}: DockProps) => {
  const [mouseX, setMouseX] = useState(0);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
  };

  return (
    <motion.div
      ref={dockRef}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "flex gap-4 px-4 rounded-3xl bg-white/80 shadow-lg border border-zinc-200/50",
        "h-20 items-end pb-4",
        className
      )}
      style={{ minWidth: "fit-content" }}
    >
      {items.map((item, index) => (
        <DockItem
          key={index}
          icon={item.icon}
          mouseX={mouseX}
          magnification={magnification}
          distance={distance}
          iconMagnification={iconMagnification}
          springConfig={springConfig}
          href={item.href}
          newTab={item.newTab}
        />
      ))}
    </motion.div>
  );
};

export default Dock;
