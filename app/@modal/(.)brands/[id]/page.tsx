import { notFound } from "next/navigation";
import { getBrandById } from "@/actions/brand.actions";
import { ViewBrandModal } from "@/components/modals/view-brand-modal";

export default async function ViewBrandModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const brand = await getBrandById({ brandId: id });

  if (!brand) return notFound();

  return <ViewBrandModal brand={brand} />;
}
