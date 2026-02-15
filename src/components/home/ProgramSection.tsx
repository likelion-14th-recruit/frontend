import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProgramItem from "./ProgramItem";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
// Props 타입 정의
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const programsData = [
  {
    title: "Lion Sprint",
    content:
      "백엔드, 프론트엔드, 기획·디자인 각 파트별 집중 교육 세션으로 운영진이 직접 제작한 자료를 바탕으로 학습과 실습을 진행합니다.",
    img: "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/program/1.png",
  },
  {
    title: "해커톤",
    content:
      "아이디어톤, 복커톤, 중앙 해커톤, 신촌톤 등 다양한 활동을 통해 Lion Sprint에서 배운 내용을 직접 적용해봅니다.",
    img: "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/program/2.png",
  },
  {
    title: "스터디",
    content:
      "본인 파트 또는 학습하고 싶은 파트를 선택해 자율적으로 스터디 활동을 진행하며, 각자의 역량을 확장해 나갑니다.",
    img: "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/program/3.png",
  },
  {
    title: "데모데이",
    content:
      "신촌 소재 대학과 함께 진행하는 활동으로, 2학기 동안 프로젝트를 진행하고 발표하는 시간을 가집니다.",
    img: "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/program/4.png",
  },
];

const ProgramSection = () => {
  const nav = useNavigate();
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col  min-w-[375] md:w-[596px] lg:w-[752px] items-start gap-[20px] md:gap-[32px] lg:gap-[40px]"
    >
      <motion.div
        variants={itemVariants}
        className="text-black/80 font-sogang text-[32px] md:text-[40px] font-normal leading-[120%]"
      >
        Programs
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="inline-grid grid-cols-2 gap-[16px] md:gap-[20px] lg:gap-[32px] self-stretch"
      >
        {programsData.map((program, index) => (
          <ProgramItem
            key={index}
            img={program.img}
            title={program.title}
            content={program.content}
          />
        ))}
      </motion.div>
      <motion.div
        onClick={() => {
          nav("/about", { state: { scrollTo: "activities" } });
        }}
        variants={itemVariants}
        className="h-10 inline-flex justify-center items-center gap-1 cursor-pointer"
      >
        <div className="justify-start text-black text-[14px] lg:text-[16px] font-semibold leading-6">
          더 알아보기
        </div>
        <ChevronRight size={18} />
      </motion.div>
    </motion.div>
  );
};

export default ProgramSection;
