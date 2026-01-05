import * as React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "container-wrapper 3xl:fixed:px-0 border-x border-dashed px-6",
        className,
      )}
    >
      <div
        className={cn(
          "3xl:fixed:container flex gap-2 **:data-[slot=separator]:h-4!",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
