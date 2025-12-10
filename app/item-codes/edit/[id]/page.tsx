import { Metadata } from "next";
import { getItemCodeById } from "@/actions/itemCode.actions";
import { EditItemCodeComponent } from "@/components/edit-item-code-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit single item code",
};

export default async function EditItemCodePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const itemCode = await getItemCodeById({ itemCodeId: id });

  if (!itemCode) {
    notFound();
  }

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6">
      <ReturnButton
        btnVariant={"link"}
        href={"/item-codes"}
        label="All Item Codes Page"
      />
      <Card>
        <CardContent>
          <EditItemCodeComponent itemCode={itemCode} />
        </CardContent>
      </Card>
    </div>
  );
}
