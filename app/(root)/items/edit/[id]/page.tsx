import { Metadata } from "next";
import { getItemById } from "@/actions/item.actions";
import { EditItemComponent } from "@/components/edit-item-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit single item",
};

export default async function EditItemPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const item = await getItemById({ itemId: id });

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-muted my-8 flex w-full flex-col items-center justify-center gap-6 rounded-2xl">
      <ReturnButton btnVariant={"link"} href={"/items"} label="All Items" />
      <Card>
        <CardContent className="max-w-sm">
          {/* <EditItemComponent item={item} /> */}
          <EditItemComponent item={item as any} />
        </CardContent>
      </Card>
    </div>
  );
}
