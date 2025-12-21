import { Metadata } from "next";
import { getBrandById } from "@/actions/brand.actions";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { ViewBrandComponent } from "@/components/view-brand-component";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "View Single Brand",
};

export default async function BrandPage(props: {
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
      <Card className="min-w-xs">
        <CardContent className="max-w-sm">
          <ViewBrandComponent brand={brand} />
        </CardContent>
      </Card>
    </div>
  );
}
