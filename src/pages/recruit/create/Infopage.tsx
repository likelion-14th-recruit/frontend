import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import Input from "../../../components/recruit/Input";
import ConfirmModal from "../../../components/recruit/ConfirmModal";

const ACADEMIC_STATUS_MAP = {
  재학: "ENROLLED",
  휴학: "ON_LEAVE",
  "졸업 유예": "GRADUATION_DEFERRED",
  졸업: "GRADUATED",
};

const PART_MAP = {
  "기획·디자인": "PRODUCT_DESIGN",
  프론트엔드: "FRONTEND",
  백엔드: "BACKEND",
};

// 상단에 역매핑 객체 추가
const STATUS_REVERSE_MAP = {
  ENROLLED: "재학",
  ON_LEAVE: "휴학",
  GRADUATION_DEFERRED: "졸업 유예",
  GRADUATED: "졸업",
};

const PART_REVERSE_MAP = {
  PRODUCT_DESIGN: "기획·디자인",
  FRONTEND: "프론트엔드",
  BACKEND: "백엔드",
};

const InfoPage = () => {
  const location = useLocation();

  // 1. 이전 페이지(로그인 등)에서 넘어온 데이터 확인
  // 만약 state가 없다면 localStorage 등을 활용하는 로직이 추가로 필요할 수 있습니다.
  const { applicationId, passwordLength } = location.state || {};
  const navigate = useNavigate();
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);

  const {
    formData,
    setFormData,
    authStatus,
    setAuthStatus,
    authGuide,
    setAuthGuide,
  } = useOutletContext();

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

  useEffect(() => {
    console.log(
      "📍 useEffect 실행됨! ID:",
      applicationId,
      "Length:",
      passwordLength,
    );
    if (applicationId && passwordLength) {
      fetchUserInfo();
    } else {
      console.warn("⚠️ ID나 비밀번호 길이가 없어서 API를 호출하지 않음");
    }
  }, [applicationId]); // passwordLength도 의존성 배열에 추가하는 게 안전해!

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(
        `/api/applications/${applicationId}?password-length=${passwordLength}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        console.log("✅ 기존 인적사항 로드 성공:", result.data);

        const d = result.data;

        // 🔥 서정의 formData 필드명에 맞춰서 매핑!
        setFormData({
          name: d.name || "",
          studentId: d.studentNumber || "", // 서버는 studentNumber로 줄 거야
          phone: d.phoneNumber || "", // 서버는 phoneNumber로 줄 거야
          password: "",
          passwordConfirm: "",
          major: d.major || "",
          minor: d.doubleMajor || "", // 서버는 doubleMajor로 줄 거야
          status: STATUS_REVERSE_MAP[d.academicStatus] || "",
          term: d.semester ? String(d.semester) : "",
          field: PART_REVERSE_MAP[d.part] || "",
          authCode: "VERIFIED", // 이미 불러온 데이터니까 인증된 걸로 간주
        });

        // 🚀 불러오기 성공했으니 인증 상태를 완료로 바꿔야 '다음으로' 버튼이 활성화돼!
        setAuthStatus("verified");
      } else {
        console.error("❌ 데이터 불러오기 실패:", result.message);
      }
    } catch (error) {
      console.error("❌ 서버 통신 오류:", error);
    }
  };

  const isStudentIdValid = /^[0-9]{8}$/.test(formData.studentId);
  const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(
    formData.password,
  );
  const isPhoneValid = /^[0-9]{11}$/.test(formData.phone);
  const isTermValid = /^[0-9]+$/.test(formData.term);

  const errors = {
    passwordConfirm:
      formData.passwordConfirm.length > 0 &&
      formData.password !== formData.passwordConfirm
        ? "비밀번호가 일치하지 않습니다."
        : "",
    term:
      formData.term.length > 0 && !isTermValid ? "숫자만 입력" : "숫자만 입력",
  };

  // InfoPage.tsx

  // 수정 모드인지 확인 (ID가 있으면 수정 모드)
  const isEditMode = !!applicationId;

  const isFormValid =
    formData.name.trim() !== "" &&
    isStudentIdValid &&
    isPhoneValid &&
    authStatus === "verified" &&
    // 🔥 수정 모드라면 비밀번호가 비어있어도 통과! (새로 쓸 때만 필수 체크)
    (isEditMode ||
      (isPasswordValid && formData.password === formData.passwordConfirm)) &&
    formData.major.trim() !== "" &&
    formData.status !== "" &&
    isTermValid &&
    formData.field !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendAuth = async () => {
    if (!isPhoneValid) return;
    const API_URL = "/api/verification";
    try {
      const response = await fetch(API_URL, {
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
    const API_URL = "/api/verification/confirm";
    try {
      const response = await fetch(API_URL, {
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
    const requiredFields = [
      { key: "name", ref: inputRefs.name },
      { key: "studentId", ref: inputRefs.studentId },
      { key: "phone", ref: inputRefs.phone },
      { key: "authCode", ref: inputRefs.authCode },
      // 🔥 여기가 핵심! 수정 모드(isEditMode)가 아닐 때만 비밀번호를 필수 체크함
      ...(isEditMode
        ? []
        : [
            { key: "password", ref: inputRefs.password },
            { key: "passwordConfirm", ref: inputRefs.passwordConfirm },
          ]),
      { key: "major", ref: inputRefs.major },
      { key: "status", ref: inputRefs.status },
      { key: "term", ref: inputRefs.term },
      { key: "field", ref: inputRefs.field },
    ];

    // 2. 미입력 필드 스크롤 체크
    for (const field of requiredFields) {
      if (!formData[field.key]) {
        field.ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        field.ref.current?.focus?.();
        return; // ⚠️ 여기서 걸려서 밑으로 못 내려갔던 거야!
      }
    }

    if (isFormValid) {
      const mappedPart = PART_MAP[formData.field];

      // 🔍 여기서 로그를 찍어서 mappedPart가 undefined인지 꼭 확인해봐!
      console.log("선택된 필드:", formData.field);
      console.log("서버로 보낼 파트 코드:", mappedPart);

      const requestData = {
        name: formData.name,
        studentNumber: formData.studentId,
        phoneNumber: formData.phone,
        major: formData.major,
        doubleMajor: formData.minor || "",
        semester: Number(formData.term),
        academicStatus: ACADEMIC_STATUS_MAP[formData.status],
        part: PART_MAP[formData.field],
      };

      // 💡 서버가 "key"라는 봉투를 원한다면:
      const bodyData = isEditMode ? { key: requestData } : requestData;

      // 💡 만약 위 구조로 보냈는데 SUCCESS만 뜨고 데이터가 안 바뀐다면, 아래처럼 그냥 보내보세요:
      // const bodyData = requestData;

      try {
        // 🔥 2. 수정 모드에 따른 URL 및 설정 분기
        const url = isEditMode
          ? `/api/applications/${applicationId}`
          : "/api/applications";

        const method = isEditMode ? "PATCH" : "POST";

        // 새로 만드는 POST일 때만 password 추가
        if (!isEditMode) {
          requestData.password = formData.password;
        }

        const response = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          // 서버 예시가 { "key": { ... } } 라면 아래처럼 감싸서 보내기
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const result = await response.json();
          const publicId = result.data?.publicId || applicationId;

          // 🔥 [핵심] 수정사항을 Context에 즉시 반영
          setFormData({
            ...formData,
            name: formData.name,
            studentId: formData.studentId,
            phone: formData.phone,
            major: formData.major,
            minor: formData.minor,
            status: formData.status,
            term: formData.term,
            field: formData.field,
          });

          console.log("✅ Context 업데이트 완료! 다음 페이지로 이동합니다.");

          navigate("/recruit/apply", {
            state: {
              field: formData.field, // ApplyPage에서 바로 쓸 수 있게 전달
              applicationId: publicId,
              passwordLength: passwordLength,
            },
          });
        } else {
          const errorData = await response.json();
          alert(`저장 실패: ${errorData.message}`);
        }
      } catch (error) {
        console.error("네트워크 에러:", error);
        alert("서버 연결 오류가 발생했습니다.");
      }
    }
  };

  const handleBackClick = () => {
    setIsBackModalOpen(true);
  };

  return (
    <div className="flex flex-col max-w-[800px] mx-auto pb-20 font-pretendard">
      <div className="flex flex-col gap-10 w-full">
        <Input
          label="이름"
          name="name"
          required
          ref={inputRefs.name}
          placeholder="이름을 입력해 주세요."
          onChange={handleChange}
          value={formData.name}
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
          value={formData.studentId}
        />
        <Input
          label="전화번호"
          name="phone"
          required
          ref={inputRefs.phone}
          placeholder="전화번호를 입력해 주세요."
          buttonText={authStatus === "idle" ? "인증번호 전송" : "재전송"}
          buttonActive={isPhoneValid}
          buttonDisabled={!isPhoneValid}
          onButtonClick={handleSendAuth}
          onChange={handleChange}
          guideText={authGuide || "숫자 11자리"}
          isError={formData.phone.length > 0 && !isPhoneValid}
          value={formData.phone}
        />
        <Input
          label="인증번호"
          name="authCode"
          required
          ref={inputRefs.authCode}
          placeholder="인증번호를 입력해 주세요."
          buttonText={authStatus === "verified" ? "인증완료" : "인증번호 확인"}
          buttonActive={authStatus === "sent" && formData.authCode.length > 0}
          buttonDisabled={authStatus === "verified" || !formData.authCode}
          onButtonClick={handleVerifyAuth}
          onChange={handleChange}
          guideText={authStatus === "verified" ? "인증이 완료되었습니다." : ""}
          value={formData.authCode}
        />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          required
          ref={inputRefs.password}
          placeholder={
            isEditMode
              ? "변경 시에만 입력해 주세요."
              : "비밀번호를 입력해 주세요."
          }
          guideText="영문·숫자 조합 8~20자"
          isError={formData.password.length > 0 && !isPasswordValid}
          onChange={handleChange}
          value={formData.password}
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
          value={formData.passwordConfirm}
        />
        <Input
          label="주전공"
          name="major"
          required
          ref={inputRefs.major}
          placeholder="주전공을 입력해 주세요."
          onChange={handleChange}
          value={formData.major}
        />
        <Input
          label="부전공"
          name="minor"
          placeholder="부전공을 입력해 주세요."
          onChange={handleChange}
          value={formData.minor}
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
          value={formData.term}
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
          onClick={handleBackClick}
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

      <ConfirmModal
        isOpen={isBackModalOpen}
        onClose={() => setIsBackModalOpen(false)}
        onConfirm={() => navigate("/recruit/terms")}
        message={
          <>
            이전 단계로 이동하게 되면 지금까지 입력한 내용이
            <br />
            모두 사라집니다. 계속 진행하시겠습니까?
          </>
        }
      />
    </div>
  );
};

export default InfoPage;
