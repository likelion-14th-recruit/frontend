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

  // 1. 하이픈 포맷 함수 (컴포넌트 밖 혹은 내부에 추가)
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 8)
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  if (!isOpen) return null;

  const isFormValid = phone.trim() !== "" && password.trim() !== "";

  const handleAuthSubmit = async () => {
    setPhoneError("");
    setPasswordError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone.replace(/[^\d]/g, ""), // 숫지만 추출해서 전송
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
      }
      // ❌ 에러 처리 분기
      else {
        // 🔥 서버 에러 코드에 따라 메시지 가공 (백엔드 코드 확인 필요)
        // 만약 에러 코드가 APPLICATION_NOT_FOUND 이거나 메시지에 "존재하지"가 포함된 경우
        if (result.code === "APPLICATION_NOT_EXISTS") {
          setPhoneError("등록되지 않은 전화번호입니다.");
        }
        // 그 외엔 비밀번호 에러로 처리
        else {
          setPasswordError(result.message || "비밀번호가 올바르지 않습니다.");
        }
      }
    } catch (error) {
      console.error("❌ 처리 중 에러 발생:", error);
      alert("로그인 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-pretendard">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[800px] px-[40px] md:px-[100px] py-[60px] rounded-[40px] flex flex-col items-center gap-[40px]">
        <h2 className="text-[32px] font-semibold text-[#000]">지원자 인증</h2>

        <div className="w-full flex flex-col gap-[32px]">
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-semibold text-[#000] ml-1">
              전화번호
            </label>
            <input
              type="text"
              value={formatPhoneNumber(phone)} // 시각적으로 하이픈 포함
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError(""); // 입력 시작하면 에러 삭제
              }}
              placeholder="숫자만 입력해 주세요."
              maxLength={13}
              className={`w-full p-4 bg-[#f2f2f2] rounded-[12px] outline-none text-[15px] transition-all
    ${phoneError ? "ring-1 ring-[#b90000]" : "focus:ring-1 focus:ring-gray-300"}`}
            />
            {phoneError && (
              <span className="text-[#b90000] text-[14px] ml-1">
                {phoneError}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[20px]">
            <label className="text-[20px] font-semibold text-[#000] ml-1">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요."
                className={`w-full p-4 bg-[#f2f2f2] rounded-[12px] outline-none text-[15px] transition-all
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

        <button
          onClick={handleAuthSubmit}
          disabled={!isFormValid}
          className={`w-full h-[60px] rounded-[12px] font-bold text-[18px] transition-all flex items-center justify-center text-white
            ${isFormValid ? "bg-[rgba(18,18,18,0.80)]" : "bg-[rgba(18,18,18,0.20)]"}`}
        >
          인증하기
        </button>

        <button
          className="text-[16px] text-[#999] hover:text-[#666] underline underline-offset-4"
          onClick={() => {
            navigate("/recruit/find-password");
            onClose();
          }}
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
