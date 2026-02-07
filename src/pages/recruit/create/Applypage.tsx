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
    const fetchQuestions = async () => {
      // ⚠️ ID가 없으면 바로 리턴
      if (!applicationId) {
        console.warn(
          "⚠️ applicationId가 state에 없습니다. 이전 페이지를 확인하세요.",
        );
        return;
      }

      try {
        console.log(
          `🔍 질문 요청 시작: /api/applications/${applicationId}/questions`,
        );
        const response = await fetch(
          `/api/applications/${applicationId}/questions`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.ok) {
          const result = await response.json();
          console.log("✅ 서버 응답 데이터:", result);

          // 만약 데이터가 result.data.questions 형태라면:
          if (result.data && Array.isArray(result.data.questions)) {
            const sortedQuestions = result.data.questions.sort(
              (a, b) => a.questionNumber - b.questionNumber,
            );
            setQuestions(sortedQuestions);
          } else {
            console.error("❌ 질문 데이터 형식이 올바르지 않습니다:", result);
          }
        } else {
          console.error(
            "❌ 질문 목록 로드 실패 (HTTP status):",
            response.status,
          );
        }
      } catch (error) {
        console.error("❌ 네트워크 에러:", error);
      }
    };

    fetchQuestions();
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

    const commonValid =
      questions.length > 0 &&
      questions.every((q) => checkLength(formData[`q${q.questionNumber}`]));

    if (isDesign) {
      // 디자인: 자기소개서 완필 + 링크 필수
      return commonValid && (formData.link?.trim().length || 0) > 0;
    } else {
      // 개발: 자기소개서만 완필하면 통과 (링크는 빈값이어도 상관없음)
      return commonValid;
    }
  })();

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
          onClick={() => alert("임시 저장되었습니다.")}
          className="flex-1 py-6 border border-[#ccc] rounded-[12px] text-[20px] font-bold"
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
