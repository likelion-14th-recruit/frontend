import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  if (!isOpen) return null;

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 8)
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const isFormValid = phone.trim() !== "" && password.trim() !== "";

  const handleAuthSubmit = async () => {
    setPhoneError("");
    setPasswordError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone.replace(/[^\d]/g, ""),
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const { applicationPublicId, passwordLength } = result.data;
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
      alert("로그인 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    // 1. 오버레이 배경: rgba(0, 0, 0, 0.60) 적용
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-pretendard">
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
        md:w-[600px] md:px-[60px] md:py-[40px] md:gap-[40px] md:rounded-[30px]
        
        /* 3. 모바일 (768px 이하) - 디자인 가이드 반영 */
        /* 가이드: width 340 고정, 패딩 상하좌우 24, 간격 변동 */
        w-[340px] px-[24px] py-[24px] gap-[32px] rounded-[24px]
      "
      >
        <div className="flex flex-col items-center gap-[32px] md:gap-[40px] self-stretch">
          {/* 타이틀 폰트 크기 조절 (lg: 데스크탑 / md: 태블릿 / 기본: 모바일) */}
          <h2 className="font-semibold text-[#000] text-[20px] md:text-[28px] lg:text-[32px]">
            지원자 인증
          </h2>

          {/* 입력 폼 영역 간격 조절 */}
          <div className="w-full flex flex-col gap-[16px] md:gap-[32px]">
            {/* 전화번호 필드 */}
            <div className="flex flex-col gap-[8px] md:gap-[12px]">
              <label className="font-semibold text-[#000] ml-1 lg:text-[20px] md:text-[18px] text-[20px]">
                전화번호
              </label>
              <input
                type="text"
                value={formatPhoneNumber(phone)}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) setPhoneError("");
                }}
                placeholder="숫자만 입력해 주세요."
                maxLength={13}
                className={`w-full h-[48px] p-4 bg-[#f2f2f2] rounded-[12px] outline-none text-[16px] transition-all
                ${phoneError ? "ring-1 ring-[#b90000]" : "focus:ring-1 focus:ring-gray-300"}`}
              />
              {phoneError && (
                <span className="text-[#b90000] text-[14px] ml-1">
                  {phoneError}
                </span>
              )}
            </div>

            {/* 비밀번호 필드 */}
            <div className="flex flex-col gap-[8px] md:gap-[12px]">
              <label className="font-semibold text-[#000] ml-1 text-[20px]">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  placeholder="비밀번호를 입력해 주세요."
                  className={`w-full h-[48px] p-4 bg-[#f2f2f2] rounded-[12px] outline-none text-[16px] transition-all
                  ${passwordError ? "ring-1 ring-[#b90000]" : "focus:ring-1 focus:ring-gray-300"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {passwordError && (
                <span className="text-[#b90000] text-[14px] ml-1">
                  {passwordError}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[12px] lg:gap-[20px] self-stretch">
          {/* 인증하기 버튼 */}
          <button
            onClick={handleAuthSubmit}
            disabled={!isFormValid}
            className={`w-full rounded-[12px] transition-all flex items-center justify-center text-white
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
    </div>
  );
};

export default AuthModal;
