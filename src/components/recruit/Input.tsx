import { useState, useEffect } from "react";
import React from "react";
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
    // 🔥 화면에 보여줄 마스킹 텍스트 상태
    const [displayValue, setDisplayValue] = useState("");

    useEffect(() => {
      const realValue = String(value || "");

      if (type === "password") {
        if (realValue.length === 0) {
          setTimeout(() => {
            setDisplayValue("");
          }, 0);
          return;
        }

        // 마지막 글자만 보이게 설정 (g -> *k -> **s)
        const masked = "*".repeat(realValue.length - 1) + realValue.slice(-1);
        setTimeout(() => {
          setDisplayValue(masked);
        }, 0);

        // 0.8초 후 전체 별표 처리
        const timer = setTimeout(() => {
          setDisplayValue("*".repeat(realValue.length));
        }, 800);

        return () => clearTimeout(timer);
      } else {
        // 비밀번호가 아니면 그냥 값 그대로
        setTimeout(() => {
          setDisplayValue(realValue);
        }, 0);
      }
    }, [value, type]);

    return (
      <div className="flex flex-col w-full">
        <label className="font-semibold text-[20px] flex items-center mb-[8px] lg:mb-[12px] md:mb-[12px]">
          {label}{" "}
          {required && (
            <img
              src="/recruit/required-icon.svg" // 여기에 파일명 적으세요!
              alt="required"
              className="ml-[8px] w-[10px] h-[10px] md:w-[10px] md:h-[10px] object-contain"
            />
          )}
        </label>

        <div className="flex gap-[12px] md:gap-[16px] relative items-center w-full">
          <div className="flex-1 relative">
            <input
              {...props}
              ref={ref}
              type="text"
              value={type === "password" ? displayValue : value}
              /* 🔥 맥북 파란 밑줄 및 자동 완성 방지 속성 추가 */
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off" // iOS(아이폰) 대응
              autoCapitalize="off" // 첫 글자 자동 대문자 방지
              className={`w-full h-[48px] px-[12px] py-[4px] bg-[#F0F0F0] rounded-[12px] outline-none border-none md:text-[16px] text-[14px] 
            focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none placeholder:text-[rgba(18,18,18,0.60)]
            `}
            />
          </div>

          {buttonText && (
            <button
              type="button"
              disabled={buttonDisabled}
              onClick={onButtonClick}
              className={`h-[48px] px-[14px] py-[12px] rounded-[12px] text-[14px] font-semibold whitespace-nowrap transition-all shrink-0
              ${
                buttonActive
                  ? "bg-[rgba(18,18,18,0.8)] text-white"
                  : "bg-[#f0f0f0] text-[#121212]/60"
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

Input.displayName = "Input";

export default Input;
