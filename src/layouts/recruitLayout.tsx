import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react"; // 1. useState 추가

const RecruitLayout = () => {
  const location = useLocation();

  // 🔥 2. 자식 페이지(InfoPage 등)의 데이터를 보관할 공통 상태 생성
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    phone: "",
    authCode: "",
    password: "",
    passwordConfirm: "",
    major: "",
    minor: "",
    status: "",
    term: "",
    field: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    link: "",
  });

  // 인증 관련 상태도 부모가 들고 있어야 페이지 이동 시 초기화되지 않습니다.
  const [authStatus, setAuthStatus] = useState("idle");
  const [authGuide, setAuthGuide] = useState("");

  const getStep = () => {
    if (location.pathname.includes("terms")) return 1;
    if (location.pathname.includes("info")) return 2;
    if (location.pathname.includes("apply")) return 3;
    if (
      location.pathname.includes("interview") ||
      location.pathname.includes("complete")
    )
      return 4;
    return 0;
  };

  const currentStep = getStep();

  const steps = [
    { id: 1, label: "약관 동의" },
    { id: 2, label: "인적사항 작성" },
    { id: 3, label: "지원서 작성" },
    { id: 4, label: "지원서 제출" },
  ];

  return (
    <div className="flex flex-col w-full pt-[80px] font-pretendard">
      {/* 상단 진행바 영역 (기존 디자인 유지) */}
      <div className="w-full py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-4 flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index !== steps.length - 1 ? "flex-1" : ""}`}
            >
              <div className="flex flex-col items-center gap-3 relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300
                    ${currentStep >= step.id ? "bg-[#b90000] text-white" : "bg-[#767676] text-white"}`}
                >
                  {step.id}
                </div>
                <span
                  className={`text-[13px] font-semibold whitespace-nowrap transition-all duration-300
                    ${currentStep >= step.id ? "text-[#b90000]" : "text-[#767676]"}`}
                >
                  {step.label}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div className="flex-1 px-6 -translate-y-4">
                  <div
                    className={`border-t-2 border-dashed transition-all duration-500
                      ${currentStep > step.id ? "border-[#b90000]" : "border-[#ccc]"}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 중앙 컨텐츠 영역 */}
      <main className="w-full max-w-[800px] mx-auto px-4">
        {/* 🔥 3. Outlet의 context 속성을 통해 자식들에게 데이터와 수정 함수를 전달합니다. */}
        <Outlet
          context={{
            formData,
            setFormData,
            authStatus,
            setAuthStatus,
            authGuide,
            setAuthGuide,
          }}
        />
      </main>
    </div>
  );
};

export default RecruitLayout;
