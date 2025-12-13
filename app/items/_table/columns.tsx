"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Check, Plus } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/common/data-table-column-header";
import Link from "next/link";
import { DeleteItemForm } from "@/components/forms";
import { ItemWithRelations } from "@/@types/prisma";
import DateTimeTemplate from "@/components/date-time-template";
import { cn, truncateMiddle, underscoreWithCommas } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";

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
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "nameExt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name Ext" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">{row.getValue("nameExt")}</div>
      );
    },
  },
  {
    accessorKey: "attr",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Attribute" />;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("attr")}</div>;
    },
  },
  {
    accessorKey: "greenLogo",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Green Logo" />;
    },
    cell: ({ row }) => {
      const { greenLogo } = row.original;

      return (
        <>
          {greenLogo === "none" ? (
            ""
          ) : (
            <div className="text-muted-foreground text-xs">
              {underscoreWithCommas(greenLogo as string)}
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "_count.itemCodes",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Codes Count" />;
    },
    cell: ({ row }) => {
      const { _count, id } = row.original;

      return (
        <div className="text-center">
          {_count.itemCodes === 0 ? (
            <Link
              href={"/item-codes/new?itemId=" + id}
              className={buttonVariants({
                variant: "outline",
                size: "icon-sm",
              })}
            >
              <Plus className="size-4" />
            </Link>
          ) : (
            _count.itemCodes
          )}
        </div>
      );
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
    accessorKey: "isAssembly",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Is Assembly" />;
    },
    cell: ({ row }) => {
      const isAssembly = row.getValue("isAssembly");

      return <>{isAssembly === true && <Check className="size-4" />}</>;
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
    enableSorting: false,
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
          <DeleteItemForm itemId={item.id} />
        </div>
      );
    },
  },
];
