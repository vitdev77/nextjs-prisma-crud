"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  value: string;
  tooltip?: string;
}

export function CopyButton({
  value,
  variant = "ghost",
  tooltip = "Copy to Clipboard",
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      if (!value) {
        console.error("No text reference to copy");
        return;
      }

      await navigator.clipboard.writeText(value);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="copy-button"
          data-copied={copied}
          size="icon-sm"
          variant={variant}
          className={className}
          onClick={copyToClipboard}
          {...props}
        >
          <span className="sr-only">Copy</span>
          {copied ? (
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
      <TooltipContent>{copied ? "Copied!" : tooltip}</TooltipContent>
    </Tooltip>
  );
}
