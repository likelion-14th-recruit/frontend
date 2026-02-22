import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  useOutletContext,
  useBlocker,
} from "react-router-dom";
import ConfirmModal from "../../../components/recruit/ConfirmModal";

// --- 타입 정의 부분 생략 (동일) ---

interface Question {
  questionId: number;
  questionNumber: number;
  content?: string;
}

interface OutletContextType {
  formData: Record<string, string>;
}

export interface ListInterviewTimesResponse {
  success?: boolean;
  code?: string;
  message?: string;
  data?: InterviewTimesResponse[];
}
export interface InterviewTimesResponse {
  date?: string;
  dayOfWeek?: string;
  interviewTimes?: InterviewTimeDto[];
}
export interface InterviewTimeDto {
  interviewTimeId: number;
  startTime: string;
  endTime: string;
}
interface InterviewTime {
  interviewTimeId: number;
  startTime: string;
  endTime: string;
}
interface InterviewDateGroup {
  date: string;
  dayOfWeek: string;
  interviewTimes: InterviewTime[];
}
interface ModalState {
  isOpen: boolean;
  message: string;
  onConfirm: () => void | Promise<void>;
  isSingleButton: boolean;
  confirmText: string;
  cancelText?: string;
}

const CheckboxIcon = ({ isChecked }: { isChecked: boolean }) => (
  <div className="w-[34px] h-[34px] shrink-0">
    <img
      src={isChecked ? "/recruit/checkbox_on.svg" : "/recruit/checkbox_off.svg"}
      alt="checkbox"
      className="w-full h-full"
    />
  </div>
);

const InterviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const applicationId = location.state?.applicationId;

  const [interviewData, setInterviewData] = useState<InterviewDateGroup[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<Set<number>>(new Set());
  const [questions, setQuestions] = useState<Question[]>([]);
  const [initialSelectedTimes, setInitialSelectedTimes] = useState<Set<number>>(
    new Set(),
  ); // 🔥 이 줄을 추가하세요!

  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const context = useOutletContext<OutletContextType>();
  const formData = context?.formData || {};

  // 🔥 수정된 isDirty: 초기 선택값과 현재 선택값이 다를 때만 true
  const isDirty =
    (selectedTimes.size !== initialSelectedTimes.size ||
      ![...selectedTimes].every((id) => initialSelectedTimes.has(id))) &&
    !isSaved;

  // 1. 블로커 설정
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isSubmitting &&
      isDirty &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  // 2. 블로커 상태에 따른 모달 제어
  useEffect(() => {
    if (blocker.state === "blocked") {
      setInfoModal({
        isOpen: true,
        message:
          "임시저장하지 않고 나가면 지금까지 선택한 내용이 사라집니다. 계속 진행하시겠습니까?",
        isSingleButton: false,
        confirmText: "나가기",
        cancelText: "취소",
        onConfirm: () => blocker.proceed(), // 이동 허용
      });
    }
  }, [blocker]);

  // 3. 모달 닫기 (블로커 리셋)
  const handleModalClose = () => {
    setInfoModal((prev) => ({ ...prev, isOpen: false }));
    if (blocker.state === "blocked") blocker.reset();
  };

  const [infoModal, setInfoModal] = useState<ModalState>({
    isOpen: false,
    message: "",
    onConfirm: () => {},
    isSingleButton: false,
    confirmText: "확인",
    cancelText: "취소",
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        return "변경사항이 저장되지 않을 수 있습니다.";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const DAY_MAP: Record<string, string> = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };
  const formatTime = (time: string) =>
    !time ? "" : time.split(":").slice(0, 2).join(":");

  // 1. 데이터 초기화 (면접 시간 + 질문 목록 같이 불러오기)
  useEffect(() => {
    const initData = async () => {
      if (!applicationId) return;
      try {
        // 면접 시간 정보 로드
        const allRes = await fetch("/api/interview-times");
        const allResult = (await allRes.json()) as ListInterviewTimesResponse;
        if (allRes.ok && allResult.data) {
          const normalized: InterviewDateGroup[] = allResult.data
            .filter(
              (item): item is InterviewTimesResponse & { date: string } =>
                !!item.date,
            )
            .map((item) => ({
              date: item.date,
              dayOfWeek: item.dayOfWeek || "",
              interviewTimes: (item.interviewTimes || []).map((t) => ({
                interviewTimeId: t.interviewTimeId,
                startTime: t.startTime,
                endTime: t.endTime,
              })),
            }))
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            );

          setInterviewData(normalized);
        }

        // 내가 선택한 시간 로드
        const myRes = await fetch(
          `/api/applications/${applicationId}/interview-available`,
        );
        const myResult = await myRes.json();
        if (myRes.ok && myResult.data?.interviewTimeIds) {
          const loadedTimes = new Set<number>(myResult.data.interviewTimeIds);
          setSelectedTimes(loadedTimes);
          setInitialSelectedTimes(new Set(loadedTimes));
        }

        // 질문 목록 로드 (답변 매핑용)
        const qRes = await fetch(
          `/api/applications/${applicationId}/questions`,
        );
        const qResult = await qRes.json();
        if (qRes.ok && qResult.data) {
          setQuestions(qResult.data.questions);
        }
      } catch (error) {
        console.error("로딩 에러:", error);
      }
    };
    initData();
  }, [applicationId]);

  const toggleTime = (timeId: number) => {
    const newSelection = new Set(selectedTimes);

    if (newSelection.has(timeId)) {
      newSelection.delete(timeId);
    } else {
      newSelection.add(timeId);
    }

    setSelectedTimes(newSelection);
    setIsSaved(false);
  };

  const toggleDateAll = (times: InterviewTime[]) => {
    const newSelection = new Set(selectedTimes);
    const timeIds = times.map((t) => t.interviewTimeId);
    const allSelected = timeIds.every((id) => newSelection.has(id));
    timeIds.forEach((id) => {
      if (allSelected) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
    });
    setSelectedTimes(newSelection);
    setIsSaved(false);
  };

  // 🔥 [통합] 저장 함수 (하나로 합쳤습니다!)
  const handleSave = async (isFinal = false) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };

    try {
      // A. 면접 시간 저장
      const timePromise = fetch(
        `/api/applications/${applicationId}/interview-available`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ interviewTimeIds: Array.from(selectedTimes) }),
        },
      );

      // B. 지원서 답변 저장 (Context의 내용 포함)
      const answersPayload = questions.map((q) => ({
        questionId: q.questionId,
        content: formData[`q${q.questionNumber}`] || "",
      }));
      const answerPromise = fetch(
        `/api/applications/${applicationId}/answers`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ answers: answersPayload }),
        },
      );

      const [timeRes, answerRes] = await Promise.all([
        timePromise,
        answerPromise,
      ]);

      if (!timeRes.ok || !answerRes.ok) throw new Error("저장 실패");

      if (isFinal) {
        // C. 최종 제출
        const submitRes = await fetch(
          `/api/applications/${applicationId}/submit`,
          { method: "POST", headers },
        );
        const result = await submitRes.json();
        if (submitRes.ok) {
          navigate("/recruit", { state: { showCompleteModal: true } });
        } else {
          setIsSubmitting(false);
          alert(`제출 실패: ${result.message}`);
        }
      } else {
        setIsSaved(true);
        setInitialSelectedTimes(new Set(selectedTimes)); // 🔥 현재 선택값을 새로운 원본으로 갱신!
        setIsSubmitting(false);
        setInfoModal({
          isOpen: true,
          isSingleButton: true,
          confirmText: "확인",
          message:
            "임시 저장이 완료되었습니다. 작성 내용은 저장되었으며, 제출하기 버튼을 눌러야 최종 제출됩니다.",
          onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("저장 중 오류:", error);
      alert("서버 통신 오류가 발생했습니다.");
    }
  };

  const handleMoveBack = () => {
    if (isDirty) {
      setInfoModal({
        isOpen: true,
        isSingleButton: false,
        confirmText: "나가기",
        cancelText: "취소",
        message:
          "임시저장하지 않고 나가면 지금까지 선택한 내용이 사라집니다. 계속 진행하시겠습니까?",
        onConfirm: () => navigate(-1),
      });
    } else {
      navigate(-1);
    }
  };

  const onClickSubmit = () => {
    setInfoModal({
      isOpen: true,
      isSingleButton: false,
      confirmText: "제출",
      cancelText: "계속 진행",
      message:
        "지원서를 제출하면 이후에는 수정할 수 없습니다.\n제출하시겠습니까?",
      onConfirm: () => handleSave(true),
    });
  };

  return (
    <div className="flex flex-col lg:max-w-[800px] md:max-w-[680px] mx-auto pb-[100px] font-pretendard">
      <p className="text-left text-[16px] md:text-[20px] lg:text-[19px] md:mb-[32px] mb-[24px] lg:mb-[52px] leading-[160%]">
        가능한 면접 시간을 모두 선택해주세요. 중복 선택 가능하며, 선택한 시간 중
        하나로 면접이 진행됩니다.
      </p>

      <div className="flex flex-col gap-[20px] md:gap-[32px] lg:gap-[40px]">
        {interviewData.map((item) => {
          const isDateAllSelected = item.interviewTimes.every((t) =>
            selectedTimes.has(t.interviewTimeId),
          );
          return (
            <section
              key={item.date}
              className="flex flex-col gap-[10px] px-[12px]"
            >
              <h3 className="text-[16px] md:text-[20px] font-semibold text-[#000] mb-[8px] md:mb-[20px]">
                {new Date(item.date).getMonth() + 1}월{" "}
                {new Date(item.date).getDate()}일 (
                {DAY_MAP[item.dayOfWeek] || item.dayOfWeek})
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
                {item.interviewTimes.map((time, idx) => (
                  <div
                    key={time.interviewTimeId}
                    className="flex items-center cursor-pointer px-[8px]"
                    onClick={() => toggleTime(time.interviewTimeId)}
                  >
                    <CheckboxIcon
                      isChecked={selectedTimes.has(time.interviewTimeId)}
                    />
                    <span className="text-[16px] text-[#000] font-normal ml-[20px]">
                      타임 {idx + 1}{" "}
                      <span className="mx-2 text-[#787878]">|</span>{" "}
                      {formatTime(time.startTime)} - {formatTime(time.endTime)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="lg:mt-[60px] md:mt-[40px] mt-[32px] flex gap-[12px] md:gap-[16px] w-full">
        <button
          onClick={handleMoveBack}
          className="flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] border border-[rgba(18,18,18,0.40)] bg-white text-[rgba(18,18,18,0.80)] rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all"
        >
          이전으로
        </button>
        <button
          onClick={() => handleSave(false)}
          className="flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] border border-[rgba(18,18,18,0.40)] bg-white text-[rgba(18,18,18,0.80)] rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all"
        >
          임시 저장
        </button>
        <button
          disabled={selectedTimes.size === 0}
          onClick={onClickSubmit}
          className={`flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all ${selectedTimes.size > 0 ? "bg-[rgba(18,18,18,0.80)] text-white cursor-pointer" : "bg-[rgba(18,18,18,0.20)] text-white cursor-not-allowed"}`}
        >
          제출하기
        </button>
      </footer>

      <ConfirmModal
        isOpen={infoModal.isOpen}
        onClose={handleModalClose}
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
