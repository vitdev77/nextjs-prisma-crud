import { BrandWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { ProductsByBrandList } from "@/components/lists/products-by-brand-list";

interface Props {
  brand: BrandWithRelations;
  className?: string;
}

export function ViewBrandComponent({ brand, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="text-2xl font-bold">{brand.name}</h2>
      <ProductsByBrandList brandId={String(brand.id)} />
    </div>
  );
}
