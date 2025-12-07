import { notFound } from "next/navigation";
import { getSeriesById } from "@/actions/series.actions";
import { ViewSeriesModal } from "@/components/modals/view-series-modal";

export default async function ViewSeriesModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const series = await getSeriesById({ seriesId: id });

  if (!series) return notFound();

  return <ViewSeriesModal series={series} />;
}
