import { cn } from "@/lib/utils";
import { CreateSeriesForm } from "@/components/forms";

interface Props {
  className?: string;
  _onSubmit?: VoidFunction;
}

export function CreateSeriesComponent({ className, _onSubmit }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <CreateSeriesForm _onSubmit={_onSubmit} />
    </div>
  );
}
