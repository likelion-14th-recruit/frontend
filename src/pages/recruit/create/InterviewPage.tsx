import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitModal from "../../../components/recruit/SubmitModal";

const InterviewPage = () => {
  const navigate = useNavigate();

  const interviewData = [
    {
      date: "3월 9일 (월)",
      times: [
        "18:00 - 18:20",
        "18:25 - 18:45",
        "18:50 - 19:10",
        "19:15 - 19:35",
        "19:40 - 20:00",
        "20:05 - 20:25",
        "20:30 - 20:50",
        "20:55 - 21:15",
        "21:20 - 21:40",
      ],
    },
    {
      date: "3월 10일 (화)",
      times: [
        "18:00 - 18:20",
        "18:25 - 18:45",
        "18:50 - 19:10",
        "19:15 - 19:35",
        "19:40 - 20:00",
        "20:05 - 20:25",
        "20:30 - 20:50",
        "20:55 - 21:15",
        "21:20 - 21:40",
      ],
    },
    {
      date: "3월 11일 (수)",
      times: [
        "18:00 - 18:20",
        "18:25 - 18:45",
        "18:50 - 19:10",
        "19:15 - 19:35",
        "19:40 - 20:00",
        "20:05 - 20:25",
        "20:30 - 20:50",
        "20:55 - 21:15",
        "21:20 - 21:40",
      ],
    },
    {
      date: "3월 12일 (목)",
      times: [
        "18:00 - 18:20",
        "18:25 - 18:45",
        "18:50 - 19:10",
        "19:15 - 19:35",
        "19:40 - 20:00",
        "20:05 - 20:25",
        "20:30 - 20:50",
        "20:55 - 21:15",
        "21:20 - 21:40",
      ],
    },
  ];

  const [selectedTimes, setSelectedTimes] = useState(new Set());

  const toggleTime = (timeId) => {
    const newSelection = new Set(selectedTimes);
    if (newSelection.has(timeId)) {
      newSelection.delete(timeId);
    } else {
      newSelection.add(timeId);
    }
    setSelectedTimes(newSelection);
  };

  const toggleDateAll = (date, times) => {
    const newSelection = new Set(selectedTimes);
    const allOfDateSelected = times.every((t) =>
      newSelection.has(`${date}-${t}`),
    );

    times.forEach((t) => {
      const id = `${date}-${t}`;
      if (allOfDateSelected) newSelection.delete(id);
      else newSelection.add(id);
    });
    setSelectedTimes(newSelection);
  };

  const handleSubmit = () => {
    if (window.confirm("정말로 제출하시겠습니까?")) {
      navigate("/recruit", { state: { showCompleteModal: true } });
    }
  };

  // ✅ 공통 체크박스 스타일 (서정님이 주신 수치 유지)
  const checkboxStyle = `
    appearance-none min-w-[24px] min-h-[24px] w-[24px] h-[24px] aspect-square border border-[#000] rounded-[4px] 
    cursor-pointer flex items-center justify-center transition-all
    checked:bg-[#000] checked:bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/1200px-White_check.svg.png')] 
    checked:bg-[length:14px_14px] checked:bg-no-repeat checked:bg-center
  `;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitClick = () => {
    setIsModalOpen(true); // 버튼 클릭 시 모달 열기
  };

  const handleFinalSubmit = () => {
    // 실제 제출 로직
    setIsModalOpen(false);
    navigate("/recruit", { state: { showCompleteModal: true } });
  };

  return (
    <div className="flex flex-col max-w-[800px] mx-auto pb-20 font-pretendard">
      <p className="text-center font-normal text-[19px] mb-12">
        가능한 면접 시간을 모두 선택해주세요. 중복 선택 가능하며, 선택한 시간 중
        하나로 면접이 진행됩니다.
      </p>

      <div className="flex flex-col gap-14">
        {interviewData.map((item) => (
          <section key={item.date} className="flex flex-col gap-6">
            <h3 className="text-[20px] font-bold text-[#000]">{item.date}</h3>

            {/* ✅ 행 간격(gap-y-5 = 20px) 설정 */}
            <div className="grid grid-cols-2 gap-y-5 gap-x-10 px-2">
              {/* 전체 선택 */}
              <label className="flex items-start gap-6 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={item.times.every((t) =>
                    selectedTimes.has(`${item.date}-${t}`),
                  )}
                  onChange={() => toggleDateAll(item.date, item.times)}
                  className={checkboxStyle}
                />
                {/* ✅ gap-4 (16px)로 체크박스와 글자 사이를 띄웠습니다. 필요하면 gap-5(20px)로 늘려보세요! */}
                <span className="font-normal text-[#000] text-[16px] leading-[24px]">
                  전체 선택
                </span>
              </label>

              {/* 시간별 선택 */}
              {item.times.map((time, idx) => {
                const id = `${item.date}-${time}`;
                return (
                  <label
                    key={id}
                    className="flex items-start gap-6 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTimes.has(id)}
                      onChange={() => toggleTime(id)}
                      className={checkboxStyle}
                    />
                    <span className="text-[16px] text-[#000] leading-[24px]">
                      타임 {idx + 1}{" "}
                      <span className="mx-2 text-gray-300">|</span> {time}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-20 flex gap-4 w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-5 border border-[#ccc] text-[#666] rounded-[15px] text-lg font-bold hover:bg-gray-50 transition-all"
        >
          이전으로
        </button>
        <button
          onClick={() => alert("임시 저장되었습니다.")}
          className="flex-1 py-5 border border-[#ccc] text-[#666] rounded-[15px] text-lg font-bold hover:bg-gray-50 transition-all"
        >
          임시 저장
        </button>
        <button
          disabled={selectedTimes.size === 0}
          onClick={handleSubmitClick} // 🔥 수정
          className={`flex-1 py-5 rounded-[15px] text-lg font-bold transition-all
            ${selectedTimes.size > 0 ? "bg-[#000] text-white cursor-pointer" : "bg-gray-300 text-white cursor-not-allowed"}`}
        >
          제출하기
        </button>
      </footer>

      {/* 🔥 모달 컴포넌트 추가 */}
      <SubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleFinalSubmit}
      />
    </div>
  );
};

export default InterviewPage;
