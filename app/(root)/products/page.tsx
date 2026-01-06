import { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Home01Icon } from "@hugeicons/core-free-icons";
import { ReturnButton } from "@/components/return-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/table/common/data-table";
import { columns } from "./_table/columns";
import { getProducts } from "@/actions/product.actions";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Products() {
  const data = await getProducts();

  return (
    <div className="no-scrollbar w-full overflow-x-hidden pt-6 pb-15">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold">Products</h1>
            <Button asChild>
              <Link href={"/products/new"}>
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} /> New Product
              </Link>
            </Button>
          </div>
          <div className="flex h-5 items-center gap-2">
            <ReturnButton
              btnVariant="link"
              href="/brands"
              label="Brands"
              showArrow={false}
            />
            <Separator orientation="vertical" />
            <ReturnButton
              btnVariant="link"
              href="/series"
              label="Series"
              showArrow={false}
            />
            <Separator orientation="vertical" />
            <ReturnButton
              btnVariant="link"
              href="/items"
              label="Items"
              showArrow={false}
            />
            <Separator orientation="vertical" />
            <ReturnButton
              btnVariant="link"
              href="/item-codes"
              label="Item Codes"
              showArrow={false}
            />
            <Separator orientation="vertical" />
            <Button variant={"ghost"} size={"icon-sm"} asChild>
              <Link href={"/"}>
                <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
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
