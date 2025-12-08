import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto flex min-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-10 w-25" />
            <Skeleton className="h-9 w-27" />
          </div>
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-9 w-full" />
          {[1, 2, 3].map((_, key) => (
            <Skeleton key={key} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
