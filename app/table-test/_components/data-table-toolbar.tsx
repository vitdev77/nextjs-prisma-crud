"use client";

import { Table } from "@tanstack/react-table";
import { Plus, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./common/data-table-view-options";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // const isFiltered = table.getState().columnFilters.length > 0;
  const isFiltered = table.getState().globalFilter.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <InputGroup className="max-w-sm">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search all columns..."
            // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            // onChange={(event) =>
            //   table.getColumn("name")?.setFilterValue(event.target.value)
            // }
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) =>
              table.setGlobalFilter(String(event.target.value))
            }
          />
          {isFiltered && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                // onClick={() => table.resetColumnFilters()}
                onClick={() => table.setGlobalFilter("")}
              >
                <span className="sr-only">Reset</span>
                <X />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button asChild>
          <Link href={"/items/new"}>
            <Plus /> New Item
          </Link>
        </Button>
      </div>
    </div>
  );
}
