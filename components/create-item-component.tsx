import { cn } from "@/lib/utils";
import { CreateItemForm } from "@/components/forms";

interface Props {
  className?: string;
  _onSubmit?: VoidFunction;
}

export function CreateItemComponent({ className, _onSubmit }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <CreateItemForm _onSubmit={_onSubmit} />
    </div>
  );
}
