import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  maxLength: number;
  currentLength: number;
  required?: boolean;
  index: number;
}

const TextArea = ({
  label,
  maxLength,
  currentLength,
  required,
  index,
  ...props
}: TextAreaProps) => {
  // 🔥 500자 초과 여부 확인
  const isOverLimit = currentLength > maxLength;
  return (
    <div className="flex flex-col gap-[20px] w-full">
      {/* 상단: 숫자 + 질문 영역 */}
      <div className="flex gap-[5px] items-start">
        {" "}
        {/* items-start로 숫자가 위쪽에 고정되게 */}
        {/* 질문 번호 */}
        <span className="font-normal text-[20px] leading-[140%] shrink-0">
          {index}.
        </span>
        {/* 질문 내용 + 필수 아이콘 */}
        <label className="font-normal text-[20px] leading-[140%] break-all">
          {label}
          {required && (
            <img
              src="/recruit/required-icon.svg"
              alt="required"
              // 🔥 ml-[6px]와 inline-block으로 글자 바로 옆에 붙게 설정
              className="inline-block ml-[8px] w-[10px] h-[10px] mb-[2px] align-middle"
            />
          )}
        </label>
      </div>
      <div className="flex flex-col gap-[4px]">
        <textarea
          {...props}
          className={`w-full h-[240px] px-[20px] py-[12px] bg-[#f0f0f0] rounded-[12px] outline-none border-none text-[16px] resize-none placeholder:text-[rgba(18,18,18,0.60)] transition-all
            ${isOverLimit ? "ring-[1px] ring-[#b90000]" : "focus:ring-0 focus:ring-gray-300"}`}
        />
        <div
          className={`flex justify-end text-[16px] px-[4px] font-normal text-[rgba(18,18,18,0.60)]`}
        >
          <span
            className={`mr-[4px]
              ${isOverLimit ? "text-[#b90000]" : "text-[rgba(18,18,18,0.60)]"}`}
          >
            {currentLength}
          </span>
          <span> / {maxLength}</span>
        </div>
      </div>
    </div>
  );
};

export default TextArea;
