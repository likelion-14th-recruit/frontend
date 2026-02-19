import { motion } from "framer-motion";
import ApplyBtn from "../common/ApplyBtn";
import Home_logo from "/home/home_1.webp";
import HomeMobile from "/home/title_2.webp";
import HomeTablet from "/home/title_1.webp";
import HomeDesktop from "/home/title.webp";

const HeroSection = () => {
  const homeIntrobg = Home_logo;
  const homeIntroMobile = HomeMobile;
  const homeIntroTablet = HomeTablet;
  const homeIntroDesktop = HomeDesktop;
  const downbtn =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/arrow.svg";
  return (
    <section
      className="relative overflow-hidden w-full bg-black 
   "
    >
      <div
        className="flex flex-col items-center self-stretch w-full mx-auto pt-[189.13px] md:pt-[179.5px] lg:pt-[255px]
             gap-[40px] lg:gap-[60px] 
             h-[600px] md:h-[700px] lg:h-[960px] 
             md:max-w-[1024px] lg:max-w-[1440px]" // 최대 너비만 제한
        style={{
          backgroundImage: `url(${homeIntrobg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
