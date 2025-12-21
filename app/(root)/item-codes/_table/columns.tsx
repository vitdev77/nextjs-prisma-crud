"use client";

import { ColumnDef } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit04Icon, Link05Icon, ViewIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/common/data-table-column-header";
import Link from "next/link";
import { DeleteItemCodeForm } from "@/components/forms";
import { ItemCodeWithRelations } from "@/@types/prisma";
import DateTimeTemplate from "@/components/date-time-template";
import { truncateMiddle } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";

export const columns: ColumnDef<ItemCodeWithRelations>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID" />;
    },
    cell: ({ row }) => (
      <div className="group flex w-full items-center gap-1">
        <span className="text-muted-foreground font-mono text-xs">
          {truncateMiddle(row.getValue("id"), 8, 3)}
        </span>
        <CopyButton
          value={row.getValue("id")}
          className="pl-2 opacity-0 transition-all duration-300 ease-in-out group-hover:pl-0 group-hover:opacity-100"
        />
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Code" />;
    },
    cell: ({ row }) => {
      const { code } = row.original;

      return <div className="font-medium">{code}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "_count.itemCodes",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Codes In" />;
    },
    cell: ({ row }) => {
      const { itemId } = row.original;

      return (
        <div className="group flex w-full items-center gap-1">
          <Link
            href={"/items/" + itemId}
            className="group text-muted-foreground hover:text-primary flex items-center gap-2 font-mono text-xs underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
          >
            {truncateMiddle(itemId, 8, 3)}{" "}
            <HugeiconsIcon
              icon={Link05Icon}
              strokeWidth={2}
              className="text-muted-foreground/30 group-hover:text-primary size-4"
            />
          </Link>
          <CopyButton
            value={itemId}
            className="pl-2 opacity-0 transition-all duration-300 ease-in-out group-hover:pl-0 group-hover:opacity-100"
          />
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return <DateTimeTemplate timestamp={createdAt} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Updated At" />;
    },
    cell: ({ row }) => {
      const { updatedAt, isUpdated } = row.original;

      return (
        <>
          {isUpdated === false ? (
            <span className="text-muted-foreground/25 text-xs">not yet</span>
          ) : (
            <DateTimeTemplate timestamp={updatedAt} />
          )}
        </>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex flex-row items-center justify-end gap-2">
          <Button size={"icon-sm"} variant={"ghost"} asChild>
            <Link href={`/item-codes/${item.id}`}>
              <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
              <span className="sr-only">View</span>
            </Link>
          </Button>
          <Button size={"icon-sm"} variant={"ghost"} asChild>
            <Link href={`/item-codes/edit/${item.id}`}>
              <HugeiconsIcon icon={Edit04Icon} strokeWidth={2} />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <DeleteItemCodeForm itemCodeId={item.id} />
        </div>
      );
    },
  },
];
