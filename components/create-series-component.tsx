import { cn } from "@/lib/utils";
import { CreateSeriesForm } from "@/components/forms";
import FormExample from "./forms/form-example";

interface Props {
  className?: string;
  _onSubmit?: VoidFunction;
}

export function CreateSeriesComponent({ className, _onSubmit }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <CreateSeriesForm _onSubmit={_onSubmit} />
      <FormExample />
    </div>
  );
}
