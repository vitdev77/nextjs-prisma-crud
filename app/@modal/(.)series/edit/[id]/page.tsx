import { notFound } from "next/navigation";
import { getSeriesById } from "@/actions/series.actions";
import { EditSeriesModal } from "@/components/modals/edit-series-modal";

export default async function EditSeriesModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const series = await getSeriesById({ seriesId: id });

  if (!series) return notFound();

  return <EditSeriesModal series={series} />;
}
