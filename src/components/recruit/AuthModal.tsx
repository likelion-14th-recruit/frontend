import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const navigate = useNavigate();

  // 상태 관리
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // 에러 메시지 상태 관리
  const [phoneError, setPhoneError] = useState(""); // 1번, 3번 케이스
  const [passwordError, setPasswordError] = useState(""); // 2번 케이스

  if (!isOpen) return null;

  // 4번: 버튼 활성화 조건 (전화번호와 비밀번호가 모두 입력되었을 때)
  const isFormValid = phone.trim() !== "" && password.trim() !== "";

  const handleAuthSubmit = () => {
    // 초기화
    setPhoneError("");
    setPasswordError("");

    // 여기서 실제 서버 응답에 따라 에러를 세팅하는 로직이 들어갑니다.
    // (아래는 예시를 위한 가상 로직입니다.)

    if (phone === "000") {
      // 예: 없는 번호일 때
      setPhoneError("등록되지 않은 전화번호입니다.");
      return;
    }
    if (phone === "111") {
      // 예: 이미 제출 완료된 번호일 때
      setPhoneError(
        "해당 전화번호로 제출 완료된 지원서가 있어 수정이 불가합니다.",
      );
      return;
    }
    if (password !== "1234") {
      // 예: 비밀번호가 틀렸을 때
      setPasswordError("비밀번호가 올바르지 않습니다.");
      return;
    }

    // 인증 성공 시 이동 로직 (이전 예시와 동일)
    navigate("/recruit/apply");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-pretendard">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[800px] px-[100px] py-[60px] md:p-12 rounded-[25px] shadow-2xl flex flex-col items-center gap-[60px]">
        <h2 className="text-[32px] font-semibold text-[#000]">지원자 인증</h2>

        <div className="w-full flex flex-col gap-6">
          {/* 전화번호 영역 */}
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
            {/* 1번, 3번 에러 문구 */}
            {phoneError && (
              <span className="text-[#b90000] text-[14px] ml-1">
                {phoneError}
              </span>
            )}
          </div>

          {/* 비밀번호 영역 */}
          <div className="flex flex-col gap-2">
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
            {/* 2번 에러 문구 */}
            {passwordError && (
              <span className="text-[#b90000] text-[14px] ml-1">
                {passwordError}
              </span>
            )}
          </div>
        </div>

        {/* 4번: 인증하기 버튼 (스타일 반영) */}
        <button
          onClick={handleAuthSubmit}
          disabled={!isFormValid}
          style={{
            display: "flex",
            height: "60px",
            padding: "10px 24px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            alignSelf: "stretch",
            borderRadius: "12px",
            // 조건에 따른 배경색 변경 (rgba 값 적용)
            background: isFormValid
              ? "rgba(18, 18, 18, 0.80)"
              : "rgba(18, 18, 18, 0.20)",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: "18px",
          }}
          className="transition-all"
        >
          인증하기
        </button>

        <div className="flex flex-col items-center gap-4 w-full">
          {/* 5번: 비밀번호 찾기 클릭 시 이동 */}
          <button
            className="text-[16px] text-[#999] hover:text-[#666] underline underline-offset-4"
            onClick={() => {
              navigate("/recruit/find-password"); // 실제 비밀번호 찾기 경로로 수정하세요!
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
