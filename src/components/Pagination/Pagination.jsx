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
    <ul className="paginationContainer">
      <button
        className={`paginationItem ${currentPage === 1 ? "disabled" : ""}`}
        disabled={currentPage === 1}
        onClick={onPrevious}>
        <AiFillCaretLeft className="arrowLeft" />
      </button>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={`dots${index}`} className="paginationItem dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={`paginationItem ${
              currentPage === pageNumber ? "active" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      <button
        className={`paginationItem ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        disabled={currentPage === lastPage}
        onClick={onNext}>
        <AiFillCaretRight className="arrowRight" />
      </button>
    </ul>
  );
};

export default Pagination;
