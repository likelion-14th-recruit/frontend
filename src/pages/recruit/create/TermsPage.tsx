import { useNavigate } from "react-router-dom"; // 1. 임포트 잊지 마세요!

const TermsPage = () => {
  const navigate = useNavigate(); // 2. 내비게이트 함수 선언

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {/* 나중에 여기에 체크박스 로직이 들어갈 거예요! */}
        <h1 className="text-2xl font-bold mb-4">약관 동의</h1>
        <p className="text-gray-600">
          모든 약관에 동의하셔야 다음 단계로 진행이 가능합니다.
        </p>
      </div>

      {/* 하단 버튼 영역 */}
      <footer className="py-10 flex justify-end">
        <button
          onClick={() => navigate("/recruit/info")} // 3. 클릭 시 인적사항 페이지로 이동!
          className="px-10 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          다음 단계로
        </button>
      </footer>
    </div>
  );
};

export default TermsPage;
