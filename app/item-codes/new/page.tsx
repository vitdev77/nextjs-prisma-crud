import { Metadata } from "next";
import { CreateItemCodeComponent } from "@/components/create-item-code-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create new item code",
};

export default function NewItemCodePage() {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6">
      <ReturnButton
        btnVariant={"link"}
        href={"/item-codes"}
        label="All Item Codes Page"
      />
      <Card className="max-w-sm">
        <CardContent>
          <CreateItemCodeComponent />
        </CardContent>
      </Card>
    </div>
  );
}
