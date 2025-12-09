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
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6">
      <ReturnButton
        btnVariant={"link"}
        href={"/items"}
        label="All Items Page"
      />
      <Card>
        <CardContent>
          <EditItemComponent item={item} />
        </CardContent>
      </Card>
    </div>
  );
}
