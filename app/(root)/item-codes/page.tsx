import { Metadata } from "next";
import Link from "next/link";
import { Home, Plus } from "lucide-react";
import { ReturnButton } from "@/components/return-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/table/common/data-table";
import { columns } from "./_table/columns";
import { getItemCodes } from "@/actions/itemCode.actions";

export const metadata: Metadata = {
  title: "Item Codes",
};

export default async function ItemCodes() {
  const data = await getItemCodes();

  return (
    <div className="no-scrollbar w-full overflow-x-hidden pt-6 pb-15">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold">Item Codes</h1>
            <Button asChild>
              <Link href={"/item-codes/new"}>
                <Plus /> New Item Code
              </Link>
            </Button>
          </div>
          <div className="flex h-5 items-center gap-2">
            <ReturnButton btnVariant="link" href="/items" label="Items" />
            <Separator orientation="vertical" />
            <Button variant={"ghost"} size={"icon-sm"} asChild>
              <Link href={"/"}>
                <Home />
                <span className="sr-only">Back to Home</span>
              </Link>
            </Button>
          </div>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
