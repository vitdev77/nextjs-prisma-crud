"use client";

import { revalidateMyPath } from "@/actions/common.actions";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface RevalidateButtonProps {
  path: string;
  title?: string;
}

export function RevalidatePathButton({ path, title }: RevalidateButtonProps) {
  const handleClick = async () => {
    await revalidateMyPath(path);
  };

  return (
    <Button
      variant={"ghost"}
      size={"icon-sm"}
      onClick={handleClick}
      title={title}
    >
      <RefreshCw />
    </Button>
  );
}
