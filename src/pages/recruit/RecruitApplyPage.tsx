import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruitActionCard from "../../components/recruit/RecruitActionCard";
import AuthModal from "../../components/recruit/AuthModal";

const RecruitApplyPage = () => {
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
            // 서정님 페이지 경로(예: /recruit/apply)로 연결하세요!
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

      {/* 🔥 분리한 모달 컴포넌트 사용 */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default RecruitApplyPage;
