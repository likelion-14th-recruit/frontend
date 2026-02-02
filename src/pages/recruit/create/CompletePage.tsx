import { useNavigate } from "react-router-dom";

const CompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-6">🦁✨</div>
      <h1 className="text-3xl font-bold mb-4">지원이 완료되었습니다!</h1>
      <p className="text-gray-600 mb-10">
        서정 님의 소중한 지원서가 성공적으로 접수되었습니다.
        <br />
        결과는 추후 입력하신 연락처로 안내드릴 예정입니다.
      </p>

      <button
        onClick={() => navigate("/")} // 메인 홈으로 이동
        className="px-10 py-4 bg-black text-white rounded-lg font-bold"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default CompletePage;
