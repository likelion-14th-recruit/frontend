import PositionCard from "../../components/common/PositionCard";
import FAQList from "../../components/recruit-home/FAQList";
import HeroSection from "../../components/recruit-home/HeroSection";
import ScheduleItem from "../../components/recruit-home/ScheduleItem";
import Section from "../../components/recruit-home/Section";
import CompleteModal from "../../components/recruit/CompleteModal";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RecruitHome = () => {
  const schedules = [
    { label: "1차 서류 접수", date: "02.21 (토) ~ 03.05 (목)" },
    { label: "1차 발표", date: "03.07 (토)" },
    { label: "2차 면접", date: "03.09 (월) ~ 03.12 (목)" },
    { label: "최종 발표", date: "03.14 (토)" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 성공 모달 상태 관리
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  useEffect(() => {
    // 1. 변수를 미리 선언합니다.
    let scrollUp;

    // 2. 페이지에 진입하자마자 스크롤을 맨 위로 올립니다.
    scrollUp = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    // 3. 만약 완료 신호(state)가 있다면 모달을 켭니다.
    if (location.state?.showCompleteModal) {
      setIsCompleteModalOpen(true);

      // 뒤로가기 시 모달 재발생 방지를 위한 state 초기화
      navigate(location.pathname, { replace: true, state: {} });
    }

    // 클린업 함수에서 정확히 참조 가능합니다.
    return () => {
      if (scrollUp) cancelAnimationFrame(scrollUp);
    };
  }, [location.pathname, location.state, navigate]);
  return (
    <>
      <HeroSection />

      <CompleteModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
      />

      <div className="bg-lightGray">
        <div
          className="
          flex 
          flex-col 
          gap-[40px]

          px-[40px]
          py-[60px]

          desktop:gap-[80px]
          desktop:px-[100px] 
          desktop:py-[120px] "
        >
          <Section title="모집 대상">
            <div className="bg-white flex flex-col justify-center items-center px-[20px] py-[24px] self-stretch">
              <p
                className="text-center 
               leading-[140%] text-black
               
               font-regular 
               text-[16px]

               tablet-lg:font-semibold
              
               desktop:text-[20px]
               "
              >
                아이디어를 현실로 만들고 싶은 기획자·디자이너·개발자, 그리고 IT
                창업에 관심 있는 서강대학교 학생
              </p>
            </div>
          </Section>

          <Section title="모집 직군">
            <div
              className="
                  grid
                  grid-cols-1

                  tablet-lg:grid-cols-2
                  desktop:grid-cols-3

                  gap-[16px]
                  tablet-lg:gap-[20px]
                  desktop:gap-[24px]"
            >
              <PositionCard
                title="Backend"
                description="데이터를 처리하고 비즈니스 로직을 설계하며, 서버 환경을 구축하고 관리합니다."
                imageUrl="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/BE.png"
                link="https://inquisitive-glider-d28.notion.site/14-2faac3ee3cde80018b9ef7940f6ba946?source=copy_link"
              />
              <PositionCard
                title="Frontend"
                description="사용자와 직접 상호작용하는 인터페이스를 구현하고, 서버와 연동해 동적 웹사이트를 개발합니다."
                imageUrl="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/FE.png"
                link="https://inquisitive-glider-d28.notion.site/14-2faac3ee3cde80859892c0d1e524bc1a?source=copy_link"
              />
              <PositionCard
                title="Product Design"
                description="사용자의 문제를 정의하고 서비스 전략부터 구조와 UI를 설계해 실제 시장에서 작동하는 제품으로 시각화합니다."
                imageUrl="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/DE.png"
                link="https://inquisitive-glider-d28.notion.site/14-2faac3ee3cde80418ad8d14a0d5ae963?source=copy_link"
              />
            </div>
          </Section>

          <Section title="지원 일정">
            <div
              className="
            grid
            grid-cols-2
            tablet-lg:flex

            gap-[16px]
            desktop:gap-[20px]"
            >
              {schedules.map((item) => (
                <ScheduleItem
                  key={item.label}
                  label={item.label}
                  date={item.date}
                />
              ))}
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
