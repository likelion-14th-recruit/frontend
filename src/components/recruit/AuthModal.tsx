import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { API_BASE_URL } from "../../constants/api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ResponseEntityApiResponseLoginResponse
 */
export interface LoginApiResponse {
  code?: string;
  data?: LoginResponse;
  message?: string;
  success?: boolean;
  [property: string]: unknown;
}

/**
 * LoginResponse
 */
export interface LoginResponse {
  applicationPublicId?: string;
  passwordLength?: number;
  phoneNumber?: string;
  [property: string]: unknown;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
}: AuthModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [displayPassword, setDisplayPassword] = useState("");

  useEffect(() => {
    if (password.length === 0) {
      setDisplayPassword("");
      return;
    }

    const masked = "*".repeat(password.length - 1) + password.slice(-1);

    setDisplayPassword(masked);

    const timer = setTimeout(() => {
      setDisplayPassword("*".repeat(password.length));
    }, 800);

    return () => clearTimeout(timer);
  }, [password]);

  if (!isOpen) return null;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const formatPhoneNumber = (value: string) => {
    // 숫자가 아닌 걸 지우는 로직([^\d])을 제거하고,
    // 포맷팅은 숫자일 때만 적용되도록 살짝 비틉니다.
    const pure = value.replace(/[^\d]/g, "");

    // 만약 입력값에 문자가 포함되어 있다면 하이픈 포맷팅을 포기하고
    // 사용자가 친 그대로를 보여줍니다 (그래야 문자가 입력됨)
    if (/[^\d-]/.test(value)) return value;

    if (pure.length < 4) return pure;
    if (pure.length < 8) return `${pure.slice(0, 3)}-${pure.slice(3)}`;
    return `${pure.slice(0, 3)}-${pure.slice(3, 7)}-${pure.slice(7, 11)}`;
  };

  // 🔥 실시간 형식 검사
  const purePhone = phone.replace(/[^\d]/g, "");
  const isPhoneValid = purePhone.length === 10 || purePhone.length === 11;
  const isFormValid = isPhoneValid && password.trim() !== "";

  const handleAuthSubmit = async () => {
    if (!isPhoneValid) {
      setPhoneError("올바른 형식을 입력해주세요.");
      return;
    }
    setPhoneError("");
    setPasswordError("");
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone.replace(/[^\d]/g, ""),
          password: password,
        }),
      });

      const result = (await response.json()) as LoginApiResponse;

      if (response.ok && result.success) {
        const applicationPublicId = result.data?.applicationPublicId;
        const passwordLength = result.data?.passwordLength;

        navigate("/recruit/apply", {
          state: {
            applicationId: applicationPublicId,
            passwordLength: passwordLength,
          },
        });
        onClose();
      } else {
        if (result.code === "APPLICATION_NOT_EXISTS") {
          setPhoneError("등록되지 않은 전화번호입니다.");
        } else {
          setPasswordError(result.message || "비밀번호가 올바르지 않습니다.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("로그인 처리 중 오류가 발생했습니다.");
    }
  };

  return createPortal(
    // 1. 오버레이 배경: rgba(0, 0, 0, 0.60) 적용
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 font-pretendard">
      {/* 바깥쪽 클릭 시 닫히는 영역 */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="
        relative bg-white flex flex-col items-center
        
        /* ----------------------------------------------------------- */
        /* [가로 너비 고정 해결 포인트] */
        
        /* 1. 데스크탑 (1440px 등 1024px 이상 환경) */
        /* max-w-none을 주어 모바일용 제약을 풀고 고정 너비를 할당합니다. */
        lg:w-[800px] lg:px-[100px] lg:py-[60px] lg:gap-[60px] lg:rounded-[40px]
        
        /* 2. 태블릿 (769px ~ 1023px) */
        md:w-[600px] md:px-[60px] md:py-[40px] md:gap-[40px] md:rounded-[28px]
        
        /* 3. 모바일 (768px 이하) - 디자인 가이드 반영 */
        /* 가이드: width 340 고정, 패딩 상하좌우 24, 간격 변동 */
        w-[340px] px-[24px] py-[24px] gap-[32px] rounded-[28px]
      "
      >
        <div className="flex flex-col items-center gap-[32px] md:gap-[40px] lg:gap-[40px] self-stretch font-Sogang">
          {/* 타이틀 폰트 크기 조절 (lg: 데스크탑 / md: 태블릿 / 기본: 모바일) */}
          <h2 className="font-semibold text-[#000] text-[20px] md:text-[28px] lg:text-[32px]">
            지원자 인증
          </h2>

          {/* 입력 폼 영역 간격 조절 */}
          <div className="w-full flex flex-col gap-[16px] md:gap-[32px]">
            {/* 전화번호 필드 */}
            <div className="flex flex-col gap-[8px] md:gap-[12px] lg:gap-[12px]">
              <label className="font-semibold text-[#000] ml-1 lg:text-[20px] md:text-[20px] text-[20px]">
                전화번호
              </label>
              <input
                type="text"
                value={formatPhoneNumber(phone)}
                onChange={(e) => {
                  const inputVal = e.target.value;
                  setPhone(inputVal);

                  // 🔥 실시간 에러 검사 로직
                  const pure = inputVal.replace(/[^\d]/g, "");
                  // 숫자가 아닌 값이 포함되어 있거나, 다 입력했는데 길이는 틀릴 때
                  const hasNonDigit = /[^\d-]/.test(inputVal);

                  if (hasNonDigit || (pure.length > 0 && pure.length < 10)) {
                    setPhoneError("올바른 형식을 입력해주세요.");
                  } else {
                    setPhoneError("");
                  }
                }}
                placeholder="전화번호를 입력해 주세요."
                maxLength={13}
                className={`w-full h-[48px] px-[12px] py-[4px] bg-[#F0F0F0] rounded-[12px] outline-none text-[16px] placeholder:text-[rgba(18, 18, 18, 0.60)] transition-all 
                }`}
              />
              {phoneError && (
                <span className="text-[#b90000] text-[16px] ml-1">
                  {phoneError}
                </span>
              )}
            </div>

            {/* 비밀번호 필드 */}
            <div className="flex flex-col gap-[8px] md:gap-[12px] lg:gap-[12px]">
              <label className="font-semibold text-[#000] ml-1 text-[20px]">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={displayPassword}
                  onChange={(e) => {
                    const val = e.target.value;
                    // 글자가 지워졌을 때와 추가됐을 때를 구분하여 실제 password 상태 업데이트
                    if (val.length < password.length) {
                      setPassword(password.slice(0, val.length));
                    } else if (val.length > password.length) {
                      setPassword(password + val.slice(-1));
                    }
                    if (passwordError) setPasswordError("");
                  }}
                  placeholder="비밀번호를 입력해 주세요."
                  className={`w-full h-[48px] px-[12px] py-[4px] bg-[#F0F0F0] placeholder:text-[rgba(18, 18, 18, 0.60)] rounded-[12px] outline-none text-[16px] transition-all
`}
                />
              </div>
              {passwordError && (
                <span className="text-[#b90000] text-[16px] ml-1">
                  {passwordError}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[12px] md:gap-[20px] lg:gap-[20px] self-stretch">
          {/* 인증하기 버튼 */}
          <button
            onClick={handleAuthSubmit}
            disabled={!isFormValid}
            className={`w-full rounded-[12px] transition-all flex items-center justify-center text-white font-semibold
                        p-[10px_24px]
            /* 높이 조절 */ md:h-[60px] h-[46px]
            /* 폰트 조절 */ md:text-[20px] text-[16px]
            ${isFormValid ? "bg-[rgba(18,18,18,0.80)]" : "bg-[rgba(18,18,18,0.20)]"}`}
          >
            인증하기
          </button>

          {/* 비밀번호 찾기 링크 */}
          <button
            className="text-black/80 hover:text-black/80 underline underline-offset-4 md:text-[16px] text-[14px]"
            onClick={() => {
              navigate("/recruit/find-password");
              onClose();
            }}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default AuthModal;
