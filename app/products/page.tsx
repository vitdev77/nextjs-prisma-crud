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
import { getProducts } from "@/actions/product.actions";
import { ReturnButton } from "@/components/return-button";
import { Separator } from "@/components/ui/separator";
import { underscoreToCapitalizedText } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="mx-auto flex min-w-4xl items-center justify-between gap-6">
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
            href="/brands"
            label="All Brands Page"
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
              <TableHead className="w-[100px]">Product ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Series</TableHead>
              <TableHead>Color</TableHead>
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
                  colSpan={9}
                  className="text-muted-foreground text-center"
                >
                  no product found
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand.name}</TableCell>
                  <TableCell>{product.series.name}</TableCell>
                  <TableCell>
                    {underscoreToCapitalizedText(product.color)}
                  </TableCell>
                  <TableCell>{product.businessType}</TableCell>
                  <TableCell>
                    {String(product.createdAt.toLocaleDateString())}
                  </TableCell>
                  <TableCell>
                    {String(product.updatedAt.toLocaleDateString())}
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
  );
}
