import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <div className="mb-6 text-8xl font-bold text-gray-200 select-none dark:text-neutral-700">
            404
          </div>
          <h1 className="mb-4 text-4xl font-bold text-balance">
            Oops! Page Not Found
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
          <Button asChild>
            <Link href={"/"}>
              <HugeiconsIcon
                icon={Home01Icon}
                strokeWidth={2}
                className="size-4"
              />{" "}
              Go Back Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
