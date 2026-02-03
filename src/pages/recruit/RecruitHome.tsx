import PositionCard from "../../components/common/PositionCard";
import FAQList from "../../components/recruit-home/FAQList";
import HeroSection from "../../components/recruit-home/HeroSection";
import ScheduleItem from "../../components/recruit-home/ScheduleItem";
import Section from "../../components/recruit-home/Section";

const RecruitHome = () => {

  const schedules = [
  { label: "1차 서류 접수", date: "02.21 (토) ~ 03.05 (목)" },
  { label: "1차 발표", date: "03.07 (토)" },
  { label: "2차 면접", date: "03.09 (월) ~ 03.12 (목)" },
  { label: "최종 발표", date: "03.14 (토)" },
];

  return (
    <>
      <HeroSection />

      <div className="bg-lightGray">
        <div className="
            px-[100px]
            py-[120px]
            flex
            flex-col
            gap-[80px]">


      <Section title="모집 대상">
        <div className="
            bg-white
            flex
            flex-col
            justify-center
            items-center
            gap-[10px]
            px-[20px]
            py-[24px]
            self-stretch">
           <p className="
              text-center
              text-[20px]
              font-semibold
              leading-[140%]
              text[black">
            아이디어를 현실로 만들고 싶은 기획자·디자이너·개발자, 그리고 IT 창업에 관심 있는 서강대학교 학생</p>
        </div>
      </Section>
  

      <Section title="모집 직군">
        <div className="grid grid-cols-3 gap-[24px]">
          <PositionCard
            title="Backend"
            description="데이터를 처리하고 비즈니스 로직을 설계하며, 서버 환경을 구축하고 관리합니다."
            imageUrl="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/BE.png"
            link="https://example.com/BEnotion"
          />

          <PositionCard
            title="Frontend"
            description="사용자와 직접 상호작용하는 인터페이스를 구현하고, 서버와 연동해 동적 웹사이트를 개발합니다."
            imageUrl="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/FE.png"
            link="https://example.com/FEnotion"
          />

          <PositionCard
            title="Product Design"
            description="사용자의 문제를 정의하고 서비스 전략부터 구조와 UI를 설계해 실제 시장에서 작동하는 제품으로 시각화합니다."
            imageUrl="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/DE.png"
            link="https://example.com/DEnotion"
          />
        </div>
      </Section>

      <Section title="지원 일정">
        <div className="flex gap-[20px]">
        { schedules.map((item) => (
          <ScheduleItem
            key={item.label}
            label={item.label}
            date={item.date}
          />
        )) }
        </div>
      </Section>

      <Section title="FAQ">
        <FAQList />
      </Section>
      </div>
      </div>
    </>

  );
};


export default RecruitHome;
