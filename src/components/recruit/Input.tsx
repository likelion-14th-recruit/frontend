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
      type,
      value,
      errorText,
      ...props
    },
    ref,
  ) => {
    // 🔥 렌더 시 계산 (state 없음, effect 없음)
    const realValue = String(value ?? "");

    let displayValue = realValue;

    if (type === "password") {
      // 즉시 전체 마스킹 (안전하고 안정적)
      displayValue = "*".repeat(realValue.length);
    }

    return (
      <div className="flex flex-col w-full">
        <label className="font-semibold text-[20px] flex items-center mb-[8px] lg:mb-[12px] md:mb-[12px]">
          {label}
          {required && (
            <img
              src="/recruit/required-icon.svg"
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
              type="text" // 항상 text (우리가 직접 마스킹)
              value={type === "password" ? displayValue : realValue}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              className="w-full h-[48px] px-[12px] py-[4px] bg-[#F0F0F0] rounded-[12px] outline-none border-none md:text-[16px] text-[14px]
              focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none placeholder:text-[rgba(18,18,18,0.60)]"
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

        {(isError || guideText) && (
          <div className="flex flex-col mt-[4px] ml-[4px] px-1">
            {isError && (
              <span className="text-[16px] text-[#b90000] mb-1">
                {errorText || "올바른 형식을 입력해주세요."}
              </span>
            )}
            {guideText && (
              <span className="text-[16px] text-black">{guideText}</span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
