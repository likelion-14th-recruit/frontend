// import React, { useState, useEffect, useRef } from "react";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   required?: boolean;
//   guideText?: string;
//   isError?: boolean;
//   buttonText?: string;
//   onButtonClick?: () => void;
//   buttonDisabled?: boolean;
//   buttonActive?: boolean;
//   errorText?: string;
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   (
//     {
//       label,
//       required,
//       guideText,
//       isError,
//       buttonText,
//       onButtonClick,
//       buttonDisabled,
//       buttonActive,
//       type,
//       value,
//       onChange,
//       errorText,
//       ...props
//     },
//     ref,
//   ) => {
//     const realValue = String(value ?? "");

//     const [maskAll, setMaskAll] = useState(true);
//     const timerRef = useRef<NodeJS.Timeout | null>(null);

//     // 🔥 사용자가 입력했을 때만 처리
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (type === "password") {
//         setMaskAll(false);

//         if (timerRef.current) {
//           clearTimeout(timerRef.current);
//         }

//         timerRef.current = setTimeout(() => {
//           setMaskAll(true);
//         }, 800);
//       }

//       onChange?.(e);
//     };

//     // 🔥 언마운트 시 타이머 정리
//     useEffect(() => {
//       return () => {
//         if (timerRef.current) {
//           clearTimeout(timerRef.current);
//         }
//       };
//     }, []);

//     let displayValue = realValue;

//     if (type === "password") {
//       if (maskAll) {
//         displayValue = "*".repeat(realValue.length);
//       } else if (realValue.length > 1) {
//         displayValue = "*".repeat(realValue.length - 1) + realValue.slice(-1);
//       }
//     }

//     return (
//       <div className="flex flex-col w-full">
//         <label className="font-semibold text-[20px] flex items-center mb-[8px]">
//           {label}
//           {required && (
//             <img
//               src="/recruit/required-icon.svg"
//               alt="required"
//               className="ml-[8px] w-[10px] h-[10px] object-contain"
//             />
//           )}
//         </label>

//         <div className="flex gap-[12px] relative items-center w-full">
//           <div className="flex-1 relative">
//             <input
//               {...props}
//               ref={ref}
//               type="text"
//               value={type === "password" ? displayValue : realValue}
//               onChange={handleChange}
//               spellCheck={false}
//               autoComplete="off"
//               autoCorrect="off"
//               autoCapitalize="off"
//               className="w-full h-[48px] px-[12px] py-[4px] bg-[#F0F0F0] rounded-[12px] outline-none border-none"
//             />
//           </div>

//           {buttonText && (
//             <button
//               type="button"
//               disabled={buttonDisabled}
//               onClick={onButtonClick}
//               className={`h-[48px] px-[14px] py-[12px] rounded-[12px] text-[14px] font-semibold
//               ${
//                 buttonActive
//                   ? "bg-[rgba(18,18,18,0.8)] text-white"
//                   : "bg-[#f0f0f0] text-[#121212]/60"
//               }`}
//             >
//               {buttonText}
//             </button>
//           )}
//         </div>

//         {(isError || guideText) && (
//           <div className="flex flex-col mt-[4px] ml-[4px] px-1">
//             {isError && (
//               <span className="text-[16px] text-[#b90000] mb-1">
//                 {errorText || "올바른 형식을 입력해주세요."}
//               </span>
//             )}
//             {guideText && (
//               <span className="text-[16px] text-black">{guideText}</span>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   },
// );

// Input.displayName = "Input";
// export default Input;

import { useState, useRef, useEffect } from "react";
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
      onChange,
      buttonDisabled,
      buttonActive,
      type, // type 추출
      value,
      errorText,
      ...props
    },
    ref,
  ) => {
    const realValue = String(value ?? "");

    const [isRevealing, setIsRevealing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "password") {
        setIsRevealing(true);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setIsRevealing(false);
        }, 800);
      }

      onChange?.(e); // 🔥 InfoPage 로직 그대로 유지
    };

    let displayValue = realValue;

    if (type === "password") {
      if (!isRevealing) {
        displayValue = "*".repeat(realValue.length);
      } else if (realValue.length > 1) {
        displayValue = "*".repeat(realValue.length - 1) + realValue.slice(-1);
      }
    }

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
              onChange={handleChange}
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
