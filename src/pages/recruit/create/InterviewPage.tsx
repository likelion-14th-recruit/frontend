import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SubmitModal from "../../../components/recruit/SubmitModal";
import ConfirmModal from "../../../components/recruit/ConfirmModal";

const CheckboxIcon = ({ isChecked }: { isChecked: boolean }) => (
  <div className="w-[34px] h-[34px] shrink-0">
    {isChecked ? (
      <img
        src="/recruit/checkbox_on.svg"
        alt="checked"
        className="w-full h-full"
      />
    ) : (
      <img
        src="/recruit/checkbox_off.svg"
        alt="unchecked"
        className="w-full h-full"
      />
    )}
  </div>
);

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

  // 1. [수정] 브라우저 닫기/새로고침 방지 로직 (브라우저 기본 알림)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        // 표준 방식: e.preventDefault()와 returnValue 설정
        e.preventDefault();
        e.returnValue = "변경사항이 저장되지 않을 수 있습니다.";
        return "변경사항이 저장되지 않을 수 있습니다.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

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
        setInfoModal({
          isOpen: true,
          message: "면접 시간 저장 중 오류가 발생했습니다.",
          onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
          isSingleButton: true,
          confirmText: "확인",
        });
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
          setInfoModal({
            isOpen: true,
            message: `제출 실패: ${result.message || "오류가 발생했습니다."}`,
            onConfirm: () =>
              setInfoModal((prev) => ({ ...prev, isOpen: false })),
            isSingleButton: true,
            confirmText: "확인",
          });
        }
      } else {
        // 🔥 [디자인 반영] 임시 저장 성공 시 커스텀 모달 띄우기
        setInfoModal({
          isOpen: true,
          message:
            "임시 저장이 완료되었습니다. 작성 내용은 저장되었으며, 제출하기 버튼을 눌러야 최종 제출됩니다.",
          onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
          isSingleButton: true,
          confirmText: "확인",
        });
      }
    } catch (error) {
      console.error("제출 에러:", error);
      setInfoModal({
        isOpen: true,
        message: "서버 연결 오류가 발생했습니다.",
        onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
        isSingleButton: true,
        confirmText: "확인",
      });
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
    <div className="flex flex-col lg:max-w-[800px] md:max-w-[680px] mx-auto pb-[100px] font-pretendard">
      <p className="text-left text-[16px] md:text-[20px] lg:text-[19px] md:mb-[32px] mb-[24px] lg:mb-[52px] leading-[160%]">
        가능한 면접 시간을 모두 선택해주세요. 중복 선택 가능하며, 선택한 시간 중
        하나로 면접이 진행됩니다.
      </p>
      <div className="flex flex-col gap-[20px] md:gap-[32px] lg:gap-[40px]">
        {interviewData.map((item) => {
          // 🔥 1. 여기서 '전체 선택' 여부를 먼저 계산합니다.
          const isDateAllSelected = item.interviewTimes.every((t) =>
            selectedTimes.has(t.interviewTimeId),
          );

          return (
            <section
              key={item.date}
              className="flex flex-col gap-[10px] px-[12px]"
            >
              <h3 className="text-[16px] md:text-[20px] font-semibold text-[#000] leading-[140%] mb-[8px] md:mb-[20px]">
                {new Date(item.date).getMonth() + 1}월{" "}
                {new Date(item.date).getDate()}일 (
                {DAY_MAP[item.dayOfWeek] || item.dayOfWeek}){" "}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[4px] gap-x-[20px]">
                <div
                  className="flex items-center cursor-pointer px-[8px]"
                  onClick={() => toggleDateAll(item.interviewTimes)}
                >
                  <CheckboxIcon isChecked={isDateAllSelected} />
                  <span className="text-[16px] font-normal text-[#000] ml-[20px]">
                    전체 선택
                  </span>
                </div>

                {item.interviewTimes.map((time, idx) => {
                  const isChecked = selectedTimes.has(time.interviewTimeId);
                  return (
                    <div
                      key={time.interviewTimeId}
                      className="flex items-center cursor-pointer px-[8px]"
                      onClick={() => toggleTime(time.interviewTimeId)}
                    >
                      <CheckboxIcon isChecked={isChecked} />
                      <span className="text-[16px] text-[#000] font-normal ml-[20px]">
                        타임 {idx + 1}{" "}
                        <span className="mx-2 text-[#787878]">|</span>{" "}
                        {formatTime(time.startTime)} -{" "}
                        {formatTime(time.endTime)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="lg:mt-[60px] md:mt-[40px] mt-[32px] flex gap-[12px] md:gap-[16px] w-full">
        <button
          onClick={handleMoveBack} // 🔥 수정됨
          className="flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] 
                   border border-[rgba(18,18,18,0.40)] bg-white text-[rgba(18,18,18,0.80)] 
                   rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all"
        >
          이전으로
        </button>
        <button
          onClick={() => handleSave(false)}
          className="flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] 
                   border border-[rgba(18,18,18,0.40)] bg-white text-[rgba(18,18,18,0.80)] 
                   rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all"
        >
          임시 저장
        </button>
        <button
          disabled={selectedTimes.size === 0}
          onClick={onClickSubmit} // 🔥 수정됨
          className={`flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] 
                   rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all  ${
                     selectedTimes.size > 0
                       ? "bg-[rgba(18,18,18,0.80)] text-white cursor-pointer"
                       : "bg-[rgba(18,18,18,0.20)] text-white cursor-not-allowed"
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
        message={<div className="whitespace-pre-line">{infoModal.message}</div>}
        isSingleButton={infoModal.isSingleButton}
        confirmText={infoModal.confirmText}
        cancelText={infoModal.cancelText}
      />
    </div>
  );
};

export default InterviewPage;
