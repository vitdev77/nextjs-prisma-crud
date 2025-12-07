import { notFound } from "next/navigation";
import { getBrandById } from "@/actions/brand.actions";
import { EditBrandModal } from "@/components/modals/edit-brand-modal";

export default async function EditBrandModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const brand = await getBrandById({ brandId: id });

  if (!brand) return notFound();

  return <EditBrandModal brand={brand} />;
}
