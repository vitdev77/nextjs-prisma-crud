import { notFound } from "next/navigation";
import { getProductById } from "@/actions/product.actions";
import { EditProductModal } from "@/components/modals/edit-product-modal";

export default async function EditProductModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const product = await getProductById({ productId: id });

  if (!product) return notFound();

  return <EditProductModal product={product} />;
}
