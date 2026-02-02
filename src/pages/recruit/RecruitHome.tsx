import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruitActionCard from "../../components/recruit/RecruitActionCard";

const RecruitHome = () => {
  const navigate = useNavigate();
  // 수정하기 클릭 시 띄울 인증 모달 상태
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    /* 1. 배경은 화면 끝까지 차도록 (2560px 대응) */
    <div className="w-full min-h-screen bg-white">
      {/* 2. 컨텐츠를 담는 큰 바구니 */}
      <main className="w-full">
        {/* 3. 실제 카드가 놓일 공간 - 헤더의 최대 너비와 맞춤 */}
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-[24px] md:gap-[40px] bg-white">
          <RecruitActionCard
            image="/recruit/add.svg"
            title="지원서 생성하기"
            description="처음 지원하는 경우"
            onClick={() => navigate("/recruit/terms")}
          />

          <RecruitActionCard
            image="/recruit/modify.svg"
            title="지원서 수정하기"
            description="이전에 작성한 지원서가 있는 경우"
            onClick={() => setIsAuthModalOpen(true)}
          />
        </div>
      </main>
      {/* [AuthModal] 다음 브랜치에서 본격적으로 작업할 영역 */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-[400px] p-10 rounded-[20px] shadow-xl flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold text-[#333]">지원자 인증</h2>

            {/* 전화번호 & 비밀번호 입력 구조 (가안) */}
            <div className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="전화번호"
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="p-3 border rounded-lg w-full"
              />
            </div>

            <button className="w-full py-3 bg-black text-white rounded-lg font-bold">
              인증하기
            </button>

            {/* 비밀번호 찾기 시나리오 추가 필요 지점 */}
            <div className="flex gap-4 text-sm text-[#666]">
              <button onClick={() => console.log("비밀번호 찾기 이동/전환")}>
                비밀번호를 잊으셨나요?
              </button>
            </div>

            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="text-gray-400 text-sm underline"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruitHome;
