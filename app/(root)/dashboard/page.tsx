import { Metadata } from "next";
import Link from "next/link";
import { getBrands } from "@/actions/brand.actions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const brands = await getBrands();

  return (
    <div className="no-scrollbar w-full overflow-x-hidden pt-6 pb-15">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold">Dashboard</h1>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {brands.map((brand) => (
            <Link
              href={"/products"}
              className="bg-accent/50 text-surface-foreground hover:bg-accent flex min-h-48 w-full flex-col items-center justify-center gap-2 rounded-2xl p-6 transition-colors sm:p-10"
              key={brand.id}
            >
              <p className="text-2xl">{brand.name}</p>
              <div
                className={cn(
                  "text-muted-foreground font-mono",
                  brand._count.products === 0 && "text-muted-foreground/30",
                )}
              >
                ({brand._count.products})
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
