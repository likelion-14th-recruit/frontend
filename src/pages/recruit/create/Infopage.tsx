import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "../../../components/recruit/Input";

const InfoPage = () => {
  const navigate = useNavigate();

  // 🔥 1. 부모(RecruitLayout)가 Outlet을 통해 전달한 데이터와 함수들을 가져옵니다.
  const {
    formData,
    setFormData,
    authStatus,
    setAuthStatus,
    authGuide,
    setAuthGuide,
  } = useOutletContext();

  // 1. 미입력 시 스크롤 이동을 위한 Ref
  const inputRefs = {
    name: useRef(null),
    studentId: useRef(null),
    phone: useRef(null),
    authCode: useRef(null),
    password: useRef(null),
    passwordConfirm: useRef(null),
    major: useRef(null),
    status: useRef(null),
    term: useRef(null),
    field: useRef(null),
  };

  // 유효성 검사 정규식
  const isStudentIdValid = /^[0-9]{8}$/.test(formData.studentId);
  const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(
    formData.password,
  );
  const isPhoneValid = /^[0-9]{11}$/.test(formData.phone);
  const isTermValid = /^[0-9]+$/.test(formData.term);

  // 에러 메시지 가이드
  const errors = {
    studentId:
      formData.studentId.length > 0 && !isStudentIdValid
        ? "숫자 8자리"
        : "숫자 8자리",
    phone:
      formData.phone.length > 0 && !isPhoneValid
        ? "숫자 11자리"
        : "숫자 11자리",
    passwordConfirm:
      formData.passwordConfirm.length > 0 &&
      formData.password !== formData.passwordConfirm
        ? "비밀번호가 일치하지 않습니다."
        : "",
    term:
      formData.term.length > 0 && !isTermValid ? "숫자만 입력" : "숫자만 입력",
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    isStudentIdValid &&
    isPhoneValid &&
    authStatus === "verified" &&
    isPasswordValid &&
    formData.password === formData.passwordConfirm &&
    formData.major.trim() !== "" &&
    formData.status !== "" &&
    isTermValid &&
    formData.field !== "";

  // 핸들러 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1. 인증번호 전송 함수 (authGuide는 전송용으로만 사용)
  const handleSendAuth = () => {
    if (authStatus === "sent") {
      setAuthGuide("인증번호가 재전송되었습니다.");
    } else {
      setAuthStatus("sent");
      setAuthGuide("인증번호가 전송되었습니다.");
    }
  };

  // 2. 인증 확인 함수 (여기서 setAuthGuide를 절대 하지 마세요!)
  const handleVerifyAuth = () => {
    if (formData.authCode.length > 0) {
      setAuthStatus("verified");
      // setAuthGuide("인증이 완료되었습니다."); <- 이 줄이 있으면 전화번호 칸까지 바뀝니다. 삭제하세요!
    }
  };

  const handleSubmit = () => {
    const requiredFields = [
      { key: "name", ref: inputRefs.name },
      { key: "studentId", ref: inputRefs.studentId },
      { key: "phone", ref: inputRefs.phone },
      { key: "authCode", ref: inputRefs.authCode },
      { key: "password", ref: inputRefs.password },
      { key: "passwordConfirm", ref: inputRefs.passwordConfirm },
      { key: "major", ref: inputRefs.major },
      { key: "status", ref: inputRefs.status },
      { key: "term", ref: inputRefs.term },
      { key: "field", ref: inputRefs.field },
    ];

    for (const field of requiredFields) {
      if (!formData[field.key]) {
        field.ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        field.ref.current?.focus?.();
        return;
      }
    }

    if (isFormValid) {
      navigate("/recruit/apply", { state: { field: formData.field } });
    }
  };

  return (
    <div className="flex flex-col max-w-[800px] mx-auto pb-20 font-pretendard">
      <div className="flex flex-col gap-10 w-full">
        {/* 모든 Input에 value={formData.필드명} 이 있어야 부모 데이터를 화면에 그립니다 */}
        <Input
          label="이름"
          name="name"
          required
          ref={inputRefs.name}
          placeholder="이름을 입력해 주세요."
          onChange={handleChange}
          value={formData.name} // 🔥 추가
        />
        <Input
          label="학번"
          name="studentId"
          required
          ref={inputRefs.studentId}
          placeholder="학번을 입력해주세요."
          guideText="숫자 8자리"
          isError={formData.studentId.length > 0 && !isStudentIdValid}
          onChange={handleChange}
          value={formData.studentId} // 🔥 추가
        />
        <Input
          label="전화번호"
          name="phone"
          required
          ref={inputRefs.phone}
          placeholder="전화번호를 입력해 주세요."
          buttonText={authStatus === "idle" ? "인증번호 전송" : "재전송"}
          buttonActive={isPhoneValid && authStatus !== "verified"}
          buttonDisabled={!isPhoneValid || authStatus === "verified"}
          onButtonClick={handleSendAuth}
          onChange={handleChange}
          guideText={authGuide || "숫자 11자리"}
          isError={formData.phone.length > 0 && !isPhoneValid}
          value={formData.phone} // 🔥 추가
        />
        <Input
          label="인증번호"
          name="authCode"
          required
          ref={inputRefs.authCode}
          placeholder="인증번호를 입력해 주세요."
          buttonText={authStatus === "verified" ? "인증완료" : "인증번호 확인"}
          buttonDisabled={authStatus === "verified" || !formData.authCode}
          buttonActive={
            formData.authCode.length > 0 && authStatus !== "verified"
          }
          onButtonClick={handleVerifyAuth}
          onChange={handleChange}
          guideText={authStatus === "verified" ? "인증이 완료되었습니다." : ""}
          value={formData.authCode} // 🔥 추가
        />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          required
          ref={inputRefs.password}
          placeholder="비밀번호를 입력해주세요."
          guideText="영문·숫자 조합 8~20자"
          isError={formData.password.length > 0 && !isPasswordValid}
          onChange={handleChange}
          value={formData.password} // 🔥 추가
        />
        <Input
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          required
          ref={inputRefs.passwordConfirm}
          placeholder="비밀번호를 재입력해주세요."
          guideText={errors.passwordConfirm}
          isError={
            formData.passwordConfirm.length > 0 &&
            formData.password !== formData.passwordConfirm
          }
          onChange={handleChange}
          value={formData.passwordConfirm} // 🔥 추가
        />
        <Input
          label="주전공"
          name="major"
          required
          ref={inputRefs.major}
          placeholder="주전공을 입력해 주세요."
          onChange={handleChange}
          value={formData.major} // 🔥 추가
        />
        <Input
          label="부전공"
          name="minor"
          placeholder="부전공을 입력해 주세요."
          onChange={handleChange}
          value={formData.minor} // 🔥 추가
        />

        <div className="flex flex-col gap-3" ref={inputRefs.status}>
          <label className="font-bold text-[20px]">
            현재 학적 상태 <span className="text-[#b90000]">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            {["재학", "휴학", "졸업 유예"].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleSelect("status", val)}
                className={`py-4 rounded-[10px] text-[15px] font-bold transition-all ${formData.status === val ? "bg-[#000] text-white" : "bg-[#f2f2f2] text-[#999] hover:bg-gray-200"}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="이수 학기"
          name="term"
          required
          ref={inputRefs.term}
          guideText={errors.term}
          isError={formData.term.length > 0 && !isTermValid}
          placeholder="이수 학기를 입력해 주세요."
          onChange={handleChange}
          value={formData.term} // 🔥 추가
        />

        <div className="flex flex-col gap-3" ref={inputRefs.field}>
          <label className="font-bold text-[20px]">
            지원 분야 <span className="text-[#b90000]">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            {["백엔드", "프론트엔드", "기획·디자인"].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleSelect("field", val)}
                className={`py-4 rounded-[10px] text-[15px] font-bold transition-all ${formData.field === val ? "bg-[#000] text-white" : "bg-[#f2f2f2] text-[#999] hover:bg-gray-200"}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-20 flex gap-4 w-full">
        <button
          type="button"
          onClick={() => navigate("/recruit/terms")}
          className="flex-1 py-5 border border-[#F0F0F0] text-[#666] rounded-[15px] text-lg font-bold"
        >
          이전으로
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={`flex-1 py-5 rounded-[15px] text-lg font-bold transition-all ${isFormValid ? "bg-[#000] text-white cursor-pointer" : "bg-gray-300 text-white cursor-not-allowed"}`}
        >
          다음으로
        </button>
      </footer>
    </div>
  );
};

export default InfoPage;
