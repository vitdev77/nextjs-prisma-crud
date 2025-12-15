"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteItemCode } from "@/actions/itemCode.actions";
import { toast } from "sonner";

export function DeleteItemCodeForm({ itemCodeId }: { itemCodeId: string }) {
  const handleDelete = async () => {
    const res = await deleteItemCode({ itemCodeId });
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Item code successfully deleted");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"icon-sm"} variant={"ghost"}>
          <HugeiconsIcon
            icon={Delete02Icon}
            strokeWidth={2}
            className="text-destructive"
          />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="text-destructive font-medium">this item code</span>{" "}
            from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={"destructive"} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
