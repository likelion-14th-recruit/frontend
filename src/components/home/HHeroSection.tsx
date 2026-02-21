import { motion, animate } from "framer-motion";
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

  const handleScroll = () => {
    // 1. 진짜 스크롤바를 가진 <main> 요소를 정확히 찾습니다.
    const mainElement = document.querySelector("main");
    const targetElement = document.getElementById("intro-section");

    if (!mainElement || !targetElement) return;

    // 2. <main> 내부에서의 현재 스크롤 위치와 목표 위치 계산
    const start = mainElement.scrollTop;
    const target = targetElement.offsetTop;

    // 3. CSS smooth 스크롤 잠시 끄기 (main 요소의 스타일을 건드려야 합니다)
    mainElement.style.scrollBehavior = "auto";

    animate(start, target, {
      type: "spring",
      stiffness: 60,
      damping: 18, // 마찰력을 적절히 주어 목적지에서 팅기지 않고 묵직하게 멈춥니다.
      mass: 1.5, // 질량을 높여 "느리게 시작 -> 빨라짐 -> 묵직하게 멈춤"을 구현합니다.
      restDelta: 0.5, // 애니메이션이 거의 끝났을 때 미세한 떨림 방지

      onUpdate: (latest) => {
        mainElement.scrollTop = latest;
      },
      onComplete: () => {
        // 애니메이션 후 다시 smooth 복구
        mainElement.style.scrollBehavior = "smooth";
      },
    });
  };
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
            loading="eager"
            fetchPriority="high"
            decoding="async"
            src={homeIntroMobile}
          ></img>
          <img
            className="hidden md:block lg:hidden md:h-[255px] md:w-[530px] "
            loading="eager"
            fetchPriority="high"
            decoding="async"
            src={homeIntroTablet}
          ></img>
          <img
            className="hidden lg:block lg:h-[342px] lg:max-w-[678px]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            src={homeIntroDesktop}
          ></img>
        </motion.div>
        {/* 4. 버튼 */}
        <ApplyBtn />
        <motion.div
          className="flex aspect-1/1 w-[41.6px] lg:w-[52px] cursor-pointer"
          initial={{ opacity: 0, y: -30 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, delay: 0.6, ease: "easeOut" },
          }}
          // 2. 마우스 올렸을 때: 즉각적이고 탄성 있게 (뽀잉!)
          whileHover={{
            filter: "brightness(0.7)",
            transition: { duration: 0.2, delay: 0, ease: "easeOut" },
          }}
          transition={{ duration: 0.3 }}
          onClick={handleScroll}
        >
          <img
            src={downbtn}
            alt="scroll down"
            className="w-full h-full pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
