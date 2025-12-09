import { notFound } from "next/navigation";
import { getItemById } from "@/actions/item.actions";
import { EditItemModal } from "@/components/modals/edit-item-modal";

export default async function EditItemModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const item = await getItemById({ itemId: id });

  if (!item) return notFound();

  return <EditItemModal item={item} />;
}
