import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IntroSection = () => {
  const nav = useNavigate();
  return (
    <div className="flex flex-col justify-start items-start gap-[24px] md:gap-[32px] lg:gap-[40px] max-w-[334px] md:max-w-[576px] lg:max-w-[720px]">
      <img
        className="w-[320px] md:w-[576px] lg:w-[720px] h-[178px] md:h-[320px] lg:h-[400px] "
        src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/intro/1.png"
      ></img>
      <div className="flex flex-col items-start gap-5 self-stretch">
        <div className="px-3 py-1 bg-red-700/60 inline-flex justify-center items-center gap-2.5">
          <div className="text-white font-pretendard text-[20px] md:text-[28px] lg:text-[32px] font-regular md:font-semibold leading-[120%] tracking-[-0.64px]">
            서강대학교 멋쟁이사자처럼은
          </div>
        </div>
        <div className="self-stretch text-black/80 font-pretendard text-[16px] lg:text-[20px] font-regular md:font-semibold leading-[140%]">
          기초부터 심화까지, 아이디어를 실제 서비스로 만들어보는 경험을 하는 IT
          창업 동아리입니다.이 과정에서 대면 교육 세션과 해커톤, 데모데이 등
          다양한 활동을 통해 함께 배우고 도전하며 성장합니다. 이러한 활동의
          결과로, 2025 신촌 대학 연합 SW 창업 경진 대회에서 은상과 동상 수상
          팀을 배출했습니다.
        </div>
      </div>
      <div
        onClick={() => {
          nav("/about");
          window.scrollTo(0, 0);
        }}
        className="h-10 inline-flex justify-center items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
      >
        <div className="justify-start text-neutral-900 text-[14px] lg:text-[16px] font-semibold font-['Pretendard'] leading-6">
          더 알아보기
        </div>
        <ChevronRight size={18} />
      </div>
    </div>
  );
};

export default IntroSection;
