"use client";

import * as React from "react";
import { BrandWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ViewBrandComponent } from "@/components/view-brand-component";

interface Props {
  brand: BrandWithRelations;
  className?: string;
}

export const ViewBrandModal: React.FC<Props> = ({ brand, className }) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };
  return (
    <Dialog open={Boolean(brand)} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby={undefined}
        className={cn("sm:max-w-[425px]", className)}
      >
        <VisuallyHidden>
          <DialogTitle>{brand.name} - View</DialogTitle>
        </VisuallyHidden>

        <ViewBrandComponent brand={brand} />
      </DialogContent>
    </Dialog>
  );
};
