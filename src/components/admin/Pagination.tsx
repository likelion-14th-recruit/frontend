import { type SetStateAction } from "react";
import type { Pages } from "../../constants/adminFilter";
import next_active from "/icons/leftArrow.svg";
import next_inactive from "/icons/leftArrow_inactive.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: SetStateAction<Pages>) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  const WINDOW = 10;

  const startIndex =
    totalPages <= WINDOW ? 0 : Math.min(currentPage, totalPages - WINDOW);

  const visiblePages = pages.slice(startIndex, startIndex + WINDOW);

  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  return (
    <div className="flex items-center justify-center w-full gap-2 mt-12 mb-20">
      <button
        className={`p-2 ${isFirst ? "cursor-default" : ""}`}
        disabled={isFirst}
        onClick={() => onPageChange({ page: currentPage - 1, totalPages })}
      >
        <img
          src={isFirst ? next_inactive : next_active}
          alt=""
          className={`w-[24px] ${isFirst ? "cursor-default" : ""}`}
        />
      </button>

      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange({ page: p, totalPages })}
          className={`w-[44px] h-[44px] flex items-center justify-center rounded-full text-[16px] gap-[8px]
            ${
              currentPage === p
                ? "bg-lightGray text-black font-bold"
                : "text-black/80"
            }`}
        >
          {p + 1}
        </button>
      ))}

      <button
        className={`p-2 ${isLast ? "cursor-default" : ""}`}
        disabled={isLast}
        onClick={() => onPageChange({ page: currentPage + 1, totalPages })}
      >
        <img
          src={isLast ? next_inactive : next_active}
          alt=""
          className={`w-[24px] rotate-180 ${isLast ? "cursor-default" : ""}`}
        />
      </button>
    </div>
  );
};

export default Pagination;
