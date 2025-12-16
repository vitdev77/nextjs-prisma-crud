import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { SiteSidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Test Page",
  description: "Test Page Description",
};

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-slot="layout" className="relative z-10 flex min-h-svh flex-col">
      <Header />
      <main className="flex flex-1 flex-col pb-16 sm:pb-0">
        <SidebarProvider className="flex h-auto min-h-min flex-1 flex-col items-start overflow-hidden px-0">
          <div
            data-slot="designer"
            className="3xl:fixed:container flex w-full flex-1 flex-col gap-2 p-6 pt-1 pb-4 [--sidebar-width:--spacing(40)] sm:gap-2 sm:pt-2 md:flex-row md:pb-6 2xl:gap-6"
          >
            <SiteSidebar />
            <div className="relative -mx-1 flex flex-1 flex-col justify-center sm:mx-0">
              <div className="ring-foreground/15 3xl:max-h-300 3xl:max-w-450 relative mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-2xl ring-1">
                {children}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </main>
    </div>
  );
}
