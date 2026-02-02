import { useNavigate } from "react-router-dom";

const ApplyPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 실제로는 여기서 서버에 데이터를 보내는 로직이 들어가겠죠?
    // 지금은 흐름을 뚫는 중이니 바로 완료 페이지로 보냅니다!
    if (window.confirm("정말로 제출하시겠습니까?")) {
      navigate("/recruit/complete");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">지원서 작성</h1>
        <div className="space-y-6">
          <p className="text-gray-500">
            멋쟁이사자처럼 14기 운영진 지원 문항에 답변해 주세요.
          </p>
          {/* 나중에 여기에 큰 텍스트 입력창(Textarea)들이 들어갈 자리! */}
          <div className="w-full h-[300px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
            자기소개서 문항 영역
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <footer className="py-10 flex justify-between">
        <button
          onClick={() => navigate("/recruit/info")}
          className="px-10 py-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
        >
          이전
        </button>

        <button
          onClick={handleSubmit} // 제출 함수 호출!
          className="px-10 py-4 bg-[#FF6B00] text-white rounded-lg hover:bg-[#e66000] font-bold shadow-lg"
        >
          지원서 제출하기
        </button>
      </footer>
    </div>
  );
};

export default ApplyPage;
