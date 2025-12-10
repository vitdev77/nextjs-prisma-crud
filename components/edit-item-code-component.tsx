import { ItemCodeWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { EditItemCodeForm } from "@/components/forms";

interface Props {
  itemCode: ItemCodeWithRelations;
  _onSubmit?: VoidFunction;
  className?: string;
}

export function EditItemCodeComponent({
  itemCode,
  _onSubmit,
  className,
}: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <EditItemCodeForm itemCode={itemCode} _onSubmit={_onSubmit} />
    </div>
  );
}
