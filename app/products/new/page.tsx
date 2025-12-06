import { Metadata } from "next";
import { CreateProductComponent } from "@/components/create-product-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create new post",
};

export default function NewProductPage() {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6">
      <ReturnButton
        btnVariant={"link"}
        href={"/products"}
        label="All Products Page"
      />
      <Card>
        <CardContent>
          <CreateProductComponent />
        </CardContent>
      </Card>
    </div>
  );
}
