"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CreateItemComponent } from "@/components/create-item-component";

interface Props {
  className?: string;
}

export const CreateItemModal: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };
  return (
    <Dialog open={true} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby={undefined}
        className={cn("sm:max-w-[425px]", className)}
      >
        <VisuallyHidden>
          <DialogTitle>Create New Item</DialogTitle>
        </VisuallyHidden>
        <CreateItemComponent _onSubmit={onCloseModal} />
      </DialogContent>
    </Dialog>
  );
};
