import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
    <div className="bg-background relative z-10 flex min-h-svh flex-col">
      <Header />
      <main className="flex flex-1 flex-col justify-center">{children}</main>
      <Footer />
    </div>
  );
}
