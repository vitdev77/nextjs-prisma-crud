"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
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
import { DeleteProductForm } from "@/components/forms";
import {
  ProductWithRelations,
  BrandWithRelations,
  SeriesWithRelations,
} from "@/@types/prisma";
import DateTimeTemplate from "@/components/date-time-template";
import {
  cn,
  truncateMiddle,
  underscoreToCapitalizedText,
  underscoreWithCommas,
  underscoreWithHyphensToUppercasedText,
} from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<ProductWithRelations>[] = [
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
      return <DataTableColumnHeader column={column} title="Model" />;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "brandId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Brand" />;
    },
    cell: ({ row }) => {
      const productByBrand = row.original.brand.name;

      return <>{productByBrand}</>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "seriesId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Series" />;
    },
    cell: ({ row }) => {
      const productBySeries = row.original.series.name;

      return <>{productBySeries}</>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "seriesAttr",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Series Attribute" />;
    },
    cell: ({ row }) => {
      const productSeriesAttr = row.original.seriesAttr;

      return (
        <>
          {productSeriesAttr === "NONE" ? (
            ""
          ) : (
            <Badge>
              {underscoreWithHyphensToUppercasedText(productSeriesAttr)}
            </Badge>
          )}
        </>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Color" />;
    },
    cell: ({ row }) => {
      return <>{underscoreToCapitalizedText(row.getValue("color"))}</>;
    },
  },
  {
    accessorKey: "displayPlaced",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Display" />;
    },
    cell: ({ row }) => {
      return <>{underscoreToCapitalizedText(row.getValue("displayPlaced"))}</>;
    },
  },
  {
    accessorKey: "businessType",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Business Type" />;
    },
    cell: ({ row }) => {
      return <>{row.getValue("businessType")}</>;
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
      const product = row.original;

      return (
        <div className="flex flex-row items-center justify-end gap-2">
          <Button size={"icon-sm"} variant={"ghost"} asChild>
            <Link href={`/products/${product.id}`}>
              <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
              <span className="sr-only">View</span>
            </Link>
          </Button>
          <Button size={"icon-sm"} variant={"ghost"} asChild>
            <Link href={`/products/edit/${product.id}`}>
              <HugeiconsIcon icon={Edit04Icon} strokeWidth={2} />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <DeleteProductForm productId={product.id} />
        </div>
      );
    },
  },
];
