"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { RefreshIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function RefreshPageButton() {
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={isPageLoading || isPending || localLoading}
        >
          <HugeiconsIcon
            icon={RefreshIcon}
            strokeWidth={2}
            className={cn(
              isPageLoading || isPending || localLoading ? "animate-spin" : "",
            )}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Refresh Page</p>
      </TooltipContent>
    </Tooltip>
  );
}
