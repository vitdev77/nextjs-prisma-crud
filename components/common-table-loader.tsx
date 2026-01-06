import { Skeleton } from "@/components/ui/skeleton";

export default function CommonTableLoader() {
  return (
    <div className="no-scrollbar w-full overflow-x-hidden pt-6 pb-15">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-10 w-25" />
            <Skeleton className="h-9 w-27" />
          </div>
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Skeleton className="ml-1 h-8 w-96" />
            <Skeleton className="mr-1 h-8 w-19" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-9 w-full" />
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, key) => (
              <Skeleton key={key} className="h-12 w-full" />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-50" />
            <Skeleton className="h-10 w-130" />
          </div>
        </div>
      </div>
    </div>
  );
}
