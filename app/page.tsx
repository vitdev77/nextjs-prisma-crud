import { Button } from "@/components/ui/button";
import Link from "next/link";

const nav = [
  { title: "Brands", link: "/brands" },
  { title: "Series", link: "/series" },
  { title: "Products", link: "/products" },
  { title: "Items", link: "/items" },
  { title: "Item Codes", link: "/item-codes" },
  { title: "Test Page", link: "/test" },
  { title: "Test Page 2", link: "/test2" },
];

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Nextjs-Prisma-CRUD</h1>
      <div className="flex flex-wrap gap-2">
        {nav.map((navItem) => (
          <Button key={navItem.title} asChild>
            <Link href={navItem.link}>{navItem.title}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
