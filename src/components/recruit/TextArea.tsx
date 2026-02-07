import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  maxLength: number;
  currentLength: number;
  required?: boolean;
}

const TextArea = ({
  label,
  maxLength,
  currentLength,
  required,
  ...props
}: TextAreaProps) => {
  // 🔥 500자 초과 여부 확인
  const isOverLimit = currentLength > maxLength;
  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="font-normal text-[20px] leading-[140%]">
        {label} {required && <span className="text-[#b90000]">*</span>}
      </label>
      <div className="flex flex-col gap-2">
        <textarea
          {...props}
          className={`w-full h-[200px] p-5 bg-[#f2f2f2] rounded-[15px] outline-none border-none text-[15px] resize-none placeholder:text-gray-400 transition-all
            ${isOverLimit ? "ring-2 ring-[#b90000]" : "focus:ring-1 focus:ring-gray-300"}`}
        />
        {/* 🔥 글자 수가 초과되면(501부터) 숫자가 빨간색으로 변합니다. */}
        <div
          className={`flex justify-end text-[16px] px-1 font-medium ${isOverLimit ? "text-[#b90000]" : "text-gray-400"}`}
        >
          <span className={isOverLimit ? "font-bold" : ""}>
            {currentLength}
          </span>
          <span> / {maxLength}</span>
        </div>
      </div>
    </div>
  );
};

export default TextArea;
