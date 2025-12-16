import { type Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon } from "@hugeicons/core-free-icons";
// import type { SearchParams } from "nuqs/server"

// import { siteConfig } from "@/lib/config"
// import { absoluteUrl } from "@/lib/utils"
import { ModeSwitcher } from "@/components/mode-switcher";
import { SiteConfig } from "@/components/site-config";
// import { BASES } from "@/registry/config"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RefreshPageButton } from "@/components/refresh-page-button";
// import { Customizer } from "@/app/(create)/components/customizer"
// import { CustomizerControls } from "@/app/(create)/components/customizer-controls"
// import { ItemExplorer } from "@/app/(create)/components/item-explorer"
// import { ItemPicker } from "@/app/(create)/components/item-picker"
// import { Preview } from "@/app/(create)/components/preview"
// import { ShareButton } from "@/app/(create)/components/share-button"
// import { ToolbarControls } from "@/app/(create)/components/toolbar-controls"
// import { V0Button } from "@/app/(create)/components/v0-button"
// import { WelcomeDialog } from "@/app/(create)/components/welcome-dialog"
// import { getItemsForBase } from "@/app/(create)/lib/api"
// import { loadDesignSystemSearchParams } from "@/app/(create)/lib/search-params"

export const metadata: Metadata = {
  title: "New Project",
  description:
    "Customize everything. Pick your component library, icons, base color, theme, fonts and create your own version of shadcn/ui.",
};

export default function TestPage() {
  // const params = await loadDesignSystemSearchParams(searchParams)
  // const base = BASES.find((b) => b.name === params.base) ?? BASES[0]

  // const items = await getItemsForBase(base.name)

  // const filteredItems = items
  //   .filter((item) => item !== null)
  //   .map((item) => ({
  //     name: item.name,
  //     title: item.title,
  //     type: item.type,
  //   }))

  return (
    <div
      data-slot="layout"
      className="section-soft relative z-10 flex min-h-svh flex-col"
    >
      <header className="sticky top-0 z-50 w-full">
        <div className="container-wrapper 3xl:fixed:px-0 px-6">
          <div className="3xl:fixed:container flex h-(--header-height) items-center **:data-[slot=separator]:h-4!">
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
                New Project
              </div>
            </div>
            <div className="fixed inset-x-0 bottom-0 ml-auto flex flex-1 items-center gap-2 px-4.5 pb-4 sm:static sm:justify-end sm:p-0 lg:ml-0 xl:justify-center">
              {/* <ItemPicker items={filteredItems} /> */}filteredItems
              {/* <CustomizerControls className="sm:hidden" /> */}
              <Separator
                orientation="vertical"
                className="mr-2 hidden sm:flex xl:hidden"
              />
            </div>
            <div className="ml-auto flex items-center gap-2 sm:ml-0 md:justify-end xl:ml-auto xl:w-1/3">
              <SiteConfig className="3xl:flex hidden" />
              <Separator orientation="vertical" className="3xl:flex hidden" />
              <ModeSwitcher />
              <Separator
                orientation="vertical"
                className="mr-0 -ml-2 sm:ml-0"
              />
              <RefreshPageButton />
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col pb-16 sm:pb-0">
        <SidebarProvider className="flex h-auto min-h-min flex-1 flex-col items-start overflow-hidden px-0">
          <div
            data-slot="designer"
            className="3xl:fixed:container flex w-full flex-1 flex-col gap-2 p-6 pt-1 pb-4 [--sidebar-width:--spacing(40)] sm:gap-2 sm:pt-2 md:flex-row md:pb-6 2xl:gap-6"
          >
            {/* <ItemExplorer base={base.name} items={filteredItems} /> */}
            ItemExplorer
            {/* Preview */}
            <div className="relative -mx-1 flex flex-1 flex-col justify-center sm:mx-0">
              <div className="ring-foreground/15 3xl:max-h-300 3xl:max-w-450 relative mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-2xl p-6 ring-1">
                Preview
              </div>
            </div>
            {/* Preview */}
            {/* <Customizer /> */}
          </div>
        </SidebarProvider>
        {/* <WelcomeDialog /> */}
      </main>
    </div>
  );
}
