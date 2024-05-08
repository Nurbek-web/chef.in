"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function RecipePagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPaginationItems = () => {
    const items = [];
    // Render the previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href={createPageURL(currentPage - 1)}
          isActive={currentPage === 1}
        />
      </PaginationItem>
    );

    // Always show the first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink href={createPageURL(1)}>1</PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if there are more than 3 pages
    if (totalPages > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Render pages between 2 and totalPages - 1
    for (let i = 2; i < totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={createPageURL(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    // Show last page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href={createPageURL(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Render next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          href={createPageURL(currentPage + 1)}
          isActive={currentPage === totalPages}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <>
      <Pagination>
        <PaginationContent>{renderPaginationItems()}</PaginationContent>
      </Pagination>
    </>
  );
}
