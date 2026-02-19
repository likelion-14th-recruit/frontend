import { useMemo, useState } from "react";

type FAQVariant = "home" | "recruit";

type FAQItemProps = {
  question: string;
  answer: string;
  variant: FAQVariant; // ✅ 추가
};

const FAQItem = ({ question, answer, variant }: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  const isHome = variant === "home";

  // 색 변수
  const border20 = "border-black/20";
  const border40 = "border-black/40";

  // 질문(버튼) 스타일
  const questionBoxClass = useMemo(() => {
    const base =
      "w-full flex justify-between items-center text-left transition-colors " +
      "px-[16px] py-[12px] md:px-[40px] md:py-[24px]";

    const border = open
      ? `border ${border40}`
      : isHome
        ? `border ${border20}`
        : "border border-transparent";

    const bg = open
      ? isHome
        ? "bg-lightGray"
        : "bg-white" // recruit open: 배경색 없음(white 유지)
      : "bg-white";

    return [base, border, bg].filter(Boolean).join(" ");
  }, [open, isHome]);

  // ✅ 질문 텍스트 색 (공통 규칙)
  const questionTextClass = useMemo(() => {
    return [
      "font-pretendard font-semibold text-[14px] tablet-lg:text-[20px] leading-[140%]",
      open ? "text-black/100" : "text-black/80",
    ].join(" ");
  }, [open]);

  // ✅ 바깥 wrapper (기존처럼 유지, 단 recruit closed는 border 없어야 하니 여기서는 border 주지 않음)
  // -> border는 버튼(question box)에서만 관리하도록 통일
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen((v) => !v)}
        className={questionBoxClass}
        type="button"
      >
        <span className={questionTextClass}>Q. {question}</span>

        <span
          className={[
            "transition-transform duration-300",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        >
          <img
            src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/arrow.svg"
            alt=""
          />
        </span>
      </button>

      {open && (
        <div
          className="
            px-[16px] py-[12px]
            tablet-lg:px-[40px] tablet-lg:py-[24px]
            desktop:px-[60px]
          "
        >
          <div
            className="
              text-[14px]
              tablet-lg:text-[16px]
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
