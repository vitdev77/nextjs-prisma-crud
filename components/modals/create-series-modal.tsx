"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CreateSeriesComponent } from "@/components/create-series-component";

interface Props {
  className?: string;
}

export const CreateSeriesModal: React.FC<Props> = ({ className }) => {
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
          <DialogTitle>Create New Series</DialogTitle>
        </VisuallyHidden>
        <CreateSeriesComponent _onSubmit={onCloseModal} />
      </DialogContent>
    </Dialog>
  );
};
