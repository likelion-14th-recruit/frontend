import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import TextArea from "../../../components/recruit/TextArea";
import Input from "../../../components/recruit/Input";

const ApplyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 에러 방지: context가 없을 경우를 대비해 기본값 설정
  const context = useOutletContext();
  const formData = context?.formData || {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    link: "",
  };
  const setFormData = context?.setFormData;

  const userField = location.state?.field || "프론트엔드";

  // 🔥 1. 핸들러 함수
  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setFormData?.((prev) => ({ ...prev, [name]: value }));
  };

  // 🔥 2. 변수 선언 위치 수정 (linkPlaceholder 등이 isFormValid보다 위에 있어야 함)
  const isDesign = userField === "기획·디자인";
  const linkLabel = isDesign ? "포트폴리오 링크" : "GitHub 링크(선택)";
  const linkPlaceholder = isDesign
    ? "포트폴리오 URL을 입력해주세요."
    : "GitHub URL을 입력해주세요.";
  const linkGuide = isDesign
    ? "Notion, Figma, Google Drive 등 형식은 자유입니다."
    : " ";

  // 🔥 유효성 검사 로직: 1자 이상 ~ 500자 이하일 때만 통과
  const isFormValid = (() => {
    const checkLength = (text) => {
      const len = text?.trim().length || 0;
      return len >= 1 && len <= 500; // 1자 이상 500자 이하 조건
    };

    const commonValid =
      checkLength(formData.q1) &&
      checkLength(formData.q2) &&
      checkLength(formData.q3) &&
      checkLength(formData.q4);

    const isDesign = userField === "기획·디자인";

    if (isDesign) {
      // 디자인: 자소서 조건 충족 + 링크 필수
      return commonValid && (formData.link?.trim().length || 0) > 0;
    } else {
      // 개발: 자소서 조건만 충족하면 됨
      return commonValid;
    }
  })();

  return (
    <div className="flex flex-col max-w-[800px] mx-auto pb-20 font-pretendard">
      <div className="flex flex-col gap-12 w-full">
        <TextArea
          label="1. 간단한 자기소개와 함께, 다양한 IT 동아리 중에서 멋쟁이사자처럼 서강대학교 14기를 선택하고 지원하시게 된 이유를 작성해주세요. (500자 이내)"
          name="q1"
          required
          maxLength={500}
          currentLength={formData.q1?.length || 0}
          placeholder="내용을 입력해주세요."
          onChange={handleAnswerChange}
          value={formData.q1}
        />
        {/* ... 질문 2, 3, 4 동일하게 value={formData.q2~4} 연결 ... */}
        <TextArea
          label="2. 선택한 파트를 지원하게 된 이유와 관련 경험이 있다면 함께 작성해주세요. 관련 경험이 없다면, 멋쟁이사자처럼에서 해당 파트로 활동하며 어떤 성장을 기대하는지 작성해주세요. (500자 이내)"
          name="q2"
          required
          maxLength={500}
          currentLength={formData.q2?.length || 0}
          placeholder="내용을 입력해주세요."
          onChange={handleAnswerChange}
          value={formData.q2}
        />
        <TextArea
          label="3. 멋쟁이사자처럼 서강대학교는 협업과 팀워크를 중요한 가치로 생각하는 공동체입니다. 지원 분야와 관계 없이 지원자 본인이 협업과 팀워크를 진행해보았던 경험과, 그 경험을 멋쟁이사자처럼 서강대학교에서 어떻게 적용시킬 수 있을지 작성해주세요. (500자 이내)"
          name="q3"
          required
          maxLength={500}
          currentLength={formData.q3?.length || 0}
          placeholder="내용을 입력해주세요."
          onChange={handleAnswerChange}
          value={formData.q3}
        />
        <TextArea
          label="4. 실현하고 싶은 자신만의 서비스, IT 서비스 아이디어에 대해 설명해주세요. (500자 이내)"
          name="q4"
          required
          maxLength={500}
          currentLength={formData.q4?.length || 0}
          placeholder="내용을 입력해주세요."
          onChange={handleAnswerChange}
          value={formData.q4}
        />

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
          onClick={() => navigate(-1)}
          className="flex-1 px-[10px] py-[24px] border border-[#ccc] text-[rgba(18,18,18,0.8)] rounded-[12px] text-[20px] font-bold"
        >
          이전으로
        </button>
        <button
          onClick={() => alert("임시 저장되었습니다.")}
          className="flex-1 px-[10px] py-[24px] border border-[#ccc] text-[rgba(18,18,18,0.8)] rounded-[12px] text-[20px] font-bold"
        >
          임시 저장
        </button>
        <button
          disabled={!isFormValid}
          onClick={() => navigate("/recruit/interview")}
          className={`flex-1 px-[10px] py-[24px] rounded-[12px] text-[20px] font-bold transition-all 
            ${isFormValid ? "bg-black text-white cursor-pointer" : "bg-[#ccc] text-white cursor-not-allowed"}`}
        >
          다음으로
        </button>
      </footer>
    </div>
  );
};

export default ApplyPage;
