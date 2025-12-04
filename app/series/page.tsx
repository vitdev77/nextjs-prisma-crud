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

export const metadata: Metadata = {
  title: "Series",
};

export default async function Series() {
  const series = await getSeries();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="mx-auto flex min-w-4xl items-center justify-between gap-6">
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
            href="/models"
            label="All Models Page"
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

      <div className="mx-auto min-w-4xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Series ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Models Count</TableHead>
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
                  colSpan={6}
                  className="text-muted-foreground text-center"
                >
                  no series found
                </TableCell>
              </TableRow>
            ) : (
              series.map((seriesItem) => (
                <TableRow key={seriesItem.id}>
                  <TableCell>{seriesItem.id}</TableCell>
                  <TableCell className="font-medium">
                    {seriesItem.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">soon</TableCell>
                  <TableCell>
                    {String(seriesItem.createdAt.toLocaleDateString())}
                  </TableCell>
                  <TableCell>
                    {String(seriesItem.updatedAt.toLocaleDateString())}
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
  );
}
