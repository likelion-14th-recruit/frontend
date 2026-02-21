import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import Input from "../../../components/recruit/Input";
import ConfirmModal from "../../../components/recruit/ConfirmModal";

// 숫자만 추출해서 010-0000-0000 형식으로 변환하는 함수
const formatPhoneNumber = (value: string) => {
  if (!value) return "";
  const phoneNumber = value.replace(/[^\d]/g, ""); // 숫자 외 제거
  const cp = phoneNumber.length;

  const hasNonDoc = /[^\d]/.test(value.replace(/-/g, ""));
  if (hasNonDoc) return value;

  if (cp < 4) return phoneNumber;
  if (cp < 8) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  if (cp < 12)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

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
  const { applicationId, passwordLength } = location.state || {};
  const navigate = useNavigate();

  // 🔥 1. 수정 모드 여부 (가장 먼저 선언)
  const isEditMode = !!applicationId;

  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  const {
    formData,
    setFormData,
    authStatus,
    setAuthStatus,
    authGuide,
    setAuthGuide,
  } = useOutletContext();

  // 🔥 2. 유효성 검사 로직 (오타 수정 및 통합)
  const isStudentIdValid = /^[0-9]{8}$/.test(formData.studentId);

  // 수정 모드일 때는 별표가 들어오므로 무조건 통과, 아닐 때만 정규식 체크
  const isPasswordValid = isEditMode
    ? true
    : /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(formData.password);

  const isPasswordMatch = isEditMode
    ? true
    : formData.password === formData.passwordConfirm &&
      formData.password !== "";

  const isPhoneValid = /^[0-9]{11}$/.test(formData.phone.replace(/[^\d]/g, ""));
  const isTermValid = /^[0-9]+$/.test(formData.term);

  // 에러 메시지 처리용 (기존 로직 유지)
  const errors = {
    passwordConfirm:
      !isEditMode &&
      formData.passwordConfirm.length > 0 &&
      formData.password !== formData.passwordConfirm
        ? "비밀번호가 일치하지 않습니다."
        : "",
    term: formData.term.length > 0 && !isTermValid ? "숫자만 입력" : "",
  };

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

        // 🔥 [필독] 서버 필드명(d.xxx)을 서정님의 폼 필드명(이름)으로 1:1 매칭합니다.
        setFormData({
          name: d.name || "",
          studentId: d.studentNumber || "", // 서버는 studentNumber로 줍니다.
          phone: d.phoneNumber || "", // 서버는 phoneNumber로 줍니다.
          password: "*".repeat(passwordLength || 8),
          passwordConfirm: "*".repeat(passwordLength || 8),
          major: d.major || "",
          minor: d.doubleMajor || "", // 서버는 doubleMajor로 줍니다.
          status: STATUS_REVERSE_MAP[d.academicStatus] || "",
          term: d.semester !== undefined ? String(d.semester) : "", // 서버는 semester로 줍니다.
          field: PART_REVERSE_MAP[d.part] || "",
          authCode: "********",
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

  // 폼에 입력된 내용이 있는지 확인하는 변수
  const isDirty = Object.values(formData).some(
    (val) => val !== "" && val !== "VERIFIED",
  );

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ""; // 브라우저 기본 경고창 유도
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const isFormValid =
    formData.name.trim() !== "" &&
    isStudentIdValid &&
    isPhoneValid &&
    authStatus === "verified" &&
    (isEditMode || (isPasswordValid && isPasswordMatch)) &&
    formData.major.trim() !== "" &&
    formData.status !== "" &&
    isTermValid &&
    formData.field !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (value.length <= 13) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
    // 🔥 비밀번호 필드 가로채기 로직 추가
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
    // 🔥 일반 필드(이름, 학번 등)는 displayValue 로직을 타지 않게 그냥 저장
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
    setAuthError("");

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
        setAuthError("인증번호가 올바르지 않습니다. 다시 입력해 주세요.");
      }
    } catch (error) {
      setAuthError(
        "서버와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.",
      );
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
      let requestData: any;

      if (!isEditMode) {
        // [생성하기 POST] 명세에 맞춤
        requestData = {
          name: formData.name,
          studentNumber: formData.studentId,
          phoneNumber: formData.phone.replace(/[^\d]/g, ""), // 하이픈 제거
          password: formData.password,
          major: formData.major,
          doubleMajor: formData.minor || "",
          semester: Number(formData.term),
          academicStatus: ACADEMIC_STATUS_MAP[formData.status],
          part: PART_MAP[formData.field],
        };
      } else {
        // [수정하기 PATCH] 명세에 따라 phone, password 제외!!
        requestData = {
          name: formData.name,
          studentNumber: formData.studentId,
          major: formData.major,
          doubleMajor: formData.minor || "",
          academicStatus: ACADEMIC_STATUS_MAP[formData.status],
          semester: Number(formData.term),
          part: PART_MAP[formData.field],
        };
      }

      try {
        // 🔥 2. 수정 모드에 따른 URL 및 설정 분기
        const url = isEditMode
          ? `/api/applications/${applicationId}`
          : "/api/applications";

        const method = isEditMode ? "PATCH" : "POST";

        const response = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          // 서버 예시가 { "key": { ... } } 라면 아래처럼 감싸서 보내기
          body: JSON.stringify(requestData),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          const publicId = result.data?.applicationPublicId || applicationId;

          // 🔥 [핵심] 수정사항을 Context에 즉시 반영
          setFormData({ ...formData });

          // 🔥 2. 신규 생성일 때만 모달 띄우기
          if (!isEditMode) {
            setInfoModal({
              isOpen: true,
              message:
                "지원서가 자동으로 생성 및 저장되었습니다. 이후에도 수정 및 임시 저장이 가능합니다.",
              isSingleButton: true,
              onConfirm: () => {
                setInfoModal((prev) => ({ ...prev, isOpen: false }));
                navigate("/recruit/apply", {
                  state: {
                    field: formData.field,
                    applicationId: publicId,
                    passwordLength: formData.password.length,
                  },
                });
              },
            });
          } else {
            // 🔥 3. 수정 모드일 때는 모달 없이 바로 이동
            navigate("/recruit/apply", {
              state: {
                field: formData.field,
                applicationId: publicId,
                passwordLength: passwordLength,
              },
            });
          }

          // 🔥 1. 이미 최종 제출을 완료한 경우
        } else if (result.code === "APPLICATION_ALREADY_SUBMITTED") {
          setInfoModal({
            isOpen: true,
            message: "이미 제출된 지원서가 있어 추가 제출이 불가합니다.\n ",
            onConfirm: () => navigate("/recruit"),
          });
        }
        // 🔥 2. 임시 저장된 지원서가 있는 경우 (APPLICATION_ALREADY_EXISTS)
        else if (
          result.code === "APPLICATION_ALREADY_EXISTS" ||
          response.status === 409
        ) {
          setInfoModal({
            isOpen: true,
            message:
              "이미 임시 저장된 지원서가 있어, 새로 생성할 수 없습니다.\n기존 지원서를 수정해 주세요.",
            onConfirm: () => navigate("/recruit/start"), // 혹은 로그인/조회 페이지로 이동
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
    if (isDirty) {
      setIsBackModalOpen(true);
    } else {
      navigate("/recruit/terms"); // 입력한 게 없으면 바로 이동
    }
  };

  return (
    <div className="flex flex-col lg:max-w-[800px] md:max-w-[700px] mx-auto px-[20px] md:px-0 pb-[40px] font-pretendard">
      <div className="flex flex-col gap-[32px] mobile:gap-[16px] w-full">
        <Input
          label="이름"
          name="name"
          required
          readOnly={isEditMode}
          ref={inputRefs.name}
          placeholder="이름을 입력해 주세요."
          onChange={handleChange}
          value={formData.name}
          type="text"
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
          type="text"
        />
        {/* 전화번호 */}
        <Input
          label="전화번호"
          name="phone"
          required
          readOnly={isEditMode}
          ref={inputRefs.phone}
          placeholder="전화번호를 입력해 주세요."
          buttonText={authStatus === "idle" ? "인증번호 전송" : "재전송"}
          buttonActive={isPhoneValid && !isEditMode}
          buttonDisabled={!isPhoneValid || isEditMode} // 🔥 readonly일 때 재전송 금지
          onButtonClick={handleSendAuth}
          onChange={handleChange}
          guideText={isEditMode ? "" : authGuide || "숫자 11자리"}
          isError={!isEditMode && formData.phone.length > 0 && !isPhoneValid}
          errorText="올바른 형식을 입력해주세요."
          value={formatPhoneNumber(formData.phone)}
          maxLength={13}
        />

        {/* 인증번호 */}
        <Input
          label="인증번호"
          name="authCode"
          type="text" // 🔥 반드시 type을 "text"로 명시해서 비밀번호 로직과 분리!
          required
          readOnly={isEditMode}
          ref={inputRefs.authCode}
          placeholder="인증번호를 입력해 주세요."
          buttonText={authStatus === "verified" ? "인증완료" : "인증번호 확인"}
          buttonActive={authStatus === "sent" && formData.authCode.length > 0}
          buttonDisabled={
            authStatus === "verified" || !formData.authCode || isEditMode
          }
          onButtonClick={handleVerifyAuth}
          onChange={(e) => {
            handleChange(e);
            if (authError) setAuthError("");
          }}
          isError={!!authError}
          errorText={authError}
          value={formData.authCode} // 마스킹 없는 실제 값을 그대로 보여줍니다.
          guideText={
            isEditMode
              ? "인증이 완료된 번호입니다."
              : authStatus === "verified"
                ? "인증이 완료되었습니다."
                : ""
          }
        />

        {/* 비밀번호 */}
        <Input
          label="비밀번호"
          name="password"
          type="password"
          required
          readOnly={isEditMode}
          ref={inputRefs.password}
          placeholder={isEditMode ? "" : "비밀번호를 입력해 주세요."}
          guideText={
            isEditMode
              ? "비밀번호는 보안을 위해 가려져 있습니다."
              : "영문·숫자 조합 8~20자"
          }
          // 🔥 !isEditMode를 붙여서 수정 모드일 땐 별표 에러 안 뜨게 함
          isError={
            !isEditMode && formData.password.length > 0 && !isPasswordValid
          }
          onChange={handleChange}
          value={formData.password}
        />

        {/* 비밀번호 확인 */}
        <Input
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          required
          readOnly={isEditMode}
          ref={inputRefs.passwordConfirm}
          placeholder={isEditMode ? "" : "비밀번호를 재입력해주세요."}
          // 🔥 !isEditMode를 붙여서 수정 모드일 땐 별표 에러 안 뜨게 함
          isError={
            !isEditMode &&
            formData.passwordConfirm.length > 0 &&
            !isPasswordMatch
          }
          errorText="비밀번호가 일치하지 않습니다."
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
          <label className="font-semibold text-[20px] flex items-center">
            현재 학적 상태{" "}
            <img
              src="/recruit/required-icon.svg" // 여기에 파일명 적으세요!
              alt="required"
              className="ml-[6px] w-[10px] h-[10px] md:w-[10px] md:h-[10px] objet-contain"
            />
          </label>
          <div className="grid grid-cols-3 gap-[12px] md:gap-[16px]">
            {["재학", "휴학", "졸업 유예"].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleSelect("status", val)}
                className={`px-[12px] py-[11px] rounded-[12px] text-[16px] font-semibold transition-all ${formData.status === val ? "bg-[rgba(18,18,18,0.80)] text-white" : "bg-[#F0F0F0] text-[rgba(18,18,18,0.60)]"}`}
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
          <label className="font-semibold text-[20px] flex items-center">
            지원 분야{" "}
            <img
              src="/recruit/required-icon.svg" // 여기에 파일명 적으세요!
              alt="required"
              className="ml-[6px] w-[10px] h-[10px] md:w-[10px] md:h-[10px] objet-contain"
            />
          </label>
          <div className="grid grid-cols-3 gap-[12px] md:gap-[16px]">
            {["백엔드", "프론트엔드", "기획·디자인"].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleSelect("field", val)}
                className={`px-[12px] py-[11px] rounded-[12px] text-[16px] font-semibold transition-all ${formData.field === val ? "bg-[rgba(18,18,18,0.80)] text-white" : "bg-[#F0F0F0] text-[rgba(18,18,18,0.60)]"}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="lg:mt-[60px] md:mt-[40px] mt-[32px] flex gap-[12px] md:gap-[16px] w-full">
        <button
          type="button"
          onClick={handleBackClick}
          className="flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] 
                   border border-[rgba(18,18,18,0.40)] bg-white text-[rgba(18,18,18,0.80)] 
                   rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all hover:bg-[#f0f0f0]"
        >
          이전으로
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`relative overflow-hidden flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] 
                   rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all 
                   ${
                     isFormValid
                       ? "bg-[rgba(18,18,18,0.80)] text-white cursor-pointer" +
                         "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-0 hover:after:opacity-20 transition-all"
                       : "bg-[rgba(18,18,18,0.20)] text-white cursor-not-allowed"
                   } hover:bg-[#000/20]"}`}
        >
          다음으로
        </button>
      </footer>

      <ConfirmModal
        isOpen={isBackModalOpen}
        onClose={() => setIsBackModalOpen(false)}
        onConfirm={() => {
          setIsBackModalOpen(false);
          navigate("/recruit/terms");
        }}
        isInfoPage={true}
        message={
          <>
            이전 단계로 이동하게 되면 지금까지 입력한 내용이 모두 사라집니다.
            계속 진행하시겠습니까?
          </>
        }
        confirmText="계속 진행"
      />

      <ConfirmModal
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal({ ...infoModal, isOpen: false })}
        onConfirm={infoModal.onConfirm}
        message={infoModal.message}
        isSingleButton={true}
      />
    </div>
  );
};

export default InfoPage;
