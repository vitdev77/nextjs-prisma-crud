"use client";

import * as React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductsByBrandId } from "@/actions/brand.actions";
import { underscoreToCapitalizedText } from "@/lib/utils";

export function ProductsByBrandList({ brandId }: { brandId: string }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<
    { id: number; name: string; color: string; displayPlaced: string }[]
  >([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      setError(null); // Clear any previous errors
      try {
        const response = await getProductsByBrandId({ brandId });
        setProducts(response);
      } catch (err) {
        console.log(err);
        setError(error);
      } finally {
        setLoading(false); // Set loading to false after data fetching completes (success or error)
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on component mount
  return (
    <div className="w-full">
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Table>
          {products.length === 0 ? null : (
            <TableCaption>A list of brand products.</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Display</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground text-center"
                >
                  no products added yet
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, i) => (
                <TableRow key={product.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/products/edit/${product.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {underscoreToCapitalizedText(product.color)}
                  </TableCell>
                  <TableCell>
                    {underscoreToCapitalizedText(product.displayPlaced)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {error && (
        <div role="alert" className="text-destructive text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
