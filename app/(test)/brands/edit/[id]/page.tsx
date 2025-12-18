import { Metadata } from "next";
import { getBrandById } from "@/actions/brand.actions";
import { EditBrandComponent } from "@/components/edit-brand-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit single brand",
};

export default async function EditBrandPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const brand = await getBrandById({ brandId: id });

  if (!brand) {
    notFound();
  }

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6">
      <ReturnButton
        btnVariant={"link"}
        href={"/brands"}
        label="All Brands Page"
      />
      <Card className="max-w-sm">
        <CardContent>
          <EditBrandComponent brand={brand} />
        </CardContent>
      </Card>
    </div>
  );
}
