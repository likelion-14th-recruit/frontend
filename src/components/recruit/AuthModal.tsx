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

  const isFormValid = phone.trim() !== "" && password.trim() !== "";

  const handleAuthSubmit = async () => {
    setPhoneError("");
    setPasswordError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // 🔥 서버 응답 데이터에서 정확한 키값 추출
        const { applicationPublicId, passwordLength } = result.data;

        console.log(
          "✅ 로그인 데이터 확인:",
          applicationPublicId,
          passwordLength,
        );

        // 🚀 ApplyPage로 이동하면서 필요한 모든 열쇠(state)를 전달
        navigate("/recruit/apply", {
          state: {
            applicationId: applicationPublicId, // ApplyPage에서 질문 조회 시 사용
            passwordLength: passwordLength, // 나중에 InfoPage로 돌아올 때 사용
            field: "BACKEND", // 파트 정보는 기획상 필요하다면 추가 (없으면 기본값)
          },
        });
        onClose();
      } else {
        // 서버 에러 메시지 처리 (400, 401 등)
        setPasswordError(result.message || "비밀번호가 올바르지 않습니다.");
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="숫자만 입력해 주세요."
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
