import { cn } from "@/lib/utils";
import { CreateItemCodeForm } from "@/components/forms";

interface Props {
  className?: string;
  _onSubmit?: VoidFunction;
}

export function CreateItemCodeComponent({ className, _onSubmit }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <CreateItemCodeForm _onSubmit={_onSubmit} />
    </div>
  );
}
