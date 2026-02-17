import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

const RecruitLayout = () => {
  const location = useLocation();

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

  const [authStatus, setAuthStatus] = useState("idle");
  const [authGuide, setAuthGuide] = useState("");

  const steps = [
    { id: 1, label: "약관 동의" },
    { id: 2, label: "인적사항 작성" },
    { id: 3, label: "지원서 작성" },
    { id: 4, label: "지원서 제출" },
  ];

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
  const totalSteps = steps.length;
  // 현재 단계의 라벨(이름) 가져오기
  const currentLabel = steps.find((s) => s.id === currentStep)?.label || "";

  return (
    <div className="flex flex-col w-full pt-[60px] md:pt-[80px] font-pretendard">
      {/* 📱 모바일 전용 스텝 표시 (360px ~ 768px 구간) */}
      <div className="flex flex-col items-center md:hidden py-8 min-w-[360px]">
        {/* 숫자 캡슐 */}
        <div className="flex items-center justify-center px-[12px] py-[4px] border border-[#121212] rounded-[20px] bg-white mb-[8px]">
          <span className="text-[16px] font-normal text-[#121212] leading-none">
            {currentStep}
          </span>
          <span className="text-[16px] font-normal text-[#767676] mx-1 leading-none">
            /
          </span>
          <span className="text-[16px] font-normal text-[#767676] leading-none">
            {totalSteps}
          </span>
        </div>
        {/* 단계별 라벨 텍스트 */}
        <span className="text-[20px] font-semibold text-[#121212]">
          {currentLabel}
        </span>
      </div>

      {/* 💻 데스크탑 진행바 영역 (768px 이상) */}
      <div className="hidden md:block w-full py-16 bg-white">
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
