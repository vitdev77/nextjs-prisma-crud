import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="no-scrollbar w-full overflow-x-hidden pt-6 pb-15">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-46.25" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, key) => (
            <Skeleton key={key} className="h-48 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
