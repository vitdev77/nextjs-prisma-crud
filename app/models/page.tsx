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
import { DeleteModelForm } from "@/components/forms";
import { getModels } from "@/actions/model.actions";
import { ReturnButton } from "@/components/return-button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Models",
};

export default async function Models() {
  const models = await getModels();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="mx-auto flex min-w-4xl items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-4xl font-bold">Models</h1>
          <Button asChild>
            <Link href={"/models/new"}>
              <Plus /> New model
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
              <TableHead className="w-[100px]">Model ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Series</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground text-center"
                >
                  no model found
                </TableCell>
              </TableRow>
            ) : (
              models.map((model) => (
                <TableRow key={model.id}>
                  <TableCell>{model.id}</TableCell>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.brand.name}</TableCell>
                  <TableCell>{model.series.name}</TableCell>
                  <TableCell>
                    {String(model.createdAt.toLocaleDateString())}
                  </TableCell>
                  <TableCell>
                    {String(model.updatedAt.toLocaleDateString())}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center justify-end gap-2">
                      <Button size={"icon-sm"} variant={"ghost"} asChild>
                        <Link href={`/models/${model.id}`}>
                          <Eye />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button size={"icon-sm"} variant={"ghost"} asChild>
                        <Link href={`/models/edit/${model.id}`}>
                          <Pencil />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <DeleteModelForm modelId={String(model.id)} />
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
