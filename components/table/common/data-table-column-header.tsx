import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <button
      className="group flex flex-row items-center gap-2 py-2"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      {column.getIsSorted() === "desc" ? (
        <ChevronUp className="size-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ChevronDown className="size-4" />
      ) : (
        <ChevronsUpDown className="stroke-muted-foreground/30 group-hover:stroke-primary size-4 transition duration-300 ease-in-out" />
      )}
    </button>
  );
}
