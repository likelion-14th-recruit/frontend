import React from "react";
import { motion } from "framer-motion";

const HSection = ({
  color,
  id,
  children,
}: {
  color: string;
  id?: string;
  children: React.ReactNode;
}) => {
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
  return (
    <motion.section
      data-header="light"
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // 20% 정도 보일 때 한 번만 실행
      variants={containerVariants}
      className={
        color == "light"
          ? "flex p-[28px_20px] md:p-[60px] lg:p-[100px] flex-col justify-center items-start gap-10 self-strech"
          : "flex p-[28px_20px] md:p-[60px] lg:p-[100px] flex-col justify-center items-end gap-10 self-stretch bg-lightGray"
      }
    >
      {children}
    </motion.section>
  );
};

export default HSection;
