import { Metadata } from "next";
import { CreateItemCodeComponent } from "@/components/create-item-code-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create new item code",
};

export default function NewItemCodePage() {
  return (
    <div className="bg-muted my-8 flex w-full flex-col items-center justify-center gap-6 rounded-2xl">
      <ReturnButton
        btnVariant={"link"}
        href={"/item-codes"}
        label="All Item Codes"
      />
      <Card className="max-w-sm">
        <CardContent>
          <CreateItemCodeComponent />
        </CardContent>
      </Card>
    </div>
  );
}
