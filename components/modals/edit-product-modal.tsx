"use client";

import * as React from "react";
import { ProductWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { EditProductComponent } from "@/components/edit-product-component";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const EditProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };
  return (
    <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby={undefined}
        className={cn("sm:max-w-[425px]", className)}
      >
        <VisuallyHidden>
          <DialogTitle>{product.name} - Edit</DialogTitle>
        </VisuallyHidden>

        <EditProductComponent product={product} _onSubmit={onCloseModal} />
      </DialogContent>
    </Dialog>
  );
};
