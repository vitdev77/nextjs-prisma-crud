import { ItemWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { EditItemForm } from "@/components/forms";

interface Props {
  item: ItemWithRelations;
  _onSubmit?: VoidFunction;
  className?: string;
}

export function EditItemComponent({ item, _onSubmit, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <EditItemForm item={item} _onSubmit={_onSubmit} />
    </div>
  );
}
