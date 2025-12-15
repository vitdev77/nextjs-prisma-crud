import { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Edit04Icon,
  Home01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
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
import Link from "next/link";
import { DeleteBrandForm } from "@/components/forms";
import { getBrands } from "@/actions/brand.actions";
import { ReturnButton } from "@/components/return-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import DateTimeTemplate from "@/components/date-time-template";

export const metadata: Metadata = {
  title: "Brands",
};

export default async function Brands() {
  const brands = await getBrands();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto flex min-w-4xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold">Brands</h1>
            <Button asChild>
              <Link href={"/brands/new"}>
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} /> New Brand
              </Link>
            </Button>
          </div>
          <div className="flex h-5 items-center gap-2">
            <ReturnButton btnVariant="link" href="/products" label="Products" />
            <Separator orientation="vertical" />
            <Button variant={"ghost"} size={"icon-sm"} asChild>
              <Link href={"/"}>
                <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
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
                <TableHead className="w-25">ID</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Products In</TableHead>
                {/* <TableHead>In Series</TableHead> */}
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.length === 0 ? (
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
                brands.map((brand, i) => (
                  <TableRow key={brand.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{brand.id}</TableCell>
                    <TableCell className="font-medium">{brand.name}</TableCell>
                    <TableCell
                      className={cn(
                        brand._count.products === 0 &&
                          "text-muted-foreground/50",
                      )}
                    >
                      {brand._count.products}
                    </TableCell>
                    {/* <TableCell>{brand.series.length}</TableCell> */}
                    <TableCell>
                      <DateTimeTemplate timestamp={brand.createdAt} />
                    </TableCell>
                    <TableCell>
                      {!Boolean(brand.isUpdated) ? (
                        <span className="text-muted-foreground/25 text-xs">
                          not yet
                        </span>
                      ) : (
                        <DateTimeTemplate timestamp={brand.updatedAt} />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center justify-end gap-2">
                        <Button size={"icon-sm"} variant={"ghost"} asChild>
                          <Link href={`/brands/${brand.id}`}>
                            <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button size={"icon-sm"} variant={"ghost"} asChild>
                          <Link href={`/brands/edit/${brand.id}`}>
                            <HugeiconsIcon icon={Edit04Icon} strokeWidth={2} />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <DeleteBrandForm brandId={String(brand.id)} />
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
