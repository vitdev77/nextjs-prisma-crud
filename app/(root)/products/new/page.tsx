import { Metadata } from "next";
import { CreateProductComponent } from "@/components/create-product-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create new product",
};

export default function NewProductPage() {
  return (
    <div className="bg-muted my-8 flex w-full flex-col items-center justify-center gap-6 rounded-2xl">
      <ReturnButton
        btnVariant={"link"}
        href={"/products"}
        label="All Products"
      />
      <Card className="max-w-sm">
        <CardContent>
          <CreateProductComponent />
        </CardContent>
      </Card>
    </div>
  );
}
