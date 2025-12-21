import { Metadata } from "next";
import { getSeriesById } from "@/actions/series.actions";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { ViewSeriesComponent } from "@/components/view-series-component";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "View Single Series",
};

export default async function BrandPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const series = await getSeriesById({ seriesId: id });

  if (!series) {
    notFound();
  }

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6">
      <ReturnButton
        btnVariant={"link"}
        href={"/series"}
        label="All Series Page"
      />
      <Card className="min-w-xs">
        <CardContent>
          <ViewSeriesComponent series={series} />
        </CardContent>
      </Card>
    </div>
  );
}
