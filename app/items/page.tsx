import { Metadata } from "next";
import Link from "next/link";
import { Home, Plus } from "lucide-react";
import { ReturnButton } from "@/components/return-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/table/common/data-table";
import { columns } from "./_table/columns";
import { getItems } from "@/actions/item.actions";

export const metadata: Metadata = {
  title: "Items",
};

export default async function Items() {
  const data = await getItems();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto flex min-w-7xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold">Items</h1>
            <Button asChild>
              <Link href={"/items/new"}>
                <Plus /> New item
              </Link>
            </Button>
          </div>
          <div className="flex h-5 items-center gap-2">
            <ReturnButton
              btnVariant="link"
              href="/products"
              label="All Products Page"
            />
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
