import { useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import TextArea from "../../../components/recruit/TextArea";
import Input from "../../../components/recruit/Input";

const ApplyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. applicationId가 잘 넘어왔는지 확인
  const applicationId = location.state?.applicationId;
  const userField = location.state?.field || "프론트엔드";

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

  // 핸들러 및 기타 변수 (LABEL 등) 동일...
  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setFormData?.((prev) => ({ ...prev, [name]: value }));
  };

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
    // 1. 500자 초과 여부 확인
    const isOverLimit = questions.some(
      (q) => (formData[`q${q.questionNumber}`]?.length || 0) > 500,
    );

    if (isOverLimit) {
      alert("각 문항당 500자를 초과할 수 없습니다.");
      return;
    }

    // 2. 서버 형식에 맞게 데이터 가공 (질문 순회하며 답변 매칭)
    const answersPayload = questions.map((q) => ({
      questionId: q.questionId,
      content: formData[`q${q.questionNumber}`] || "", // 작성 안 했으면 빈 문자열
    }));

    try {
      const response = await fetch(
        `/api/applications/${applicationId}/answers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: answersPayload }),
        },
      );

      if (response.ok) {
        alert("임시 저장되었습니다.");
      } else {
        const result = await response.json();
        alert(`저장 실패: ${result.message}`);
      }
    } catch (error) {
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col max-w-[800px] mx-auto pb-20 font-pretendard">
      <div className="flex flex-col gap-12 w-full">
        {/* 🚀 1. 질문 리스트 렌더링 (GitHub 관련 질문은 제외) */}
        {questions
          .filter((q) => !q.content.includes("GitHub")) // 질문 내용에 GitHub이 포함되면 리스트에서 제외
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
                // 🔥 마지막 질문(4번)일 때만 높이를 낮게 설정 (rows나 custom height)
                rows={isLastQuestion ? 4 : 10}
                className={isLastQuestion ? "min-h-[120px]" : "min-h-[280px]"}
              />
            );
          })}

        {/* 🚀 2. 하단 링크 입력 (Input 컴포넌트) */}
        <Input
          label={linkLabel}
          name="link"
          // 디자인 직군일 때만 true가 되어 빨간 별(*)이 표시됨
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
          onClick={() => {
            // 🔍 데이터가 잘 있는지 확인용 로그
            console.log(
              "이전으로 이동 시 데이터 체크:",
              applicationId,
              formData.password?.length,
            );

            navigate("/recruit/info", {
              state: {
                applicationId: applicationId,
                // 비밀번호 길이는 보통 로그인 응답이나 formData에 저장된 값을 씁니다.
                passwordLength:
                  location.state?.passwordLength || formData.password?.length,
              },
            });
          }}
          className="flex-1 px-[10px] py-[24px] border border-[#ccc] text-[rgba(18,18,18,0.8)] rounded-[12px] text-[20px] font-bold"
        >
          이전으로
        </button>
        <button
          type="button" // form 안에 있을 경우 submit 방지
          onClick={handleSave}
          className="flex-1 py-6 border border-[#ccc] rounded-[12px] text-[20px] font-bold hover:bg-gray-50 transition-colors"
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
    </div>
  );
};

export default ApplyPage;
