import HeroSection from "../../components/recruit-home/HeroSection";
import Section from "../../components/recruit-home/Section";

const RecruitHome = () => {
  return (
    <>
      <HeroSection />

      <Section title="모집 대상">
        <p>아이디어를 현실로 만들고 싶은 ...</p>
      </Section>

      {/* <Section title="모집 직군">
        <div className="grid">
          <PositionCard />
          <PositionCard />
          <PositionCard />
        </div>
      </Section>

      <Section title="지원 일정">
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
      </Section>

      <Section title="FAQ">
        <FAQList />
      </Section> */}
    </>
  );
};


export default RecruitHome;
