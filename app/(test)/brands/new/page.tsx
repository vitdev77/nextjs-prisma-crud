import { Metadata } from "next";
import { CreateBrandComponent } from "@/components/create-brand-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create new brand",
};

export default function NewBrandPage() {
  return (
    <div className="bg-muted my-8 flex w-full flex-col items-center justify-center gap-6 rounded-2xl">
      <ReturnButton
        btnVariant={"link"}
        href={"/brands"}
        label="All Brands Page"
      />
      <Card className="max-w-sm">
        <CardContent>
          <CreateBrandComponent />
        </CardContent>
      </Card>
    </div>
  );
}
