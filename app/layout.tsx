import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { fontVariables } from "@/lib/fonts";
// import { TopLoaderComponent } from "@/components/top-loader-component";
import "@/styles/globals.css";
import { LayoutProvider } from "@/hooks/use-layout";

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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="overscroll-none antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]">
        <LayoutProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* TODO: Have hydration error with dark mode select. Solve it later... */}
            {/* <TopLoaderComponent /> */}
            {children}
            {modal}
            <Toaster />
          </ThemeProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
