import { cn } from "@/lib/utils";
import { CreateBrandForm } from "@/components/forms";

interface Props {
  className?: string;
  _onSubmit?: VoidFunction;
}

export function CreateBrandComponent({ className, _onSubmit }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <CreateBrandForm _onSubmit={_onSubmit} />
    </div>
  );
}
