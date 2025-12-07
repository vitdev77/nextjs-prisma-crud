"use client";

import * as React from "react";
import { SeriesWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { EditSeriesComponent } from "@/components/edit-series-component";

interface Props {
  series: SeriesWithRelations;
  className?: string;
}

export const EditSeriesModal: React.FC<Props> = ({ series, className }) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };
  return (
    <Dialog open={Boolean(series)} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby={undefined}
        className={cn("sm:max-w-[425px]", className)}
      >
        <VisuallyHidden>
          <DialogTitle>{series.name} - Edit</DialogTitle>
        </VisuallyHidden>

        <EditSeriesComponent series={series} _onSubmit={onCloseModal} />
      </DialogContent>
    </Dialog>
  );
};
