import { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Home01Icon } from "@hugeicons/core-free-icons";
import { ReturnButton } from "@/components/return-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/table/common/data-table";
import { columns } from "./_table/columns";
import { getItems } from "@/actions/item.actions";
import { Container } from "@/components/container";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Test Page Items",
};

export default async function TestPageItems() {
  const data = await getItems();

  return (
    <Container className="min-h-[calc(100vh-(57px))]">
      <Sidebar />
      <div className="no-scrollbar w-full overflow-x-hidden py-6 pl-6">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-4xl font-bold">Items</h1>
              <Button asChild>
                <Link href={"/items/new"}>
                  <HugeiconsIcon icon={Add01Icon} strokeWidth={2} /> New Item
                </Link>
              </Button>
            </div>
            <div className="flex h-5 items-center gap-2">
              <ReturnButton
                btnVariant="link"
                href="/products"
                label="Products"
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
    </Container>
  );
}
