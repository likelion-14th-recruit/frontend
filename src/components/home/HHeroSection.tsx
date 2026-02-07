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
      data-header="dark"
      className="relative w-full flex flex-col justify-center items-center 
                gap-[40px] md:gap-[40px] lg:gap-[60px] self-stretch overflow-hidden
                h-[600px] md:h-[700px] lg:h-[960px] "
      //   className="relative z-0 w-full text-white flex h-[960px] flex-col justify-center items-center gap-[60px] self-stretch "
      style={{
        backgroundImage: `url(${homeIntrobg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "lightgray",
      }}
    >
      <div>
        <img
          className="block md:hidden 
          h-[141.75px] w-[280px] flex shrink-0 bg-no-repeat bg-center bg-contain"
          src={homeIntroMobile}
        ></img>
        <img
          className="hidden md:block lg:hidden md:h-[255px] md:w-[520px] "
          src={homeIntroTablet}
        ></img>
        <img
          className="hidden lg:block lg:h-[342px] lg:max-w-[678px]"
          src={homeIntroDesktop}
        ></img>
      </div>
      {/* 4. 버튼 */}
      <button
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
      </button>
      {/* </div> */}
    </section>
  );
};

export default HeroSection;
