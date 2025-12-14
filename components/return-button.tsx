import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

interface ReturnButtonProps {
  href: string;
  label: string;
  btnVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  showArrow?: boolean;
}

export const ReturnButton = ({
  href,
  label,
  btnVariant,
  showArrow = true,
}: ReturnButtonProps) => {
  return (
    <Button size="sm" variant={btnVariant} asChild tabIndex={-1}>
      <Link href={href}>
        {showArrow === true && (
          <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} />
        )}{" "}
        {label}
      </Link>
    </Button>
  );
};
