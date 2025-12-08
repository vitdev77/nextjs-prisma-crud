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
import { DeleteProductForm } from "@/components/forms";
import { ReturnButton } from "@/components/return-button";
import { Separator } from "@/components/ui/separator";
import DateTimeTemplate from "@/components/date-time-template";
import { getProducts } from "@/actions/product.actions";
import {
  underscoreToCapitalizedText,
  underscoreWithHyphensToUppercasedText,
} from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto flex min-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold">Products</h1>
            <Button asChild>
              <Link href={"/products/new"}>
                <Plus /> New product
              </Link>
            </Button>
          </div>
          <div className="flex h-5 items-center gap-2">
            <ReturnButton
              btnVariant="link"
              href="/series"
              label="All Series Page"
              showArrow={false}
            />
            <Separator orientation="vertical" />
            <ReturnButton
              btnVariant="link"
              href="/brands"
              label="All Brands Page"
              showArrow={false}
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
                <TableHead>Model</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Series</TableHead>
                <TableHead>Series Attr</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Display</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={12}
                    className="text-muted-foreground space-y-1 text-center"
                  >
                    <div className="text-sm">No results found</div>
                    <div className="text-xs">
                      It doesn&apos;t look like you have any data in this table.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product, i) => (
                  <TableRow key={product.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.brand.name}</TableCell>
                    <TableCell>{product.series.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.seriesAttr === "NONE"
                        ? ""
                        : underscoreWithHyphensToUppercasedText(
                            product.seriesAttr,
                          )}
                    </TableCell>
                    <TableCell>
                      {underscoreToCapitalizedText(product.color)}
                    </TableCell>
                    <TableCell>
                      {underscoreToCapitalizedText(product.displayPlaced)}
                    </TableCell>
                    <TableCell>{product.businessType}</TableCell>
                    <TableCell>
                      <DateTimeTemplate timestamp={product.createdAt} />
                    </TableCell>
                    <TableCell>
                      {!Boolean(product.isUpdated) ? (
                        <span className="text-muted-foreground/25 text-xs">
                          not yet
                        </span>
                      ) : (
                        <DateTimeTemplate timestamp={product.updatedAt} />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center justify-end gap-2">
                        <Button size={"icon-sm"} variant={"ghost"} asChild>
                          <Link href={`/products/${product.id}`}>
                            <Eye />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button size={"icon-sm"} variant={"ghost"} asChild>
                          <Link href={`/products/edit/${product.id}`}>
                            <Pencil />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <DeleteProductForm productId={String(product.id)} />
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
