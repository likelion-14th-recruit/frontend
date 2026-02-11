import { useState, type SetStateAction } from "react";
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

  const PAGE_PER_GROUP = 10;
  const currentGroup = Math.floor(currentPage / PAGE_PER_GROUP);

  const startPage = currentGroup * PAGE_PER_GROUP;
  const endPage = startPage + PAGE_PER_GROUP;

  return (
    <div className="flex items-center justify-center w-full gap-2 mt-12 mb-20">
      <button
        className={`p-2 ${currentPage === 0 ? "cursor-default" : ""}`}
        onClick={() =>
          onPageChange({ page: currentPage - 1, totalPages: totalPages })
        }
      >
        <img
          src={currentPage === 0 ? next_inactive : next_active}
          alt=""
          className={`w-[24px] ${currentPage === 0 ? "cursor-default" : ""}`}
        />
      </button>
      {pages.slice(startPage, endPage).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange({ page: p, totalPages: totalPages })}
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
        className={`p-2 ${
          currentPage + 1 < totalPages ? "" : "cursor-default"
        }`}
        onClick={() =>
          onPageChange({ page: currentPage + 1, totalPages: totalPages })
        }
      >
        <img
          src={currentPage + 1 < totalPages ? next_active : next_inactive}
          alt=""
          className={`w-[24px] rotate-180 ${
            currentPage + 1 < totalPages ? "" : "cursor-default"
          }`}
        />
      </button>
    </div>
  );
};

export default Pagination;
