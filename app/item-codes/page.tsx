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
import {
  ArrowRight,
  Check,
  Eye,
  Home,
  Link2Icon,
  Pencil,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { DeleteItemCodeForm } from "@/components/forms";
import { getItemCodes } from "@/actions/itemCode.actions";
import { ReturnButton } from "@/components/return-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import DateTimeTemplate from "@/components/date-time-template";

export const metadata: Metadata = {
  title: "Item Codes",
};

export default async function ItemCodes() {
  const itemCodes = await getItemCodes();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto flex min-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold">Item Codes</h1>
            <Button asChild>
              <Link href={"/item-codes/new"}>
                <Plus /> New item code
              </Link>
            </Button>
          </div>
          <div className="flex h-5 items-center gap-2">
            <ReturnButton
              btnVariant="link"
              href="/items"
              label="All Items Page"
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
                <TableHead>Code</TableHead>
                <TableHead>Item ID</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itemCodes.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-muted-foreground space-y-1 text-center"
                  >
                    <div className="text-sm">No results found</div>
                    <div className="text-xs">
                      It doesn&apos;t look like you have any data in this table.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                itemCodes.map((itemCode, i) => (
                  <TableRow key={itemCode.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{itemCode.id}</TableCell>
                    <TableCell className="font-medium">
                      {itemCode.code}
                    </TableCell>
                    <TableCell>
                      <Button variant={"link"} size={"sm"} asChild>
                        <Link href={"/items/" + itemCode.itemId}>
                          {itemCode.itemId} <Link2Icon />
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <DateTimeTemplate timestamp={itemCode.createdAt} />
                    </TableCell>
                    <TableCell>
                      {!Boolean(itemCode.isUpdated) ? (
                        <span className="text-muted-foreground/25 text-xs">
                          not yet
                        </span>
                      ) : (
                        <DateTimeTemplate timestamp={itemCode.updatedAt} />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center justify-end gap-2">
                        <Button size={"icon-sm"} variant={"ghost"} asChild>
                          <Link href={`/item-codes/${itemCode.id}`}>
                            <Eye />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button size={"icon-sm"} variant={"ghost"} asChild>
                          <Link href={`/item-codes/edit/${itemCode.id}`}>
                            <Pencil />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <DeleteItemCodeForm itemCodeId={String(itemCode.id)} />
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
