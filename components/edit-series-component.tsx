import { SeriesWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { EditSeriesForm } from "@/components/forms";

interface Props {
  series: SeriesWithRelations;
  _onSubmit?: VoidFunction;
  className?: string;
}

export function EditSeriesComponent({ series, _onSubmit, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <EditSeriesForm series={series} _onSubmit={_onSubmit} />
    </div>
  );
}
