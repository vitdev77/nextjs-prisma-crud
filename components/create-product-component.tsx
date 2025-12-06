import { cn } from "@/lib/utils";
import { CreateProductForm } from "@/components/forms";

interface Props {
  className?: string;
  _onSubmit?: VoidFunction;
}

export function CreateProductComponent({ className, _onSubmit }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <CreateProductForm _onSubmit={_onSubmit} />
    </div>
  );
}