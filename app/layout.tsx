import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { TopLoaderComponent } from "@/components/top-loader-component";

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
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopLoaderComponent />
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          {children}
          {modal}
          <Toaster position={"top-center"} richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
