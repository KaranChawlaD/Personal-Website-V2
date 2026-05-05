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
      className="relative overflow-hidden border-primary bg-transparent text-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground"
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
