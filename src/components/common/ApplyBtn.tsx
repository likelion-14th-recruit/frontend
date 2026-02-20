import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type RecruitStatus = "UPCOMING" | "OPEN" | "CLOSED";

const ApplyBtn = () => {
  const nav = useNavigate();
  const [status, setStatus] = useState<RecruitStatus>("UPCOMING");

  const START_DATE = new Date("2026-02-23T00:00:00+09:00");
  const END_DATE = new Date("2026-03-05T23:59:59+09:00");

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();

      if (now < START_DATE) {
        setStatus("UPCOMING");
      } else if (now >= START_DATE && now <= END_DATE) {
        setStatus("OPEN");
      } else {
        setStatus("CLOSED");
      }
    };

    updateStatus();
    const timer = setInterval(updateStatus, 10000); // 10초마다 체크
    return () => clearInterval(timer);
  }, []);

  // 상태에 따른 버튼 스타일 및 텍스트 매핑
  const statusConfig = {
    UPCOMING: {
      text: "14기 모집 예정",
      style: "bg-[#9C9C9C] text-white/80",
      disabled: true,
    },
    OPEN: {
      text: "14기 지원하기",
      style: ` bg-sogang after:content-['']
    after:absolute after:inset-0
    after:bg-[#121212]/20
    after:opacity-0
    after:transition-opacity after:duration-200
    hover:after:opacity-100`,
      disabled: false,
    },
    CLOSED: {
      text: "14기 모집 마감",
      style: "bg-[#9C9C9C] text-white/80",
      disabled: true,
    },
  };
  const current = statusConfig[status];

  return (
    <motion.button
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      onClick={() => !current.disabled && nav("/recruit/start")}
      disabled={current.disabled}
      className={`
           relative z-10
    flex items-center justify-center gap-[10px]
    px-[16px] md:px-[24px] py-[10px]
    rounded-[10px] md:rounded-[12px]
    text-white
    text-center
    font-pretendard
    text-[14px] md:text-[16px] lg:text-[20px]
    font-semibold
    leading-[140%]

    
       ${current.style} `}
    >
      {current.text}
    </motion.button>
  );
};

export default ApplyBtn;
