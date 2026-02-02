import { useNavigate } from "react-router-dom";

const InfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">인적 사항 작성</h1>
        {/* 나중에 여기에 이름, 학번, 전화번호 Input들이 들어갈 거예요! */}
        <div className="space-y-4">
          <p className="text-gray-500">지원자의 기본 정보를 입력해 주세요.</p>
        </div>
      </div>

      {/* 하단 버튼 영역: 이전/다음 버튼 배치 */}
      <footer className="py-10 flex justify-between">
        {/* 이전 버튼: 약관동의로 돌아가기 */}
        <button
          onClick={() => navigate("/recruit/terms")}
          className="px-10 py-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
        >
          이전
        </button>

        {/* 다음 버튼: 지원서 작성(apply)으로 이동 */}
        <button
          onClick={() => navigate("/recruit/apply")}
          className="px-10 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-bold"
        >
          다음 단계로
        </button>
      </footer>
    </div>
  );
};

export default InfoPage;
