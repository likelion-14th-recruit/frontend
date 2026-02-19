import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  guideText?: string;
  isError?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonDisabled?: boolean;
  buttonActive?: boolean;
  errorText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      guideText,
      isError,
      buttonText,
      onButtonClick,
      buttonDisabled,
      buttonActive,
      type, // type 추출
      value,
      errorText,
      ...props
    },
    ref,
  ) => {
    // 비밀번호 보이기 상태 관리
    const [showPassword, setShowPassword] = useState(false);

    // 비밀번호 타입일 경우 상태에 따라 text와 password를 전환
    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex flex-col w-full">
        <label className="font-semibold text-[20px] flex items-center mb-[8px] lg:mb-[12px] md:mb-[12px]">
          {label}{" "}
          {required && (
            <img
              src="/recruit/required-icon.svg" // 여기에 파일명 적으세요!
              alt="required"
              className="ml-[8px] w-[10px] h-[10px] md:w-[10px] md:h-[10px] objet-contain"
            />
          )}
        </label>

        <div className="flex gap-[12px] md:gap-[16px] relative items-center w-full">
          <div className="flex-1 relative">
            <input
              {...props}
              ref={ref}
              type={inputType}
              value={value}
              className={`w-full h-[48px] px-[12px] py-[4px] bg-[#F0F0F0] rounded-[12px] outline-none border-none text-[16px] 
            focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none placeholder:text-[rgba(18,18,18,0.60)]
            ${isError ? "ring-1 ring-[#b90000]" : "ring-0"}`}
            />

            {/* 🔥 비밀번호 타입일 때만 나타나는 눈 모양 버튼 */}
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 px-2"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            )}
          </div>

          {buttonText && (
            <button
              type="button"
              disabled={buttonDisabled}
              onClick={onButtonClick}
              className={`h-[48px] px-[14px] py-[12px] rounded-[12px] text-[14px] font-semibold whitespace-nowrap transition-all shrink-0
              ${
                buttonActive
                  ? "bg-black text-white"
                  : "bg-[#f0f0f0] text-[#121212]/60 disabled:opacity-50"
              }`}
            >
              {buttonText}
            </button>
          )}
        </div>

        {/* 하단 텍스트 영역 (에러/가이드) */}
        {(isError || guideText) && (
          <div className="flex flex-col mt-[4px] ml-[4px] px-1">
            {isError && (
              <span className="font-pretendard text-[16px] font-normal leading-[160%] text-[#b90000] mb-1">
                {errorText || "올바른 형식을 입력해주세요."}{" "}
                {/* 🔥 가공된 멘트 출력 */}
              </span>
            )}
            {/* 인증 완료 문구 등이 나올 곳 */}
            {guideText && (
              <span className="font-pretendard text-[16px] font-normal leading-[160%] text-black">
                {guideText}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

export default Input;
