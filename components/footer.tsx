import * as React from "react";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer
      className={cn(
        "bg-background/60 fixed right-0 bottom-0 left-0 border-t border-dashed backdrop-blur-sm",
        className,
      )}
    >
      <Container>
        <div className="w-full py-4 text-center">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} Next MDB. (demo)
          </p>
        </div>
      </Container>
    </footer>
  );
};
