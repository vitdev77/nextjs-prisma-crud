"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Edit04Icon, ViewIcon } from "@hugeicons/core-free-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/common/data-table-column-header";
import Link from "next/link";
import { DeleteBrandForm } from "@/components/forms";
import { BrandWithRelations } from "@/@types/prisma";
import DateTimeTemplate from "@/components/date-time-template";
import { cn, truncateMiddle, underscoreWithCommas } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";

export const columns: ColumnDef<BrandWithRelations>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Brand" />;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "_count.products",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Products Count" />;
    },
    cell: ({ row }) => {
      const { _count, id } = row.original;

      return (
        <div className="flex w-full items-center gap-2 text-center">
          <span
            className={cn(
              _count.products === 0 && "text-muted-foreground/50",
              "w-8 text-right",
            )}
          >
            {_count.products}
          </span>{" "}
          <Button
            variant={_count.products === 0 ? "outline" : "secondary"}
            size={"icon-sm"}
            asChild
          >
            <Link href={"/products/new?brandId=" + id}>
              <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
            </Link>
          </Button>
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
      const brand = row.original;

      return (
        <div className="flex flex-row items-center justify-end gap-2">
          <Button size={"icon-sm"} variant={"ghost"} asChild>
            <Link href={`/brands/${brand.id}`}>
              <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
              <span className="sr-only">View</span>
            </Link>
          </Button>
          <Button size={"icon-sm"} variant={"ghost"} asChild>
            <Link href={`/brands/edit/${brand.id}`}>
              <HugeiconsIcon icon={Edit04Icon} strokeWidth={2} />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <DeleteBrandForm brandId={brand.id} />
        </div>
      );
    },
  },
];
