import PositionCard from "../../components/common/PositionCard";
import FAQList from "../../components/recruit-home/FAQList";
import HeroSection from "../../components/recruit-home/HeroSection";
import ScheduleItem from "../../components/recruit-home/ScheduleItem";
import Section from "../../components/recruit-home/Section";
import CompleteModal from "../../components/recruit/CompleteModal";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// ✅ Home 파일의 모션 컨셉을 RecruitHome에도 동일하게 적용
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 차분하게
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 }, // 약한 y축 이동
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }, // 과하지 않게
  },
};

const RecruitHome = () => {
  const schedules = [
    { label: "1차 서류 접수", date: "02.21 (토) ~ 03.05 (목)" },
    { label: "1차 발표", date: "03.07 (토)" },
    { label: "2차 면접", date: "03.09 (월) ~ 03.12 (목)" },
    { label: "최종 발표", date: "03.14 (토)" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  useEffect(() => {
    let scrollUp: number;

    scrollUp = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    });

    if (location.state?.showCompleteModal) {
      setIsCompleteModalOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }

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
            desktop:py-[120px]
          "
        >
          {/* ✅ 모집 대상 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
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
            </motion.div>
          </motion.div>

          {/* ✅ 모집 직군 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <Section title="모집 직군">
                <div
                  className="
                    grid
                    grid-cols-1
                    tablet-lg:grid-cols-2
                    desktop:grid-cols-3
                    gap-[16px]
                    tablet-lg:gap-[20px]
                    desktop:gap-[24px]
                  "
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
            </motion.div>
          </motion.div>

          {/* ✅ 지원 일정 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <Section title="지원 일정">
                <div
                  className="
                    grid
                    grid-cols-2
                    tablet-lg:flex
                    gap-[16px]
                    desktop:gap-[20px]
                  "
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
            </motion.div>
          </motion.div>

          {/* ✅ FAQ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <Section title="FAQ">
                <FAQList />
              </Section>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RecruitHome;