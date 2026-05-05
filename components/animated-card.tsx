"use client";

import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?:
    | "fade-in"
    | "slide-in-left"
    | "slide-in-right"
    | "scale-in"
    | "bounce-in";
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  animation = "fade-in",
}: AnimatedCardProps) {
  return (
    <Card
      className={`
        ${className} 
        animate-${animation}
        transition-shadow duration-300 hover:shadow-md
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Card>
  );
}
