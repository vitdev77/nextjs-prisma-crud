"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface RefreshPageButtonProps {
  btnSize?: "icon" | "icon-sm" | "icon-lg";
  btnVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function RefreshPageButton({
  btnSize,
  btnVariant,
}: RefreshPageButtonProps) {
  const [isPending, startTransition] = React.useTransition();
  const [localLoading, setLocalLoading] = React.useState(false); // Optional: for specific button actions
  const [isPageLoading, setIsPageLoading] = React.useState(true);

  const router = useRouter();

  React.useEffect(() => {
    setIsPageLoading(false);
  }, []);

  const handleRefresh = () => {
    setLocalLoading(true); // Set local loading for this specific action
    startTransition(() => {
      router.refresh(); // Or router.push('/some-path');
      setLocalLoading(false); // Reset local loading after transition starts
    });
  };

  return (
    <Button
      variant={btnVariant || "ghost"}
      size={btnSize || "icon"}
      onClick={handleRefresh}
      disabled={isPageLoading || isPending || localLoading}
      title="Refresh Page"
    >
      <RefreshCw
        className={cn(
          isPageLoading || isPending || localLoading ? "animate-spin" : "",
        )}
      />
    </Button>
  );
}
