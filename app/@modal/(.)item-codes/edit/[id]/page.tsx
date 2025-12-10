import { notFound } from "next/navigation";
import { getItemCodeById } from "@/actions/itemCode.actions";
import { EditItemCodeModal } from "@/components/modals/edit-item-code-modal";

export default async function EditItemCodeModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const itemCode = await getItemCodeById({ itemCodeId: id });

  if (!itemCode) return notFound();

  return <EditItemCodeModal itemCode={itemCode} />;
}
