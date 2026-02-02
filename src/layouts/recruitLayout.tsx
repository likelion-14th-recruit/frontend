import { Outlet, useLocation } from "react-router-dom";

const RecruitLayout = () => {
  const location = useLocation();

  const getStep = () => {
    if (location.pathname.includes("terms")) return 1;
    if (location.pathname.includes("info")) return 2;
    if (location.pathname.includes("apply")) return 3;
    if (location.pathname.includes("complete")) return 4;
    return 0;
  };

  const currentStep = getStep();

  return (
    // ❌ min-h-screen과 bg-white를 지우거나 줄여보세요.
    // 부모인 MainLayout이 이미 배경과 높이를 잡고 있을 테니까요!
    <div className="flex flex-col w-full pt-[80px]">
      {/* 1. 상단: 리크루트 전용 스텝 바 */}
      <div className="w-full py-6 border-b border-[#eee] bg-white">
        <div className="max-w-[1440px] mx-auto px-10 flex justify-between items-center">
          <span className="font-bold text-lg text-gray-600">지원 단계</span>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold 
                  ${currentStep === step ? "bg-black text-white" : "bg-[#eee] text-[#ccc]"}`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. 중앙 컨텐츠 */}
      <main className="w-full max-w-[1440px] mx-auto px-10 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default RecruitLayout;
