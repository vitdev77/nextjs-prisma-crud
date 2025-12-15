"use client";

import * as React from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  tooltip = "Copy to Clipboard",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  tooltip?: string;
}) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="copy-button"
          data-copied={hasCopied}
          size="icon-sm"
          variant={variant}
          className={cn("size-7", className)}
          onClick={() => {
            copyToClipboard(value);
            setHasCopied(true);
          }}
          {...props}
        >
          <span className="sr-only">Copy</span>
          {hasCopied ? (
            <HugeiconsIcon
              icon={Tick02Icon}
              strokeWidth={2}
              className="size-4"
            />
          ) : (
            <HugeiconsIcon
              icon={Copy01Icon}
              strokeWidth={2}
              className="size-4"
            />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{hasCopied ? "Copied" : tooltip}</TooltipContent>
    </Tooltip>
  );
}
