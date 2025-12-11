"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./common/data-table-column-header";
import Link from "next/link";
import { DeleteItemForm } from "@/components/forms";
import { ItemWithRelations } from "@/@types/prisma";
import DateTimeTemplate from "@/components/date-time-template";

export const columns: ColumnDef<ItemWithRelations>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "nameExt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name Ext" />;
    },
  },
  {
    accessorKey: "attr",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Attribute" />;
    },
  },
  {
    accessorKey: "_count.itemCodes",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Codes In" />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "isMaterial",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Is Material" />;
    },
    cell: ({ row }) => {
      const isMaterial = row.getValue("isMaterial");

      return <>{isMaterial === true && <Check className="size-4" />}</>;
    },
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex flex-row items-center justify-end gap-2">
          <Button size={"icon-sm"} variant={"ghost"} asChild>
            <Link href={`/items/${item.id}`}>
              <Eye />
              <span className="sr-only">View</span>
            </Link>
          </Button>
          <Button size={"icon-sm"} variant={"ghost"} asChild>
            <Link href={`/items/edit/${item.id}`}>
              <Pencil />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <DeleteItemForm itemId={String(item.id)} />
        </div>
      );
    },
  },
];
