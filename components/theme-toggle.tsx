"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { IconBrightnessFilled } from "@tabler/icons-react";
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
      <IconBrightnessFilled />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
