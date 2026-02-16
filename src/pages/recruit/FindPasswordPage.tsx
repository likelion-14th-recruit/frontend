import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/recruit/Input";

const FindPasswordPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    authCode: "",
    password: "",
    passwordConfirm: "",
  });

  const [authStatus, setAuthStatus] = useState("idle");
  const [authGuide, setAuthGuide] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isPhoneValid = /^[0-9]{11}$/.test(formData.phone);
  const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(
    formData.password,
  );
  const isPasswordMatch =
    formData.password === formData.passwordConfirm && formData.password !== "";

  const isFormValid =
    isPhoneValid &&
    authStatus === "verified" &&
    isPasswordValid &&
    isPasswordMatch;

  // 🔥 1. 인증번호 전송/재전송 핸들러
  const handleSendAuth = async () => {
    if (!isPhoneValid) return;

    try {
      const response = await fetch("/api/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: formData.phone }),
      });
      if (response.ok) {
        setAuthStatus("sent");
        setAuthGuide(
          authStatus === "idle"
            ? "인증번호가 전송되었습니다."
            : "인증번호가 재전송되었습니다.",
        );
        // 재전송 시 기존 인증번호 입력란 초기화
        setFormData((prev) => ({ ...prev, authCode: "" }));
      } else {
        setAuthGuide("전송에 실패했습니다. 번호를 확인해 주세요.");
      }
    } catch (error) {
      setAuthGuide("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  const handleVerifyAuth = async () => {
    if (!formData.authCode) return;

    try {
      const response = await fetch("/api/verification/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phone,
          code: Number(formData.authCode),
        }),
      });

      if (response.ok) {
        setAuthStatus("verified");
      } else {
        alert("인증번호가 일치하지 않거나 만료되었습니다.");
      }
    } catch (error) {
      alert("인증 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      const response = await fetch("/api/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phone,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/recruit"); // 로그인 페이지나 적절한 경로로 이동
      } else {
        const errorData = await response.json();
        alert(`변경 실패: ${errorData.message || "다시 시도해 주세요."}`);
      }
    } catch (error) {
      console.error("네트워크 에러:", error);
      alert("서버 연결 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col max-w-[800px] mx-auto pt-[100px] pb-20 font-pretendard">
      <h1 className="text-[32px] font-semibold mb-[60px]">비밀번호 찾기</h1>

      <div className="flex flex-col gap-10 w-full">
        {/* 전화번호 입력 */}
        <Input
          label="전화번호"
          name="phone"
          required
          placeholder="전화번호를 입력해 주세요."
          // 🔥 3. 인증 완료 후에도 재전송 버튼은 활성화 유지
          buttonText={authStatus === "idle" ? "인증번호 전송" : "재전송"}
          buttonActive={isPhoneValid}
          buttonDisabled={!isPhoneValid}
          onButtonClick={handleSendAuth}
          onChange={handleChange}
          value={formData.phone}
          // 🔥 2. 형식 에러(빨간색)와 가이드 문구 분리 표시
          isError={formData.phone.length > 0 && !isPhoneValid}
          guideText={authGuide || "숫자 11자리"}
        />

        {/* 인증번호 입력 */}
        <Input
          label="인증번호"
          name="authCode"
          required
          placeholder="인증번호를 입력해 주세요."
          buttonText={authStatus === "verified" ? "인증완료" : "인증번호 확인"}
          buttonDisabled={authStatus === "verified" || !formData.authCode}
          buttonActive={
            formData.authCode.length > 0 && authStatus !== "verified"
          }
          onButtonClick={handleVerifyAuth}
          onChange={handleChange}
          value={formData.authCode}
          guideText={authStatus === "verified" ? "인증이 완료되었습니다." : ""}
        />

        {/* 새 비밀번호 입력 */}
        <Input
          label="비밀번호"
          name="password"
          type="password"
          required
          placeholder="비밀번호를 입력해 주세요."
          guideText="영문·숫자 조합 8~20자"
          onChange={handleChange}
          value={formData.password}
          isError={formData.password.length > 0 && !isPasswordValid}
        />

        {/* 비밀번호 확인 입력 */}
        <Input
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          required
          placeholder="비밀번호를 재확인해 주세요."
          onChange={handleChange}
          value={formData.passwordConfirm}
          isError={formData.passwordConfirm.length > 0 && !isPasswordMatch}
          guideText={
            formData.passwordConfirm.length > 0 && !isPasswordMatch
              ? "비밀번호가 일치하지 않습니다."
              : ""
          }
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`w-full h-[60px] mt-[60px] rounded-[12px] text-[20px] font-semibold transition-all
          ${
            isFormValid
              ? "bg-black text-white cursor-pointer opacity-100"
              : "bg-black text-white cursor-not-allowed opacity-20"
          }`}
      >
        확인하기
      </button>
    </div>
  );
};

export default FindPasswordPage;
