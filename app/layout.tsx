import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { fontVariables } from "@/lib/fonts";
import { ModeSwitcher } from "@/components/mode-switcher";
import { RefreshPageButton } from "@/components/refresh-page-button";
// import { TopLoaderComponent } from "@/components/top-loader-component";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Nextjs-Prisma-CRUD",
    absolute: "Nextjs-Prisma-CRUD",
  },
  description: "Nextjs-Prisma-CRUD description",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* TODO: Have hydration error with dark mode select. Solve it later... */}
          {/* <TopLoaderComponent /> */}
          <div className="fixed top-8 right-8 z-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <RefreshPageButton />
              <ModeSwitcher />
            </div>
          </div>
          {children}
          {modal}
          <Toaster position={"top-center"} />
        </ThemeProvider>
      </body>
    </html>
  );
}
