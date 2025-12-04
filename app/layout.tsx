import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${robotoFlex.className} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader showSpinner={false} height={2} color="#171717" />
        {children}
        {modal}
        <Toaster position={"top-center"} richColors />
      </body>
    </html>
  );
}
