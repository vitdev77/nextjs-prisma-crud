import { Metadata } from "next";
import { CreateItemComponent } from "@/components/create-item-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create new item",
};

export default function NewItemPage() {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6">
      <ReturnButton
        btnVariant={"link"}
        href={"/items"}
        label="All Items Page"
      />
      <Card>
        <CardContent>
          <CreateItemComponent />
        </CardContent>
      </Card>
    </div>
  );
}
