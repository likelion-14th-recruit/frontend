import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InterviewPage = () => {
  const navigate = useNavigate();

  // 면접 시간 데이터 구조
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

  // 선택된 시간들을 관리하는 상태 (Set을 써서 중복 방지 및 토글 용이)
  const [selectedTimes, setSelectedTimes] = useState(new Set());

  // 시간 토글 함수
  const toggleTime = (timeId) => {
    const newSelection = new Set(selectedTimes);
    if (newSelection.has(timeId)) {
      newSelection.delete(timeId);
    } else {
      newSelection.add(timeId);
    }
    setSelectedTimes(newSelection);
  };

  // 날짜별 전체 선택 함수
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
      // 14기 지원 완료 신호를 state에 담아서 홈으로 보냅니다.
      navigate("/recruit", { state: { showCompleteModal: true } });
    }
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
            <h3 className="text-[20px] font-bold border-l-4 border-[#b90000] pl-3">
              {item.date}
            </h3>

            <div className="grid grid-cols-2 gap-y-4 gap-x-10 px-2">
              {/* 전체 선택 체크박스 */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={item.times.every((t) =>
                    selectedTimes.has(`${item.date}-${t}`),
                  )}
                  onChange={() => toggleDateAll(item.date, item.times)}
                  className="w-[24px] h-[24px] accent-[#000]"
                />
                <span className="font-normal text-[#000] text-[16px]">
                  전체 선택
                </span>
              </label>

              {/* 시간별 체크박스 */}
              {item.times.map((time, idx) => {
                const id = `${item.date}-${time}`;
                return (
                  <label
                    key={id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTimes.has(id)}
                      onChange={() => toggleTime(id)}
                      className="w-[24px] h-[24px] accent-[#000]"
                    />
                    <span className="text-[16px] text-[#000]">
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
          onClick={handleSubmit}
          className={`flex-1 py-5 rounded-[15px] text-lg font-bold transition-all
            ${
              selectedTimes.size > 0
                ? "bg-[#000] text-white cursor-pointer hover:bg-[#000]"
                : "bg-gray-300 text-white cursor-not-allowed"
            }`}
        >
          제출하기
        </button>
      </footer>
    </div>
  );
};

export default InterviewPage;
