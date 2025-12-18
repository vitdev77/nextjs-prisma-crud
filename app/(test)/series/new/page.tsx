import { Metadata } from "next";
import { CreateSeriesComponent } from "@/components/create-series-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create new series",
};

export default function NewSeriesPage() {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6">
      <ReturnButton
        btnVariant={"link"}
        href={"/series"}
        label="All Series Page"
      />
      <Card className="max-w-sm">
        <CardContent>
          <CreateSeriesComponent />
        </CardContent>
      </Card>
    </div>
  );
}
