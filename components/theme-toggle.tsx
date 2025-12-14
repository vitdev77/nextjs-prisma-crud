"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DarkModeIcon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export const ThemeToggle: React.FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      title="Toggle Theme"
    >
      <HugeiconsIcon icon={DarkModeIcon} strokeWidth={2} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
