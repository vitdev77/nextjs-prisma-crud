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
import { DeleteProductForm } from "@/components/forms";
import { ReturnButton } from "@/components/return-button";
import { Separator } from "@/components/ui/separator";
import DateTimeTemplate from "@/components/date-time-template";
import { countProducts, getProducts } from "@/actions/product.actions";
import {
  underscoreToCapitalizedText,
  underscoreWithHyphensToUppercasedText,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import PaginationComponent from "@/components/pagination";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  // Pagination settings
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 5;

  const where = {
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  // const [totalCount, items] = await Promise.all([
  //   prisma.product.count({ where }),
  //   prisma.product.findMany({
  //     where,
  //     include: {
  //       series: true,
  //       brand: true,
  //     },
  //     orderBy: { createdAt: "desc" },
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //   }),
  // ]);

  const skip = (page - 1) * pageSize;

  const totalCount = await countProducts({ where });

  const products = await getProducts({
    where,
    skip,
    take: pageSize,
  });

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto flex min-w-7xl flex-col gap-8">
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
              href="/series"
              label="Series"
              showArrow={false}
            />
            <Separator orientation="vertical" />
            <ReturnButton
              btnVariant="link"
              href="/brands"
              label="Brands"
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

        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead className="w-25">ID</TableHead>
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
                      {product.seriesAttr === "NONE" ? (
                        ""
                      ) : (
                        <Badge>
                          {underscoreWithHyphensToUppercasedText(
                            product.seriesAttr,
                          )}
                        </Badge>
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
                            <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button size={"icon-sm"} variant={"ghost"} asChild>
                          <Link href={`/products/edit/${product.id}`}>
                            <HugeiconsIcon icon={Edit04Icon} strokeWidth={2} />
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

        {totalPages > 1 && (
          <PaginationComponent
            curentPage={page}
            totalPages={totalPages}
            baseUrl={"/products"}
            searchParams={{
              q,
              pageSize: String(pageSize),
            }}
          />
        )}
      </div>
    </div>
  );
}
