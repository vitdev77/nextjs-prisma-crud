"use client";

import * as React from "react";
import { ItemCodeWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { EditItemCodeComponent } from "@/components/edit-item-code-component";

interface Props {
  itemCode: ItemCodeWithRelations;
  className?: string;
}

export const EditItemCodeModal: React.FC<Props> = ({ itemCode, className }) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };
  return (
    <Dialog open={Boolean(itemCode)} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby={undefined}
        className={cn("sm:max-w-[425px]", className)}
      >
        <VisuallyHidden>
          <DialogTitle>{itemCode.code} - Edit</DialogTitle>
        </VisuallyHidden>

        <EditItemCodeComponent itemCode={itemCode} _onSubmit={onCloseModal} />
      </DialogContent>
    </Dialog>
  );
};
