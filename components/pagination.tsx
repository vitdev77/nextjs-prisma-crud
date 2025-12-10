import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface PaginationProps {
  curentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}

export default function PaginationComponent({
  curentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams({
      ...searchParams,
      page: String(page),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, curentPage - delta);
      i <= Math.min(totalPages - 1, curentPage + delta);
      i++
    ) {
      range.push(i);

      // If curentPage = 6, totalPages = 10, delta = 2 -> range = [ 4, 5, 6, 7, 8 ].
    }

    if (curentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (curentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {curentPage <= 1 ? (
            <Button
              aria-label="Go to previous page"
              variant={"ghost"}
              className="cursor-not-allowed gap-1 px-2.5 sm:pl-2.5"
              disabled
            >
              <ChevronLeftIcon />
              <span className="hidden sm:block">Previous</span>
            </Button>
          ) : (
            <PaginationPrevious
              href={getPageUrl(curentPage - 1)}
              aria-disabled={curentPage <= 1}
            />
          )}
        </PaginationItem>

        {visiblePages.map((page, key) => {
          if (page === "...") {
            return (
              <PaginationItem key={key}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNumber = page as number;
          const isCurrentPage = pageNumber === curentPage;

          return (
            <PaginationItem key={key}>
              <PaginationLink
                href={getPageUrl(pageNumber)}
                isActive={isCurrentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          {curentPage >= totalPages ? (
            <Button
              aria-label="Go to next page"
              variant={"ghost"}
              className="cursor-not-allowed gap-1 px-2.5 sm:pr-2.5"
              disabled
            >
              <span className="hidden sm:block">Next</span>
              <ChevronRightIcon />
            </Button>
          ) : (
            <PaginationNext
              href={getPageUrl(curentPage + 1)}
              aria-disabled={curentPage >= totalPages}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
