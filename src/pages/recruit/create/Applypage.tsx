import { useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import TextArea from "../../../components/recruit/TextArea";
import Input from "../../../components/recruit/Input";
import ConfirmModal from "../../../components/recruit/ConfirmModal";

const ApplyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 안내 모달 상태 관리
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
    isSingleButton: true,
  });

  const [questions, setQuestions] = useState([]);

  const context = useOutletContext();
  const formData = context?.formData || {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    link: "",
  };
  const setFormData = context?.setFormData;

  // 상단에 상태 추가
  const [isSaved, setIsSaved] = useState(false);

  // handleAnswerChange에서 글을 쓰면 다시 '저장 안됨' 상태로 변경
  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setFormData?.((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false); // 🔥 무언가 수정되면 다시 경고를 띄워야 함
  };

  // 수정한 isDirty (저장된 상태라면 더티하지 않은 것으로 간주)
  const isDirty =
    !isSaved &&
    (Object.keys(formData).some((key) => formData[key]?.trim() !== "") ||
      formData.link?.trim() !== "");

  // 브라우저 닫기/새로고침 방지
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

  // 1. applicationId가 잘 넘어왔는지 확인
  const applicationId = location.state?.applicationId;
  const userField = location.state?.field || "프론트엔드";

  useEffect(() => {
    const initData = async () => {
      if (!applicationId) return;

      try {
        // 1. 질문 목록 가져오기
        const qRes = await fetch(
          `/api/applications/${applicationId}/questions`,
        );
        const qResult = await qRes.json();

        if (!qRes.ok || !qResult.data) return;

        const sortedQuestions = qResult.data.questions.sort(
          (a, b) => a.questionNumber - b.questionNumber,
        );
        setQuestions(sortedQuestions);

        // 2. 이미 작성된 답변 가져오기
        const aRes = await fetch(`/api/applications/${applicationId}/answers`);
        const aResult = await aRes.json();

        if (aRes.ok && aResult.data?.answers) {
          const newAnswers = {};
          aResult.data.answers.forEach((ans) => {
            // 서버에서 온 답변을 q1, q2... 형식으로 매핑
            const targetQ = sortedQuestions.find(
              (q) => q.questionId === ans.questionId,
            );
            if (targetQ) {
              newAnswers[`q${targetQ.questionNumber}`] = ans.content;
            }
          });
          // 기존 formData와 합치기
          setFormData?.((prev) => ({ ...prev, ...newAnswers }));
        }
      } catch (error) {
        console.error("데이터 로드 중 에러:", error);
      }
    };

    initData();
  }, [applicationId]);

  const isDesign = userField === "기획·디자인";

  // 1. 라벨과 가이드 텍스트 설정
  const linkLabel = isDesign ? "포트폴리오 링크" : "GitHub 링크(선택)";
  const linkPlaceholder = isDesign
    ? "포트폴리오 URL을 입력해주세요."
    : "GitHub URL을 입력해주세요.";
  const linkGuide = isDesign
    ? "Notion, Figma, Google Drive 등 형식은 자유입니다."
    : ""; // 개발 직군일 땐 가이드 텍스트도 비워줍니다.

  // 2. 유효성 검사: 개발 직군일 땐 링크 입력 여부를 아예 무시
  const isFormValid = (() => {
    const checkLength = (text) =>
      (text?.trim().length || 0) >= 1 && (text?.trim().length || 0) <= 500;

    // 🔥 수정: 렌더링되는(GitHub 제외) 질문들만 검사하도록 필터링 추가
    const displayQuestions = questions.filter(
      (q) => !q.content.includes("GitHub"),
    );

    const commonValid =
      questions.length > 0 &&
      displayQuestions.every((q) =>
        checkLength(formData[`q${q.questionNumber}`]),
      );

    if (isDesign) {
      // 디자인: 자기소개서 완필 + 링크 필수
      return commonValid && (formData.link?.trim().length || 0) > 0;
    } else {
      // 개발: 자기소개서만 완필하면 통과 (링크는 빈값이어도 상관없음)
      return commonValid;
    }
  })();

  const handleSave = async () => {
    const realQuestions = questions.filter(
      (q) => !q.content.includes("GitHub"),
    );

    const hasTextAnswer = realQuestions.some(
      (q) => formData[`q${q.questionNumber}`]?.trim().length > 0,
    );
    const hasLink = formData.link?.trim().length > 0;

    // 1. 필수 입력 검사
    if (!hasTextAnswer && !hasLink) {
      setInfoModal({
        isOpen: true,
        message: "필수 항목을 입력해주세요.",
        onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
        isSingleButton: true,
      });
      return;
    }

    // 🔥 2. 글자 수 제한 검사 (추가된 부분)
    // 500자가 넘는 문항이 하나라도 있는지 확인합니다.
    const isOverLimit = realQuestions.some(
      (q) => (formData[`q${q.questionNumber}`]?.length || 0) > 500,
    );

    if (isOverLimit) {
      setInfoModal({
        isOpen: true,
        message:
          "글자 수가 500자를 초과했습니다.\n 임시 저장을 위해 내용을 500자 이내로 줄여 주세요.",
        onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
        isSingleButton: true,
      });
      return; // 🛑 여기서 중단해서 서버로 안 보내게 막습니다.
    }

    // 3. 저장 로직 진행
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
          message:
            "임시 저장이 완료되었습니다.\n작성 내용은 저장되었으며, 제출하기 버튼을 눌러야 최종 제출됩니다.",
          onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
          isSingleButton: true,
        });
      } else {
        // 4. 만약 서버에서 에러가 났을 때도 사용자에게 모달을 띄워주는 것이 친절합니다.
        setInfoModal({
          isOpen: true,
          message: "저장 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.",
          onConfirm: () => setInfoModal((prev) => ({ ...prev, isOpen: false })),
          isSingleButton: true,
        });
      }
    } catch (error) {
      alert("네트워크 서버 오류");
    }
  };

  // --- handleMoveBack 수정본 ---
  const handleMoveBack = () => {
    const realQuestions = questions.filter(
      (q) => !q.content.includes("GitHub"),
    );

    const hasAnyContent =
      realQuestions.some(
        (q) => (formData[`q${q.questionNumber}`]?.trim().length || 0) > 0,
      ) || (formData.link?.trim().length || 0) > 0;

    // 공통으로 넘어갈 state 정의 (비밀번호 등 기존 location.state 포함)
    const backState = {
      ...location.state, // 🔥 이게 핵심! 기존에 받은 모든 정보(비밀번호 등)를 그대로 넘김
      applicationId,
    };

    // 🔥 저장된 상태이거나, 아예 쓴 내용이 없으면 바로 이동!
    if (isSaved || !hasAnyContent) {
      navigate("/recruit/info", { state: backState });
    } else {
      setInfoModal({
        isOpen: true,
        message:
          "임시저장하지 않고 나가면 지금까지 입력한 내용이 모두 사라집니다.\n계속 진행하시겠습니까?",
        onConfirm: () =>
          navigate("/recruit/info", {
            state: backState, // 🔥 수정된 state 전달
          }),
        isSingleButton: false,
      });
    }
  };

  return (
    <div className="flex flex-col max-w-[800px] mx-auto pb-20 font-pretendard">
      <div className="flex flex-col gap-12 w-full">
        {questions
          .filter((q) => !q.content.includes("GitHub"))
          .map((q, index, filteredArray) => {
            const isLastQuestion = index === filteredArray.length - 1;
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
                rows={isLastQuestion ? 4 : 10}
                className={isLastQuestion ? "min-h-[120px]" : "min-h-[280px]"}
              />
            );
          })}

        <Input
          label={linkLabel}
          name="link"
          required={isDesign}
          placeholder={linkPlaceholder}
          guideText={linkGuide}
          value={formData.link}
          onChange={handleAnswerChange}
        />
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
          disabled={!isFormValid}
          onClick={() =>
            navigate("/recruit/interview", { state: { applicationId } })
          }
          className={`flex-1 py-6 rounded-[12px] text-[20px] font-bold transition-all 
            ${isFormValid ? "bg-black text-white cursor-pointer" : "bg-[#ccc] text-white cursor-not-allowed"}`}
        >
          다음으로
        </button>
      </footer>

      {/* 🚀 중요: 모달은 footer 바깥으로! */}
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
