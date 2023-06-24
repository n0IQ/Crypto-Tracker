import React, { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
  siblingCount = 1,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 2;

    if (totalPageNumbers <= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(1, currentPage - siblingCount);
    const rightSiblingIndex = Math.min(
      totalPageCount,
      currentPage + siblingCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Dont show left dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // Dont show right Dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Show both side Dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, lastPageIndex];
    }
  }, [totalCount, pageSize, currentPage, siblingCount]);

  return paginationRange;
};
