import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon } from "@hugeicons/core-free-icons";
import { Separator } from "@/components/ui/separator";
import { SiteConfig } from "@/components/site-config";
import { ModeSwitcher } from "@/components/mode-switcher";
import { RefreshPageButton } from "@/components/refresh-page-button";
import { Container } from "@/components/container";

export function Header() {
  return (
    <header className="bg-background/60 sticky top-0 z-50 w-full border-b border-dashed backdrop-blur-sm">
      <Container>
        <div className="flex items-center xl:w-1/3">
          <Button
            asChild
            variant="outline"
            size="icon-sm"
            className="rounded-lg shadow-none"
          >
            <Link href="/">
              <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
            </Link>
          </Button>
          <Separator
            orientation="vertical"
            className="mx-2 hidden sm:mx-4 lg:flex"
          />
          <div className="text-muted-foreground hidden text-sm font-medium lg:flex">
            Nextjs-Prisma-CRUD
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0 ml-auto flex flex-1 items-center gap-2 px-4.5 pb-4 sm:static sm:justify-end sm:p-0 lg:ml-0 xl:justify-center">
          filteredItems
          <Separator
            orientation="vertical"
            className="mr-2 hidden sm:flex xl:hidden"
          />
        </div>
        <div className="ml-auto flex items-center gap-2 sm:ml-0 md:justify-end xl:ml-auto xl:w-1/3">
          <SiteConfig className="3xl:flex hidden" />
          <Separator orientation="vertical" className="3xl:flex hidden" />
          <ModeSwitcher />
          <Separator orientation="vertical" className="mr-0 -ml-2 sm:ml-0" />
          <RefreshPageButton />
        </div>
      </Container>
    </header>
  );
}
