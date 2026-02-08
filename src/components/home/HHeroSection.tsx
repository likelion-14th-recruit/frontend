import { motion } from "framer-motion";

const HeroSection = () => {
  const homeIntrobg =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/1.png";
  const homeIntroMobile =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/title_2.png";
  const homeIntroTablet =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/title_1.png";
  const homeIntroDesktop =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/title.png";
  return (
    <section
      className="relative overflow-hidden w-full bg-black
   "
    >
      <div
        className="flex flex-col items-center justify-center self-stretch w-full mx-auto
             gap-[40px] lg:gap-[60px] 
             h-[600px] md:h-[700px] lg:h-[960px] 
             md:max-w-[1024px] lg:max-w-[1440px]" // 최대 너비만 제한
        style={{
          background: `url(${homeIntrobg}) lightgray center center / cover no-repeat`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            className="block md:hidden h-[141px] w-[290px]"
            src={homeIntroMobile}
          ></img>
          <img
            className="hidden md:block lg:hidden md:h-[255px] md:w-[530px] "
            src={homeIntroTablet}
          ></img>
          <img
            className="hidden lg:block lg:h-[342px] lg:max-w-[678px]"
            src={homeIntroDesktop}
          ></img>
        </motion.div>
        {/* 4. 버튼 */}
        <motion.button
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="
           relative z-10
    flex items-center justify-center gap-[10px]
    px-[16px] md:px-[24px] py-[10px]
    rounded-[10px] md:rounded-[12px]
    bg-sogang
    text-white
    text-center
    font-pretendard
    text-[14px] md:text-[16px] lg:text-[20px]
    font-semibold
    leading-[140%]

    after:content-['']
    after:absolute after:inset-0
    after:bg-[#121212]/20
    after:opacity-0
    after:transition-opacity after:duration-200
    hover:after:opacity-100
        "
        >
          14기 지원하기
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
