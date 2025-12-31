"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  AlertSquareIcon,
  BorderNone02Icon,
  CheckmarkSquare02Icon,
  Edit04Icon,
  Tick02Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/common/data-table-column-header";
import Link from "next/link";
import { DeleteItemForm } from "@/components/forms";
import { ItemWithRelations } from "@/@types/prisma";
import DateTimeTemplate from "@/components/date-time-template";
import { cn, truncateMiddle, underscoreWithCommas } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";

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
    enableHiding: false,
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
        <div className="flex w-full items-center gap-2 text-center">
          <span
            className={cn(
              _count.itemCodes === 0 && "text-muted-foreground/50",
              "w-8 text-right",
            )}
          >
            {_count.itemCodes}
          </span>{" "}
          <Button
            variant={_count.itemCodes === 0 ? "outline" : "secondary"}
            size={"icon-sm"}
            asChild
          >
            <Link href={"/item-codes/new?itemId=" + id}>
              <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
            </Link>
          </Button>
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

      return (
        <HugeiconsIcon
          icon={isMaterial === false ? BorderNone02Icon : CheckmarkSquare02Icon}
          strokeWidth={1.5}
          className={cn(isMaterial === false && "text-muted-foreground/10")}
        />
      );
    },
  },
  {
    accessorKey: "isAssembly",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Is Assembly" />;
    },
    cell: ({ row }) => {
      const { isAssembly, parts } = row.original;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {isAssembly === false && parts.length !== 0 ? (
            <HugeiconsIcon
              icon={AlertSquareIcon}
              strokeWidth={2}
              className="text-destructive"
            />
          ) : (
            <HugeiconsIcon
              icon={
                isAssembly === false ? BorderNone02Icon : CheckmarkSquare02Icon
              }
              strokeWidth={1.5}
              className={cn(isAssembly === false && "text-muted-foreground/10")}
            />
          )}

          {isAssembly === false && parts.length !== 0 && (
            <Badge variant={"destructive"}>Have parts</Badge>
          )}
        </div>
      );
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
              <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
              <span className="sr-only">View</span>
            </Link>
          </Button>
          <Button size={"icon-sm"} variant={"ghost"} asChild>
            <Link href={`/items/edit/${item.id}`}>
              <HugeiconsIcon icon={Edit04Icon} strokeWidth={2} />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <DeleteItemForm itemId={item.id} />
        </div>
      );
    },
  },
];
