import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { DOTS, usePagination } from "../Hooks/usePagination";
import "./PaginationStyles.css";

const Pagination = (props) => {
  const {
    totalCount,
    pageSize,
    currentPage,
    siblingCount = 1,
    onPageChange,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination-container">
      <li
        className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={onPrevious}>
        <AiFillCaretLeft className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={`dots${index}`} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={
              (`pagination-item`, { selected: pageNumber === currentPage })
            }
            onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        onClick={onNext}>
        <AiFillCaretRight className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
