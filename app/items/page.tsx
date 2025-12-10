import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Eye, Home, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { DeleteItemForm } from "@/components/forms";
import { getItems } from "@/actions/item.actions";
import { ReturnButton } from "@/components/return-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import DateTimeTemplate from "@/components/date-time-template";

export const metadata: Metadata = {
  title: "Items",
};

export default async function Items() {
  const items = await getItems();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto flex min-w-4xl flex-col gap-8">
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

        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Name Ext</TableHead>
                <TableHead>Attribute</TableHead>
                <TableHead>Codes In</TableHead>
                <TableHead>Is Material</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-muted-foreground space-y-1 text-center"
                  >
                    <div className="text-sm">No results found</div>
                    <div className="text-xs">
                      It doesn&apos;t look like you have any data in this table.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.nameExt}</TableCell>
                    <TableCell>{item.attr}</TableCell>
                    <TableCell
                      className={cn(
                        item._count.itemCodes === 0 &&
                          "text-muted-foreground/50",
                      )}
                    >
                      {item._count.itemCodes}
                    </TableCell>
                    <TableCell>
                      {item.isMaterial === true && <Check className="size-4" />}
                    </TableCell>
                    <TableCell>
                      <DateTimeTemplate timestamp={item.createdAt} />
                    </TableCell>
                    <TableCell>
                      {!Boolean(item.isUpdated) ? (
                        <span className="text-muted-foreground/25 text-xs">
                          not yet
                        </span>
                      ) : (
                        <DateTimeTemplate timestamp={item.updatedAt} />
                      )}
                    </TableCell>
                    <TableCell>
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
                        <DeleteItemForm
                          itemId={String(item.id)}
                          itemCodesCount={item._count.itemCodes}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
