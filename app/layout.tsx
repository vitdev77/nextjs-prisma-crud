import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { RefreshPageButton } from "@/components/refresh-page-button";
// import { TopLoaderComponent } from "@/components/top-loader-component";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${robotoFlex.className} ${geistMono.variable} antialiased`}
      >
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
              <ThemeToggle />
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
