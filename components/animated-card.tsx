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
        transition-all duration-300 hover:shadow-lg hover:scale-105
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Card>
  );
}
