import React from "react";

import { range } from "utils/range";

export type usePaginationProps = {
  totalProducts: number;
  productsPerPage: number;
  currentPage: number;
};

export const usePagination = ({
  totalProducts,
  productsPerPage,
  currentPage,
}: usePaginationProps) => {
  const pageArray = React.useMemo<(string | number)[]>(() => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const totalPageNumbers = 7;
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }
    const leftPageIndex = Math.max(currentPage - 1, 1);
    const rightPageIndex = Math.min(currentPage + 1, totalPages);
    const showLeftEllipsis = leftPageIndex > 3;
    const showRightEllipsis = rightPageIndex < totalPages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    let dots = "...";

    if (!showLeftEllipsis && showRightEllipsis) {
      let leftArray = range(1, 5);
      return [...leftArray, dots, lastPageIndex];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      let rightArray = range(totalPages - 4, totalPages);
      return [firstPageIndex, dots, ...rightArray];
    }

    if (showLeftEllipsis && showRightEllipsis) {
      let middleArray = range(leftPageIndex, rightPageIndex);
      return [firstPageIndex, dots, ...middleArray, dots, lastPageIndex];
    } else return [];
  }, [totalProducts, productsPerPage, currentPage]);
  return pageArray;
};
