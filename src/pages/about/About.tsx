import ActivityList from "../../components/about/ActivityList";
import ArchiveList from "../../components/about/ArchiveList";
import PositionCard from "../../components/common/PositionCard";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 1. 부모(Section) 애니메이션 설정
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 자식 요소들이 0.2초 간격으로 순차 등장
      delayChildren: 0.1, // 섹션 진입 후 0.1초 뒤 시작
    },
  },
};
// 자식 애니메이션 설정
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const About = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. state 안에 scrollTo 값이 있는지 확인
    if (location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      const element = document.getElementById(targetId);

      if (element) {
        // 2. 해당 요소로 부드럽게 이동
        // 약간의 지연(100ms)을 주면 DOM 렌더링 후 더 안정적으로 작동합니다.
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });

          // 3. (선택사항) 스크롤 후 state를 초기화하여
          // 새로고침 시 다시 스크롤되는 것을 방지하고 싶다면 아래 로직 추가
          window.history.replaceState({}, document.title);
        }, 100);

        return () => clearTimeout(timer);
      }
    } else {
      // 4. 특정 목적지가 없다면 페이지 최상단으로 이동
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="overflow-x-hidden w-full">
      {/********************************************  Intro  *********************************************/}
      <section
        data-header="light"
        className="relative flex flex-col justify-center items-start gap-[40px] self-stretch
        p-[100px_20px_40px_20px] tablet-lg:p-[80px_60px]  desktop:p-[100px]"
      >
        <div className="absolute left-0 pointer-events-none w-[468px] h-[323px] top-[212px] tablet-lg:top-[255px] aspect-[468/323]">
          <img
            className="relative w-1/2 h-1/2 tablet-lg:w-full tablet-lg:h-full object-cover"
            src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/bg.png"
            alt="likelion-sogang-bg"
          />
        </div>

        {/* about images */}
        <div
          className="flex flex-col items-end gap-[12px] tablet-lg:gap-[20px] self-stretch
          "
        >
          <img
            className="w-[90px] tablet-lg:w-[180px] h-auto object-contain"
            src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/1.png"
            alt="about/1"
          />
          <div className="flex items-start gap-[12px] tablet-lg:gap-[20px]">
            <img
              className="w-[70px] tablet-lg:w-[140px] h-auto object-contain"
              src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/2.png"
              alt="about/2"
            />
            <img
              className="w-[70px] tablet-lg:w-[140px] h-auto object-contain"
              src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/3.png"
              alt="about/3"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-[20px] tablet-lg:gap-[40px] self-stretch">
          <div className="self-stretch text-sogang/100 font-sogang text-[32px] lg:text-[64px] font-normal leading-[120%] ">
            Possibility <a className="text-black/60">(to)</a> Reality
          </div>
          <div className="text-black/80 font-pretendard text-[16px] lg:text-[20px] font-normal self-stretch leading-[140%]">
            <p className="inline text-black font-semibold">
              (서강대학교 멋쟁이사자처럼)
            </p>
            <span>은</span>
            <br />
            각자의 관심과 시도를 바탕으로 함께 만들고 배우는 IT 창업
            동아리입니다.
            <br />
            <br />
            프로젝트와 해커톤을 통해 아이디어를 직접 구현해 보고,{" "}
            <br className="hidden tablet-lg:block" />
            협업 속에서 하나의 서비스를 완성해 가는 과정을 경험합니다.
            <br className="hidden tablet-lg:block" />
            <br className="block tablet-lg:hidden" />
            또한 다양한 교류와 네트워킹을 통해 학교 밖의 시도들과 연결되며
            시야를 넓혀갑니다.
            <br className="hidden tablet-lg:block" />
            <br className="block tablet-lg:hidden" />
            <br />
            아이디어를 현실로 옮기는 경험을 통해 성장해 나가는 여정에
            <br className="hidden tablet-lg:block" />
            서강대학교 멋쟁이사자처럼이 함께합니다.
          </div>
        </div>
      </section>

      {/********************************************  Activities  *********************************************/}
      <motion.section
        id="activities"
        data-header="light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // 20% 정도 보일 때 한 번만 실행
        variants={containerVariants}
        className="flex flex-col justify-center items-center 
                  p-[40px_20px] tablet-lg:p-[80px_60px] desktop:p-[100px_0px] 
                  gap-[32px] tablet-lg:gap-[40px] self-stretch"
      >
        <motion.div
          variants={itemVariants}
          className="text-black/80 text-center font-sogang text-[28px] tablet-lg:text-[32px] font-normal leading-[120%]"
        >
          Activities
        </motion.div>
        <ActivityList />
      </motion.section>

      {/********************************************  Positions  *********************************************/}
      <motion.section
        data-header="light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // 20% 정도 보일 때 한 번만 실행
        variants={containerVariants}
        className="flex flex-col justify-center items-center 
      p-[40px_20px] tablet-lg:p-[80px_60px] desktop:p-[100px_120px] 
      gap-[32px] tablet-lg:gap-[40px] self-stretch bg-lightGray"
      >
        <motion.div
          variants={itemVariants}
          className="font-sogang text-black/80 text-center text-[28px] tablet-lg:text-[32px] font-normal leading-[120%]"
        >
          Positions
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="w-full grid grid-cols-1 tablet-lg:grid-cols-2  desktop:grid-cols-3 
        gap-[16px] tablet-lg:gap-[20px] desktop:gap-[24px] "
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
        </motion.div>
      </motion.section>

      {/********************************************  Timeline  *********************************************/}
      <motion.section
        data-header="light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // 20% 정도 보일 때 한 번만 실행
        variants={containerVariants}
        className="flex flex-col justify-center items-center self-stretch
      p-[40px_20px] tablet-lg:p-[80px_60px] desktop:p-[100px_120px] 
      gap-[32px] tablet-lg:gap-[92px]"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-[12px] tablet-lg:gap-[20px]"
        >
          <div className="text-black/80 text-center font-sogang text-[28px] tablet-lg:text-[32px] font-normal leading-[120%]">
            Program Timeline
          </div>
          <div className="font-pretendard text-[16px] tablet-lg:text-[20px] font-normal leading-[140%] text-black/80 text-center">
            정기 일정은 매주 월·수요일 19:00~21:00이며,
            <br /> 모든 활동은 대면으로 진행됩니다. 단, 운영 상황에 따라 일정
            변동이 있을 수 있습니다.
          </div>
        </motion.div>

        <motion.img
          variants={itemVariants}
          className="w-[309px] tablet-lg:w-auto"
          src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/timeline.svg"
          alt="timeline"
        />
      </motion.section>

      {/********************************************  Archive  *********************************************/}
      <section
        className="flex flex-col justify-center items-center  self-stretch bg-lightGray
      p-[40px_20px] tablet-lg:p-[80px_60px] desktop:p-[100px_120px] 
      gap-[32px] tablet-lg:gap-[60px] "
      >
        <div className="flex flex-col items-center gap-[12px] tablet-lg:gap-[20px]">
          <div className="text-black/80 text-center font-sogang text-[28px] tablet-lg:text-[32px] font-normal leading-[120%]">
            Archive
          </div>
          <div className="text-black/80 text-center font-pretendard text-[16px] tablet-lg:text-[20px] font-normal leading-[140%]">
            멋쟁이사자처럼 서강대 인스타그램에서 지금까지의 활동들을 만나보세요.
          </div>
        </div>
        <div className="flex justify-center items-center w-full gap-[24px] self-stretch">
          <ArchiveList />
        </div>
      </section>
    </div>
  );
};

export default About;
