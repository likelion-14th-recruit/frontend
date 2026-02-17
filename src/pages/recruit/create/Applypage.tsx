import { useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import TextArea from "../../../components/recruit/TextArea";
import Input from "../../../components/recruit/Input";
import ConfirmModal from "../../../components/recruit/ConfirmModal";

const ApplyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
    isSingleButton: true,
  });

  const context = useOutletContext();
  const formData = context?.formData || {};
  const setFormData = context?.setFormData;

  const applicationId = location.state?.applicationId;
  const userField = location.state?.field || "프론트엔드";
  const isDesign = userField === "기획·디자인";

  // 데이터 로딩 로직 (기존과 동일)
  useEffect(() => {
    const initData = async () => {
      if (!applicationId) return;
      try {
        const qRes = await fetch(
          `/api/applications/${applicationId}/questions`,
        );
        const qResult = await qRes.json();
        if (!qRes.ok || !qResult.data) return;

        const sortedQuestions = qResult.data.questions.sort(
          (a, b) => a.questionNumber - b.questionNumber,
        );
        setQuestions(sortedQuestions);

        const aRes = await fetch(`/api/applications/${applicationId}/answers`);
        const aResult = await aRes.json();
        if (aRes.ok && aResult.data?.answers) {
          const newAnswers = {};
          aResult.data.answers.forEach((ans) => {
            const targetQ = sortedQuestions.find(
              (q) => q.questionId === ans.questionId,
            );
            if (targetQ) newAnswers[`q${targetQ.questionNumber}`] = ans.content;
          });
          setFormData?.((prev) => ({ ...prev, ...newAnswers }));
        }
      } catch (error) {
        console.error("데이터 로드 중 에러:", error);
      }
    };
    initData();
  }, [applicationId]);

  const handleAnswerChange = (e) => {
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
        message: "글자 수가 500자를 초과했습니다.\n내용을 줄여 주세요.",
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
        setInfoModal({
          isOpen: true,
          message: "임시 저장이 완료되었습니다.",
          onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
          isSingleButton: true,
        });
      }
    } catch (error) {
      alert("네트워크 서버 오류");
    }
  };

  const handleMoveBack = () => {
    const backState = { ...location.state, applicationId };
    const hasAnyContent = questions.some((q) =>
      formData[`q${q.questionNumber}`]?.trim(),
    );

    if (isSaved || !hasAnyContent) {
      navigate("/recruit/info", { state: backState });
    } else {
      setInfoModal({
        isOpen: true,
        message:
          "임시저장하지 않고 나가면 내용이 사라집니다. 계속하시겠습니까?",
        onConfirm: () => navigate("/recruit/info", { state: backState }),
        isSingleButton: false,
      });
    }
  };

  const handleNext = async () => {
    // 1. 유효성 검사 (isFormValid가 이미 버튼 활성화 여부를 결정하지만 안전을 위해 한 번 더 체크)
    if (!isFormValid) return;

    // 2. 글자 수 제한 체크 (임시 저장 로직과 동일)
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
        message: "글자 수가 500자를 초과했습니다.\n내용을 줄여 주세요.",
        onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
        isSingleButton: true,
      });
      return;
    }

    try {
      // 3. 서버에 데이터 저장 (자동 임시 저장)
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
        setIsSaved(true); // 저장 상태 업데이트
        // 4. 저장 성공 시 다음 페이지로 이동
        navigate("/recruit/interview", { state: { applicationId } });
      } else {
        // 서버 에러 시 안내
        setInfoModal({
          isOpen: true,
          message:
            "데이터 저장 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.",
          onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
          isSingleButton: true,
        });
      }
    } catch (error) {
      console.error("Next 단계 진행 중 오류:", error);
      alert("네트워크 서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col max-w-[800px] mx-auto pb-20 font-pretendard">
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
                label={`${q.questionNumber}. ${q.content}`}
                name={`q${q.questionNumber}`}
                required={isDesign} // 디자인일 때만 필수 표시
                placeholder={
                  isDesign
                    ? "포트폴리오 URL을 입력해주세요."
                    : "GitHub URL을 입력해주세요."
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
                label={`${q.questionNumber}. ${q.content}`}
                name={`q${q.questionNumber}`}
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

      <footer className="mt-20 flex gap-4 w-full">
        <button
          type="button"
          onClick={handleMoveBack}
          className="flex-1 px-[10px] py-[24px] border border-[#ccc] text-[rgba(18,18,18,0.8)] rounded-[12px] text-[20px] font-bold"
        >
          이전으로
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 py-6 border border-[#ccc] rounded-[12px] text-[20px] font-bold hover:bg-gray-50"
        >
          임시 저장
        </button>
        <button
          type="button"
          disabled={!isFormValid}
          onClick={handleNext}
          className={`flex-1 py-6 rounded-[12px] text-[20px] font-bold transition-all ${
            isFormValid
              ? "bg-black text-white cursor-pointer"
              : "bg-[#ccc] text-white cursor-not-allowed"
          }`}
        >
          다음으로
        </button>
      </footer>

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
        confirmText={infoModal.isSingleButton ? "확인" : "나가기"}
        cancelText="취소"
      />
    </div>
  );
};

export default ApplyPage;
