import { Loader2 } from "lucide-react";

export default function CommonLoader() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Loader2 className="stroke-muted-foreground/25 size-8 animate-spin" />
    </div>
  );
}
