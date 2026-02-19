import { motion } from "framer-motion";
import ApplyBtn from "../common/ApplyBtn";

const HeroSection = () => {
  const homeIntrobg =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/1.png";
  const homeIntroMobile =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/title_2.png";
  const homeIntroTablet =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/title_1.png";
  const homeIntroDesktop =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/title.png";
  const downbtn =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/arrow.svg";
  return (
    <section
      className="relative overflow-hidden w-full bg-black 
   "
    >
      <div
        className="flex flex-col items-center self-stretch w-full mx-auto pt-[189.13px] md:pt-[179.5px] lg:pt-[225px]
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
        <ApplyBtn />
        <motion.div
          className="flex aspect-1/1 w-[41.6px] lg:w-[52px]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        >
          <img src={downbtn} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
