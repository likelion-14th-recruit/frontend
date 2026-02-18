import { type SetStateAction } from "react";
import type { Pages } from "../../constants/adminFilter";
import next_active from "/icons/leftArrow.svg";
import next_inactive from "/icons/leftArrow_inactive.svg";

interface PaginationProps {
  currentPage: number; // 0-based
  totalPages: number; // total page count
  onPageChange: (page: SetStateAction<Pages>) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const WINDOW = 10;

  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  // totalPages가 0/1이면 그냥 1개만 보여주기
  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-center w-full gap-2 mt-12 mb-20">
        <button className="p-2" disabled>
          <img src={next_inactive} alt="" className="w-[24px]" />
        </button>

        <button className="w-[44px] h-[44px] flex items-center justify-center rounded-full text-[16px] gap-[8px] bg-lightGray text-black font-[550]">
          1
        </button>

        <button className="p-2" disabled>
          <img src={next_inactive} alt="" className="w-[24px] rotate-180" />
        </button>
      </div>
    );
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  // ✅ currentPage가 WINDOW의 가운데 오도록 startIndex 계산
  const half = Math.floor(WINDOW / 2);

  let startIndex = currentPage - half;

  // 범위 보정: 0 ~ (totalPages - WINDOW)
  const maxStart = Math.max(0, totalPages - WINDOW);
  if (startIndex < 0) startIndex = 0;
  if (startIndex > maxStart) startIndex = maxStart;

  const visiblePages =
    totalPages <= WINDOW ? pages : pages.slice(startIndex, startIndex + WINDOW);

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
                ? "bg-lightGray text-black font-[550]"
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
