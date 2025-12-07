import { BrandWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { EditBrandForm } from "@/components/forms";

interface Props {
  brand: BrandWithRelations;
  _onSubmit?: VoidFunction;
  className?: string;
}

export function EditBrandComponent({ brand, _onSubmit, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <EditBrandForm brand={brand} _onSubmit={_onSubmit} />
    </div>
  );
}
