import { ProductWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { EditProductForm } from "@/components/forms";

interface Props {
  product: ProductWithRelations;
  _onSubmit?: VoidFunction;
  className?: string;
}

export function EditProductComponent({ product, _onSubmit, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <EditProductForm product={product} _onSubmit={_onSubmit} />
    </div>
  );
}
