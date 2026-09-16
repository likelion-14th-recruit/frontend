import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/recruit/Input";
import { API_BASE_URL } from "../../constants/api";

// 헬퍼 함수: 하이픈 자동 포맷 (InfoPage와 동일)
const formatPhoneNumber = (value: string) => {
  if (!value) return "";
  if (/[^\d-]/.test(value)) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const cp = phoneNumber.length;
  if (cp < 4) return phoneNumber;
  if (cp < 8) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  if (cp < 12)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

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
  const [authError, setAuthError] = useState(""); // 🔥 커스텀 에러 상태 추가
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 1. 전화번호 처리 로직
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, [name]: value.slice(0, 13) }));

      const pure = value.replace(/[^\d]/g, "");
      const hasNonDigit = /[^\d-]/.test(value);

      if (
        value.length > 0 &&
        (hasNonDigit || (pure.length > 0 && pure.length < 11))
      ) {
        setPhoneError("올바른 형식을 입력해주세요.");
      } else {
        setPhoneError("");
      }
    }
    // 2. 비밀번호 마스킹 가로채기 로직 (별표 무시하고 진짜 값만 저장)
    else if (name === "password" || name === "passwordConfirm") {
      const prevVal = formData[name];
      let realNewValue = prevVal;

      if (value.length < prevVal.length) {
        realNewValue = prevVal.slice(0, value.length);
      } else if (value.length > prevVal.length) {
        realNewValue = prevVal + value.slice(-1);
      }

      setFormData((prev) => ({ ...prev, [name]: realNewValue }));
    }
    // 3. 기타 일반 필드 (인증번호 등)
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isPhoneValid = /^[0-9]{11}$/.test(formData.phone.replace(/[^\d]/g, ""));
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

  const handleSendAuth = async () => {
    if (!isPhoneValid) {
      setPhoneError("올바른 형식을 입력해주세요.");
      return;
    }
    setPhoneError("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/verification/application-modification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: formData.phone }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setAuthStatus("sent");
        setAuthGuide(
          authStatus === "idle"
            ? "인증번호가 전송되었습니다."
            : "인증번호가 재전송되었습니다.",
        );
        setFormData((prev) => ({ ...prev, authCode: "" }));
        setAuthError("");
      } else {
        if (result.code === "APPLICATION_NOT_EXISTS") {
          setPhoneError(
            "해당 전화번호로 등록된 지원서를 찾을 수 없습니다. 번호를 다시 확인해주세요.",
          );
        } else {
          setPhoneError(result.message || "인증번호 전송에 실패했습니다.");
        }
        setAuthStatus("idle");
      }
    } catch (error) {
      setPhoneError("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  const handleVerifyAuth = async () => {
    // 💡 방어 코드: 번호를 보낸 적이 없는데(idle) 확인을 누르려고 하면 차단
    if (authStatus === "idle") {
      setAuthError("먼저 인증번호 전송 버튼을 눌러주세요.");
      return;
    }

    if (!formData.authCode) return;
    setAuthError("");

    try {
      const response = await fetch(`${API_BASE_URL}/verification/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phone,
          code: Number(formData.authCode),
        }),
      });

      const result = await response.json(); // 응답 데이터 확인

      if (response.ok && result.success) {
        setAuthStatus("verified");
        setAuthError("");
      } else {
        // 서버에서 success: false를 주거나 HTTP 에러가 날 때
        setAuthError(result.message || "인증번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error(error);
      setAuthError("인증 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      // 1. 비밀번호 재설정 API 호출
      const resetResponse = await fetch(`${API_BASE_URL}/password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phone,
          password: formData.password,
        }),
      });

      const resetResult = await resetResponse.json();

      if (resetResponse.ok && resetResult.success) {
        // 2. 🔥 자동 로그인 처리 (백엔드에 새 비밀번호로 로그인 요청)
        const loginResponse = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: formData.phone.replace(/[^\d]/g, ""),
            password: formData.password,
          }),
        });

        const loginResult = await loginResponse.json();

        if (loginResponse.ok && loginResult.success) {
          // 로그인 성공 시 받은 데이터 활용
          const { applicationPublicId, passwordLength } = loginResult.data;

          localStorage.setItem("applicationId", applicationPublicId);
          alert("비밀번호가 변경되었습니다. 작성 중이던 페이지로 이동합니다.");

          // 3. 작성 페이지로 이동
          navigate("/recruit/apply", {
            state: {
              applicationId: applicationPublicId,
              passwordLength: passwordLength,
            },
            replace: true,
          });
        } else {
          // 비밀번호는 바꿨는데 로그인이 실패한 경우 (예외 상황)
          alert("비밀번호는 변경되었습니다. 다시 로그인해 주세요.");
          navigate("/recruit");
        }
      } else {
        alert(`변경 실패: ${resetResult.message || "다시 시도해 주세요."}`);
      }
    } catch (error) {
      console.error("처리 중 오류:", error);
      alert("서버 연결 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col max-w-[800px] mx-auto pt-[100px] pb-20 font-pretendard px-4">
      <h1 className="text-[20px] md:text-[28px] lg:text-[32px] font-semibold mb-[32px] md:mb-[40px]">
        비밀번호 찾기
      </h1>

      <div className="flex flex-col gap-10 w-full">
        {/* 전화번호 */}
        <Input
          label="전화번호"
          name="phone"
          required
          placeholder="전화번호를 입력해 주세요."
          buttonText={authStatus === "idle" ? "인증번호 전송" : "재전송"}
          buttonActive={isPhoneValid}
          buttonDisabled={!isPhoneValid}
          onButtonClick={handleSendAuth}
          onChange={handleChange}
          value={formatPhoneNumber(formData.phone)} // 🔥 하이픈 포맷 적용
          isError={!!phoneError}
          errorText={phoneError}
          guideText={authGuide || "숫자 11자리"}
        />

        {/* 인증번호 */}
        <Input
          label="인증번호"
          name="authCode"
          required
          placeholder="인증번호를 입력해 주세요."
          buttonText={authStatus === "verified" ? "인증완료" : "인증번호 확인"}
          // 1. 비활성화 상태 (회색): 전송 전(idle), 인증 완료(verified), 혹은 입력값이 없을 때
          buttonDisabled={
            authStatus === "idle" ||
            authStatus === "verified" ||
            !formData.authCode
          }
          // 2. 활성화 상태 (검은색): 반드시 "전송됨(sent)" 상태이면서 입력값이 있을 때만!
          buttonActive={authStatus === "sent" && formData.authCode.length > 0}
          onButtonClick={handleVerifyAuth}
          onChange={(e) => {
            handleChange(e);
            if (authError) setAuthError("");
          }}
          value={formData.authCode}
          isError={!!authError}
          errorText={authError}
          guideText={authStatus === "verified" ? "인증이 완료되었습니다." : ""}
        />

        {/* 새 비밀번호 */}
        <Input
          label="비밀번호"
          name="password"
          type="password"
          required
          placeholder="비밀번호를 입력해 주세요."
          onChange={handleChange}
          value={formData.password}
          isError={formData.password.length > 0 && !isPasswordValid}
          errorText="올바른 형식을 입력해주세요." // 🔥 빨간 글씨 통일
          guideText="영문·숫자 조합 8~20자"
        />

        {/* 비밀번호 확인 */}
        <Input
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          required
          placeholder="비밀번호를 재입력해 주세요."
          onChange={handleChange}
          value={formData.passwordConfirm}
          isError={formData.passwordConfirm.length > 0 && !isPasswordMatch}
          errorText="비밀번호가 올바르지 않습니다. 다시 입력해 주세요." // 🔥 빨간 글씨 통일
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`w-full lg:mt-[60px] md:mt-[40px] mt-[32px] md:h-[60px] rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all px-[24px] py-[10px]
          ${isFormValid ? "bg-[rgba(18,18,18,0.80)] text-white cursor-pointer" : "bg-black text-white cursor-not-allowed opacity-20"}`}
      >
        확인하기
      </button>
    </div>
  );
};

export default FindPasswordPage;
