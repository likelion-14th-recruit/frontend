import { useNavigate } from "react-router-dom";

const CompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 text-6xl">🦁✨</div>
      <h1 className="mb-4 text-3xl font-bold">지원이 완료되었습니다!</h1>
      <p className="mb-10 text-gray-600">
        멋쟁이사자처럼 서강대 14기 지원이 성공적으로 완료되었습니다.
        지원해주셔서 감사합니다.
      </p>

      <button
        onClick={() => navigate("/")} // 메인 홈으로 이동
        className="px-10 py-4 font-bold text-white bg-black rounded-lg"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default CompletePage;
