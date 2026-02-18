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
  const currentLabel = steps.find((s) => s.id === currentStep)?.label || "";

  return (
    <div className="flex flex-col w-full pt-[60px] md:pt-[80px] font-pretendard">
      {/* 📱 모바일 전용 스텝 표시 (360px ~ 768px) */}
      <div className="flex flex-col items-center md:hidden py-8 min-w-[360px]">
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
        <span className="text-[20px] font-semibold text-[#121212]">
          {currentLabel}
        </span>
      </div>

      {/* 💻 데스크탑 & 태블릿 진행바 영역 (769px 이상) */}
      <div className="hidden md:block w-full py-16 bg-white">
        {/* 🔥 핵심 수정: 하단 main과 동일한 max-w-[800px]와 px-4 적용 */}
        <div className="max-w-[800px] mx-auto px-[30px] flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index !== steps.length - 1 ? "flex-1" : ""}`}
            >
              {/* 스텝 아이콘 및 라벨 */}
              <div className="flex flex-col items-center gap-[8px] relative z-10">
                <div
                  className={`w-[24px] h-[24px] rounded-full flex items-center justify-center text-[14px] font-semibold transition-all duration-300
                    ${currentStep >= step.id ? "bg-[#b90000] text-white" : "bg-[#767676] text-white"}`}
                >
                  {step.id}
                </div>
                <span
                  className={`text-[16px] font-normal whitespace-nowrap transition-all duration-300
                    ${currentStep >= step.id ? "text-[#b90000]" : "text-[#767676]"}`}
                >
                  {step.label}
                </span>
              </div>

              {/* 스텝 사이의 연결 선 (SVG 대체) */}
              {index !== steps.length - 1 && (
                <div
                  className="
                  /* 공통: 아이콘과의 간격 mx-[20px] */
                  mx-[20px] -translate-y-4 flex items-center flex-1
                "
                >
                  <img
                    src="/public/recruit/line-icon.svg"
                    alt="step line"
                    className={`w-full h-[1px] object-cover transition-all duration-500
                      ${currentStep > step.id ? "opacity-100" : "opacity-30"}`}
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
