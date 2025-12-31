import { Metadata } from "next";
import { CreateItemComponent } from "@/components/create-item-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create new item",
};

export default function NewItemPage() {
  return (
    <div className="bg-muted my-8 flex h-full w-full flex-col items-center justify-center gap-6 rounded-2xl">
      <ReturnButton btnVariant={"link"} href={"/items"} label="All Items" />
      <Card className="max-w-sm">
        <CardContent>
          <CreateItemComponent />
        </CardContent>
      </Card>
    </div>
  );
}
