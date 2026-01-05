import * as React from "react";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn("bg-background border-t border-dashed", className)}>
      <div className="container-wrapper border-x border-dashed px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
            &copy; {new Date().getFullYear()} Midea. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
