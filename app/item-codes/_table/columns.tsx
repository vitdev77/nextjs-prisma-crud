"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Link2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/common/data-table-column-header";
import Link from "next/link";
import { DeleteItemCodeForm } from "@/components/forms";
import { ItemCodeWithRelations } from "@/@types/prisma";
import DateTimeTemplate from "@/components/date-time-template";
import { cn, truncateMiddle } from "@/lib/utils";

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
      <span className="text-muted-foreground font-mono text-xs">
        {truncateMiddle(row.getValue("id"), 8, 3)}
      </span>
    ),
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
        <Link
          href={"/items/" + itemId}
          className="group text-muted-foreground hover:text-primary flex items-center gap-2 font-mono text-xs underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
        >
          {truncateMiddle(itemId, 8, 3)}{" "}
          <Link2Icon className="stroke-muted-foreground/30 group-hover:stroke-primary size-3" />
        </Link>
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
              <Eye />
              <span className="sr-only">View</span>
            </Link>
          </Button>
          <Button size={"icon-sm"} variant={"ghost"} asChild>
            <Link href={`/item-codes/edit/${item.id}`}>
              <Pencil />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <DeleteItemCodeForm itemCodeId={item.id} />
        </div>
      );
    },
  },
];
