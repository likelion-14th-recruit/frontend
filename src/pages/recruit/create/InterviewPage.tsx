import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SubmitModal from "../../../components/recruit/SubmitModal";
import ConfirmModal from "../../../components/recruit/ConfirmModal";

const InterviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const applicationId = location.state?.applicationId;

  const [interviewData, setInterviewData] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 안내 모달 통합 상태 관리
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
    isSingleButton: false,
    confirmText: "확인",
    cancelText: "취소",
  });

  // 변경 사항이 있는지 확인 (선택된 시간이 있으면 dirty)
  const isDirty = selectedTimes.size > 0;

  // 브라우저 닫기 방지
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // 요일 매핑 객체 추가
  const DAY_MAP = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };

  // 시간 포맷팅 함수 (18:00:00 -> 18:00)
  const formatTime = (time) => {
    if (!time) return "";
    return time.split(":").slice(0, 2).join(":");
  };

  // 1. 데이터 초기화
  useEffect(() => {
    const initInterviewData = async () => {
      if (!applicationId) return;
      try {
        const allTimesRes = await fetch("/api/interview-times");
        const allTimesResult = await allTimesRes.json();

        if (allTimesRes.ok && allTimesResult.data) {
          // 🔥 날짜 오름차순 정렬 (서버에서 역순으로 올 경우 대비)
          const sortedData = [...allTimesResult.data].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );
          setInterviewData(sortedData);
        } else {
          console.error("서버 에러 메시지:", allTimesResult.message);
        }

        const myAvailableRes = await fetch(
          `/api/applications/${applicationId}/interview-available`,
        );
        const myResult = await myAvailableRes.json();
        if (myAvailableRes.ok && myResult.data?.interviewTimeIds) {
          setSelectedTimes(new Set(myResult.data.interviewTimeIds));
        }
      } catch (error) {
        console.error("로딩 에러:", error);
      }
    };
    initInterviewData();
  }, [applicationId]);

  // 2. 토글 핸들러 (ID 기준)
  const toggleTime = (timeId) => {
    const newSelection = new Set(selectedTimes);
    newSelection.has(timeId)
      ? newSelection.delete(timeId)
      : newSelection.add(timeId);
    setSelectedTimes(newSelection);
  };

  const toggleDateAll = (times) => {
    const newSelection = new Set(selectedTimes);
    const timeIds = times.map((t) => t.interviewTimeId);
    const allSelected = timeIds.every((id) => newSelection.has(id));

    timeIds.forEach((id) => {
      allSelected ? newSelection.delete(id) : newSelection.add(id);
    });
    setSelectedTimes(newSelection);
  };

  // InterviewPage.tsx 내부의 handleSave 함수

  const handleSave = async (isFinal = false) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };

    try {
      // 1. 먼저 현재 선택된 면접 시간을 저장합니다 (POST /interview-available)
      const saveResponse = await fetch(
        `/api/applications/${applicationId}/interview-available`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            interviewTimeIds: Array.from(selectedTimes),
          }),
        },
      );

      if (!saveResponse.ok) {
        alert("면접 시간 저장 중 오류가 발생했습니다.");
        return;
      }

      // 2. 🔥 최종 제출인 경우에만 제출 API 호출 (POST /submit)
      if (isFinal) {
        const submitResponse = await fetch(
          `/api/applications/${applicationId}/submit`,
          {
            method: "POST", // 명세하신 대로 POST
            headers: headers,
          },
        );

        const result = await submitResponse.json();

        if (submitResponse.ok) {
          setIsModalOpen(false);
          // 제출 완료 후 성공 모달을 띄우기 위해 리다이렉트
          navigate("/recruit", { state: { showCompleteModal: true } });
        }
        // ❌ [이미지 반영] 지원 기간 종료 에러 대응
        else if (result.code === "APPLICATION_SUBMISSION_EXPIRED") {
          setInfoModal({
            isOpen: true,
            message: "지원 기간이 종료되었습니다.",
            onConfirm: () => navigate("/"), // 메인으로 이동
            isSingleButton: true, // 확인 버튼 하나만
            confirmText: "확인",
          });
        } else {
          alert(
            `제출 실패: ${result.message || "이미 제출되었거나 오류가 발생했습니다."}`,
          );
        }
      } else {
        // 최종 제출이 아닌 일반 임시 저장일 때
        alert("임시 저장되었습니다.");
      }
    } catch (error) {
      console.error("제출 에러:", error);
      alert("서버 연결 오류가 발생했습니다.");
    }
  };

  // 🚀 케이스 2: 이전으로 버튼 클릭 시 이탈 방지
  const handleMoveBack = () => {
    if (isDirty) {
      setInfoModal({
        isOpen: true,
        message:
          "임시저장하지 않고 나가면 지금까지 입력한 내용이 모두 사라집니다.\n계속 진행하시겠습니까?",
        onConfirm: () => navigate(-1),
        isSingleButton: false,
        confirmText: "나가기",
        cancelText: "취소",
      });
    } else {
      navigate(-1);
    }
  };

  const onClickSubmit = () => {
    setInfoModal({
      isOpen: true,
      message:
        "지원서를 제출하면 이후에는 수정할 수 없습니다.\n제출하시겠습니까?",
      onConfirm: () => handleSave(true), // 확인 누르면 진짜 제출 실행
      isSingleButton: false, // 취소 버튼 필요
      confirmText: "제출",
      cancelText: "계속 진행",
    });
  };

  const checkboxStyle = `appearance-none min-w-[24px] min-h-[24px] w-[24px] h-[24px] border border-[#000] rounded-[4px] cursor-pointer flex items-center justify-center transition-all checked:bg-[#000] checked:bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/1200px-White_check.svg.png')] checked:bg-[length:14px_14px] checked:bg-no-repeat checked:bg-center`;

  return (
    <div className="flex flex-col max-w-[800px] mx-auto pb-20 font-pretendard">
      <p className="text-center text-[19px] mb-12">
        가능한 면접 시간을 모두 선택해주세요.
      </p>
      <div className="flex flex-col gap-14">
        {interviewData.map((item) => (
          <section key={item.date} className="flex flex-col gap-6">
            <h3 className="text-[20px] font-bold">
              {item.date} ({DAY_MAP[item.dayOfWeek] || item.dayOfWeek})
            </h3>
            <div className="grid grid-cols-2 gap-y-5 gap-x-10 px-2">
              <label className="flex items-start gap-6 cursor-pointer">
                <input
                  type="checkbox"
                  // 🔥 item.times 대신 item.interviewTimes 사용
                  checked={item.interviewTimes.every((t) =>
                    selectedTimes.has(t.interviewTimeId),
                  )}
                  onChange={() => toggleDateAll(item.interviewTimes)}
                  className={checkboxStyle}
                />
                <span className="text-[16px]">전체 선택</span>
              </label>

              {item.interviewTimes.map((time, idx) => (
                <label
                  key={time.interviewTimeId}
                  className="flex items-start gap-6 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTimes.has(time.interviewTimeId)}
                    onChange={() => toggleTime(time.interviewTimeId)}
                    className={checkboxStyle}
                  />
                  <span className="text-[16px]">
                    타임 {idx + 1} <span className="mx-2 text-gray-300">|</span>{" "}
                    {formatTime(time.startTime)} - {formatTime(time.endTime)}
                  </span>
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-20 flex gap-4 w-full">
        <button
          onClick={handleMoveBack} // 🔥 수정됨
          className="flex-1 py-5 border border-[#ccc] rounded-[15px] font-bold"
        >
          이전으로
        </button>
        <button
          onClick={() => handleSave(false)}
          className="flex-1 py-5 border border-[#ccc] rounded-[15px] font-bold"
        >
          임시 저장
        </button>
        <button
          disabled={selectedTimes.size === 0}
          onClick={onClickSubmit} // 🔥 수정됨
          className={`flex-1 py-5 rounded-[15px] font-bold transition-all ${
            selectedTimes.size > 0
              ? "bg-black text-white"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          제출하기
        </button>
      </footer>

      {/* 🔥 모든 상황을 처리하는 만능 모달 */}
      <ConfirmModal
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={infoModal.onConfirm}
        message={
          <div className="whitespace-pre-line text-center">
            {infoModal.message}
          </div>
        }
        isSingleButton={infoModal.isSingleButton}
        confirmText={infoModal.confirmText}
        cancelText={infoModal.cancelText}
      />
    </div>
  );
};

export default InterviewPage;
