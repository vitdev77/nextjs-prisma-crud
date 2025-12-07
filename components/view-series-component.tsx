import { SeriesWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { ProductsBySeriesList } from "@/components/lists/products-by-series-list";

interface Props {
  series: SeriesWithRelations;
  className?: string;
}

export function ViewSeriesComponent({ series, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="text-2xl font-bold">{series.name}</h2>
      <ProductsBySeriesList seriesId={String(series.id)} />
    </div>
  );
}
