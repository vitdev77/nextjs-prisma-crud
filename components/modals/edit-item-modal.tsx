"use client";

import * as React from "react";
import { ItemWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { EditItemComponent } from "@/components/edit-item-component";

interface Props {
  item: ItemWithRelations;
  className?: string;
}

export const EditItemModal: React.FC<Props> = ({ item, className }) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };
  return (
    <Dialog open={Boolean(item)} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby={undefined}
        className={cn("sm:max-w-[425px]", className)}
      >
        <VisuallyHidden>
          <DialogTitle>{item.name} - Edit</DialogTitle>
        </VisuallyHidden>

        <EditItemComponent item={item} _onSubmit={onCloseModal} />
      </DialogContent>
    </Dialog>
  );
};
