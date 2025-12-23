import { Metadata } from "next";
import { getProductById } from "@/actions/product.actions";
import { EditProductComponent } from "@/components/edit-product-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit single product",
};

export default async function EditProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const product = await getProductById({ productId: id });

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-muted my-8 flex w-full flex-col items-center justify-center gap-6 rounded-2xl">
      <ReturnButton
        btnVariant={"link"}
        href={"/products"}
        label="All Products"
      />
      <Card>
        <CardContent className="max-w-sm">
          <EditProductComponent product={product} />
        </CardContent>
      </Card>
    </div>
  );
}
