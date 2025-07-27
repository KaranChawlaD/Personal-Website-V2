"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className={`
        relative overflow-hidden transition-all duration-300 ease-in-out
        ${
          isDark
            ? "border-dark-primary text-dark-text hover:bg-dark-primary hover:text-dark-background bg-transparent"
            : "border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
        }
      `}
    >
      <div
        className={`transition-transform duration-500 ${
          isDark ? "rotate-180" : "rotate-0"
        }`}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </div>
    </Button>
  );
}
