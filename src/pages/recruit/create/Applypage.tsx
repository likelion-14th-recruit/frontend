import { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
  useOutletContext,
  useBlocker,
} from "react-router-dom";
import TextArea from "../../../components/recruit/TextArea";
import Input from "../../../components/recruit/Input";
import ConfirmModal from "../../../components/recruit/ConfirmModal";

interface AnswerResponse {
  questionId: number;
  content: string | null;
}

interface OutletContextType {
  formData: Record<string, string | undefined>;
  setFormData: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
}

interface InfoModalType {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  isSingleButton: boolean;
  confirmText?: string;
  cancelText?: string;
}

interface Question {
  questionId: number;
  questionNumber: number;
  content: string;
}

const ApplyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<
    Record<string, string | undefined>
  >({});

  const { formData, setFormData } = useOutletContext<OutletContextType>();

  const [infoModal, setInfoModal] = useState<InfoModalType>({
    isOpen: false,
    message: "",
    onConfirm: () => {},
    isSingleButton: true,
    confirmText: "",
    cancelText: "",
  });

  // 🔥 수정된 isDirty: 원본(initialData)과 현재 입력값(formData)을 비교
  const isDirty =
    questions.some((q) => {
      const key = `q${q.questionNumber}`;
      const currentVal = (formData[key] || "").trim();
      const initialVal = (initialData[key] || "").trim();
      return currentVal !== initialVal;
    }) && !isSaved;

  // 1. 블로커 설정
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isSubmitting &&
      isDirty &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      Promise.resolve().then(() => {
        setInfoModal({
          isOpen: true,
          message:
            "임시저장하지 않고 나가면 지금까지 입력한 내용이 사라집니다. 계속 진행하시겠습니까?",
          isSingleButton: false,
          confirmText: "나가기",
          cancelText: "취소",
          onConfirm: () => blocker.proceed(),
        });
      });
    }
  }, [blocker.state]);

  // 3. 취소 시 블로커 해제
  const handleModalClose = () => {
    setInfoModal((prev) => ({ ...prev, isOpen: false }));
    if (blocker.state === "blocked") blocker.reset();
  };

  // 🔥 2. 브라우저 닫기/새로고침 방지 (브라우저 기본 알림)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "변경사항이 저장되지 않을 수 있습니다.";
        return "변경사항이 저장되지 않을 수 있습니다.";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const [applicationId] = useState(location.state?.applicationId || null);

  const userField = location.state?.field || "FRONTEND";
  const isDesign = userField === "PRODUCT_DESIGN";

  // 데이터 로딩 로직 수정
  useEffect(() => {
    const initData = async () => {
      if (!applicationId) return;
      try {
        // 1. 질문 목록 로딩
        const qRes = await fetch(
          `/api/applications/${applicationId}/questions`,
        );
        const qResult = (await qRes.json()) as {
          data: {
            questions: Question[];
          };
        };
        if (!qRes.ok || !qResult.data) return;

        const sortedQuestions = qResult.data.questions.sort(
          (a, b) => a.questionNumber - b.questionNumber,
        );
        setQuestions(sortedQuestions);

        // 2. 답변 로딩 (이미 입력된 내용이 없을 때만 서버에서 가져옴)
        const aRes = await fetch(`/api/applications/${applicationId}/answers`);
        const aResult = await aRes.json();

        // 답변 로딩 API 성공 시
        if (aRes.ok && aResult.data?.answers) {
          const serverAnswers: Record<string, string | undefined> = {};
          aResult.data.answers.forEach((ans: AnswerResponse) => {
            const targetQ = sortedQuestions.find(
              (q) => q.questionId === ans.questionId,
            );
            if (targetQ) {
              const key = `q${targetQ.questionNumber}`;
              serverAnswers[key] = ans.content || "";
            }
          });

          // 🔥 원본 데이터를 저장해두어야 나중에 비교가 가능합니다!
          setInitialData(serverAnswers);

          setFormData?.((prev) => ({ ...prev, ...serverAnswers }));
        }
      } catch (error) {
        console.error(error);
      }
    };
    initData();
  }, [applicationId]);

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData?.((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  // --- 유효성 검사 로직 수정 ---
  const isFormValid = (() => {
    if (questions.length === 0) return false;

    return questions.every((q) => {
      const val = formData[`q${q.questionNumber}`]?.trim() || "";
      const isLinkQuestion =
        q.content.includes("GitHub") || q.content.includes("포트폴리오");

      if (isLinkQuestion) {
        // 디자인일 때만 링크 필수, 개발일 땐 선택
        return isDesign ? val.length > 0 : true;
      }
      // 일반 주관식은 1~500자 필수
      return val.length >= 1 && val.length <= 500;
    });
  })();

  // --- 저장 로직 (필터링 없이 모든 questions 보냄) ---
  const handleSave = async () => {
    // 글자수 제한 체크 (링크 문항 제외)
    const isOverLimit = questions.some((q) => {
      const isLinkQuestion =
        q.content.includes("GitHub") || q.content.includes("포트폴리오");
      return (
        !isLinkQuestion && (formData[`q${q.questionNumber}`]?.length || 0) > 500
      );
    });

    if (isOverLimit) {
      setInfoModal({
        isOpen: true,
        message:
          "글자 수가 500자를 초과했습니다.\n임시 저장을 위해 내용을 500자 이내로 줄여 주세요.",
        onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
        isSingleButton: true,
      });
      return;
    }

    try {
      const answersPayload = questions.map((q) => ({
        questionId: q.questionId,
        content: formData[`q${q.questionNumber}`] || "",
      }));

      const response = await fetch(
        `/api/applications/${applicationId}/answers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: answersPayload }),
        },
      );

      if (response.ok) {
        setIsSaved(true);
        const currentData: Record<string, string | undefined> = {};
        questions.forEach((q) => {
          currentData[`q${q.questionNumber}`] =
            formData[`q${q.questionNumber}`];
        });
        setInitialData(currentData);
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
      setInfoModal({
        isOpen: true,
        message: "네트워크 오류가 발생했습니다.",
        onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
        isSingleButton: true,
        confirmText: "확인",
      });
    }
  };
  const handleMoveBack = () => {
    const backState = {
      applicationId,
      passwordLength: location.state?.passwordLength,
      field: location.state?.field,
    };

    if (isSaved || !isDirty) {
      navigate("/recruit/info", { state: backState });
    } else {
      setInfoModal({
        isOpen: true,
        message:
          "임시저장하지 않고 나가면 지금까지 입력한 내용이 사라집니다. 계속 진행하시겠습니까?",
        onConfirm: () => navigate("/recruit/info", { state: backState }),
        confirmText: "나가기",
        cancelText: "취소",
        isSingleButton: false,
      });
    }
  };

  const handleNext = () => {
    // 1. 유효성 검사 (버튼이 이미 활성화되어 있지만 안전장치로 한 번 더 체크)
    if (!isFormValid) return;

    // 2. 글자 수 제한 체크 (서버 저장은 안 하지만, 글자 수가 넘어가면 다음으로 못 가게 방지)
    const isOverLimit = questions.some((q) => {
      const isLinkQuestion =
        q.content.includes("GitHub") || q.content.includes("포트폴리오");
      return (
        !isLinkQuestion && (formData[`q${q.questionNumber}`]?.length || 0) > 500
      );
    });

    if (isOverLimit) {
      setInfoModal({
        isOpen: true,
        message:
          "글자 수가 500자를 초과했습니다.\n내용을 500자 이내로 줄여 주세요.",
        onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
        isSingleButton: true,
      });
      return;
    }

    // 🔥 [핵심 수정] 서버 저장(fetch) 없이 바로 다음 페이지로 이동합니다.
    // context의 formData는 이미 업데이트되어 있으므로 이동해도 데이터가 보존됩니다.
    setIsSubmitting(true);
    navigate("/recruit/interview", { state: { applicationId } });
  };

  return (
    <div className="flex flex-col lg:max-w-[800px] md:max-w-[700px] mx-auto pb-20 font-pretendard">
      <div className="flex flex-col gap-12 w-full">
        {questions.map((q) => {
          // 💡 질문 내용에 "GitHub"나 "포트폴리오"가 포함되어 있는지 확인
          const isLinkQuestion =
            q.content.includes("GitHub") || q.content.includes("포트폴리오");

          if (isLinkQuestion) {
            // 링크 문항일 경우 Input 컴포넌트 렌더링
            return (
              <Input
                key={q.questionId}
                label={`${q.content}`}
                name={`q${q.questionNumber}`}
                required={isDesign} // 디자인일 때만 필수 표시
                placeholder={
                  isDesign
                    ? "포트폴리오 URL을 입력해주세요."
                    : "프로젝트, 과제 등 관련 경험을 공유해주세요."
                }
                guideText={
                  isDesign
                    ? "Notion, Figma, Google Drive 등 형식은 자유입니다."
                    : ""
                }
                value={formData[`q${q.questionNumber}`] || ""}
                onChange={handleAnswerChange}
              />
            );
          } else {
            // 일반 문항일 경우 TextArea 렌더링
            return (
              <TextArea
                key={q.questionId}
                label={q.content}
                name={`q${q.questionNumber}`}
                index={q.questionNumber || 0}
                required
                maxLength={500}
                currentLength={formData[`q${q.questionNumber}`]?.length || 0}
                placeholder="내용을 입력해주세요."
                onChange={handleAnswerChange}
                value={formData[`q${q.questionNumber}`] || ""}
                rows={10}
                className="min-h-[280px]"
              />
            );
          }
        })}
      </div>

      <footer className="lg:mt-[60px] md:mt-[40px] mt-[32px] flex gap-[12px] md:gap-[16px] w-full">
        <button
          type="button"
          onClick={handleMoveBack}
          className="flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] 
                   border border-[rgba(18,18,18,0.40)] bg-white text-[rgba(18,18,18,0.80)] 
                   rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all"
        >
          이전으로
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] 
                   border border-[rgba(18,18,18,0.40)] bg-white text-[rgba(18,18,18,0.80)] 
                   rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all"
        >
          임시 저장
        </button>
        <button
          type="button"
          disabled={!isFormValid}
          onClick={handleNext}
          className={`flex-1 flex items-center justify-center h-auto md:h-[60px] py-[16px] md:py-0 px-[10px] 
                   rounded-[12px] text-[16px] md:text-[20px] font-semibold transition-all  ${
                     isFormValid
                       ? "bg-[rgba(18,18,18,0.80)] text-white cursor-pointer"
                       : "bg-[rgba(18,18,18,0.20)] text-white cursor-not-allowed"
                   }`}
        >
          다음으로
        </button>
      </footer>

      <ConfirmModal
        isOpen={infoModal.isOpen}
        onClose={handleModalClose}
        onConfirm={infoModal.onConfirm}
        message={<div className="whitespace-pre-line">{infoModal.message}</div>}
        isSingleButton={infoModal.isSingleButton}
        confirmText={infoModal.confirmText || "확인"}
        cancelText={infoModal.cancelText || "취소"}
      />
    </div>
  );
};

export default ApplyPage;
