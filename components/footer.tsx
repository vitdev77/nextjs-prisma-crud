import * as React from "react";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn("bg-background border-t border-dashed", className)}>
      <Container>
        <div className="w-full py-4 text-center">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} Midea. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};
