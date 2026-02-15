import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 텍스트 -> 버튼 순차 노출 (차분하게)
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -18 }, // 상단 -> 하단 방향으로 내려오며 등장
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 , ease: "easeOut" }, // 요청한 0.5초 감각
  },
};

// 버튼 위쪽 아무데나 추가
const deadline = new Date("2026-03-05T23:59:59");
const isClosed = new Date() > deadline;

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      data-header="dark"
      className="
        relative z-0
        flex items-center justify-center
        h-[480px]
          tablet-lg:h-[520px]
          desktop:h-[680px]
      
        text-white
      "
    >
      {/* 어두운 오버레이 */}
      <div
        className="
          absolute inset-0
          bg-black/60
          pointer-events-none
        "
      />

      {/* 배경 이미지 */}
      <img
        src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/1.png"
        className="
          absolute inset-0
          w-full
          h-[480px]
          tablet-lg:h-[520px]
          
          desktop:h-full
          object-cover
          pointer-events-none
        "
        alt=""
      />

      {/* ✅ 여기만 motion 컨테이너로 바꿔서 "텍스트 -> 버튼" 순차 등장 */}
      <motion.div
        className="
          relative
          flex flex-col items-center
          text-center
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Ellipse 배경 */}
        <div
          className="
            absolute
            left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[800px]
            h-[500px]
            rounded-full
            pointer-events-none
          "
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #121212 0%, rgba(18, 18, 18, 0) 100%)",
          }}
        />

        {/* 타이틀 */}
        <motion.h1
          variants={itemVariants}
          className="
            relative z-10
            text-center
            font-sogang
            font-regular
            text-[40px]
            desktop:text-[64px]
            leading-[120%]
          "
        >
          LikeLion 14th <br />
          Recruit
        </motion.h1>

        {/* 설명 */}
        <motion.p
          variants={itemVariants}
          className="
            relative z-10
            text-center
            text-white/80
            font-pretendard
            leading-[140%]
            mt-[16px]
            mb-[32px]
            text-[16px]
            font-semibold
            desktop:mt-[24px]
            desktop:mb-[40px]
            desktop:text-[20px]
            desktop:font-normal
          "
        >
          멋쟁이사자처럼에서 꿈을 실현할 아기사자를 모집합니다!
        </motion.p>

        {/* 버튼 */}
        <motion.button
          variants={itemVariants}
          onClick={() => {
            if (!isClosed) navigate("/recruit/start");
          }}
          disabled={isClosed}
          className={`
            relative z-10
            flex items-center justify-center
            font-pretendard
            leading-[140%]
            text-[14px]
            px-[16px]
            py-[10px]
            rounded-[10px]
            font-semibold
            tablet-lg:text-[16px]
            desktop:text-[20px]
            desktop:px-[24px]
            desktop:rounded-[12px]

            ${
              isClosed
                ? "bg-[#9C9C9C] text-white/80 cursor-not-allowed"
                : "bg-sogang text-white"
            }

            after:content-['']
            after:absolute after:inset-0
            after:bg-[#121212]/20
            after:opacity-0
            after:transition-opacity after:duration-200
            hover:after:opacity-100
          `}
        >
          {isClosed ? "14기 모집 마감" : "14기 지원하기"}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;