import React, { useState } from "react";

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex flex-col ${open ? "" : "border border-[var(--Black-20,rgba(18,18,18,0.20))]"}`}
    >
      {/* 질문 영역 (고정 카드) */}
      <button
        onClick={() => setOpen(!open)}
        className={`
    w-full
    flex justify-between items-center
    px-[16px] py-[12px]
    md:px-[40px] md:py-[24px]
    text-left
    transition-colors
    ${open ? "bg-lightGray border border-black/40" : "bg-white"}
  `}
      >
        <span className="font-pretendard text-[14px] md:text-[20px] font-semibold leading-[140%] text-black/80">
          Q. {question}
        </span>

        <span
          className={`
    transition-transform duration-300
    ${open ? "rotate-180" : "rotate-0"}
  `}
        >
          <img
            src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/arrow.svg"
            alt=""
          />
        </span>
      </button>

      {/* 답변 영역 (완전히 분리) */}
      {open && (
        <div className="px-[16px] py-[12px] md:px-[40px] md:py-[24px] lg:px-[60px]">
          <div
            className="
            text-[14px]
            md:text-[16px]
            font-pretendard
            font-regular
            leading-[160%]
            text-black/100
          "
          >
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
