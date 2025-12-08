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
import { Eye, Home, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { DeleteSeriesForm } from "@/components/forms";
import { getSeries } from "@/actions/series.actions";
import { ReturnButton } from "@/components/return-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import DateTimeTemplate from "@/components/date-time-template";

export const metadata: Metadata = {
  title: "Series",
};

export default async function Series() {
  const series = await getSeries();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto flex min-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold">Series</h1>
            <Button asChild>
              <Link href={"/series/new"}>
                <Plus /> New series
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
                <TableHead>Series</TableHead>
                <TableHead>Products In</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {series.length === 0 ? (
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
                series.map((seriesItem, i) => (
                  <TableRow key={seriesItem.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{seriesItem.id}</TableCell>
                    <TableCell className="font-medium">
                      {seriesItem.name}
                    </TableCell>
                    <TableCell
                      className={cn(
                        seriesItem._count.products === 0 &&
                          "text-muted-foreground/50",
                      )}
                    >
                      {seriesItem._count.products}
                    </TableCell>
                    <TableCell>
                      <DateTimeTemplate timestamp={seriesItem.createdAt} />
                    </TableCell>
                    <TableCell>
                      {!Boolean(seriesItem.isUpdated) ? (
                        <span className="text-muted-foreground/25 text-xs">
                          not yet
                        </span>
                      ) : (
                        <DateTimeTemplate timestamp={seriesItem.updatedAt} />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center justify-end gap-2">
                        <Button size={"icon-sm"} variant={"ghost"} asChild>
                          <Link href={`/series/${seriesItem.id}`}>
                            <Eye />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button size={"icon-sm"} variant={"ghost"} asChild>
                          <Link href={`/series/edit/${seriesItem.id}`}>
                            <Pencil />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <DeleteSeriesForm seriesId={String(seriesItem.id)} />
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
