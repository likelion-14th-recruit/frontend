const HeroSection = () => {
  const homeIntrobg =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/1.png";
  const homeIntrotitle =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Home/title.png";
  return (
    <section
      data-header="dark"
      className="relative w-full flex flex-col justify-center items-center 
                gap-[40px] md:gap-[40px] lg:gap-[60px] self-stretch overflow-hidden
                h-[600px] md:h-[700px] lg:h-[960px] "
      //   className="relative z-0 w-full text-white flex h-[960px] flex-col justify-center items-center gap-[60px] self-stretch "
      style={{
        background: `url(${homeIntrobg}) lightgray 0px 0px / 100% 100% no-repeat`,
      }}
    >
      <div
        className="flex shrink-0 bg-no-repeat bg-center bg-contain
    
    /* [모바일] 기본값: 작게 시작 */
    h-[141.75px] w-[280px]
    
    /* [태블릿/작은 데스크톱] 1024px 이상: 디자이너 지침 수치 */
    md:h-[262px] md:max-w-[520px]
    
    /* [큰 데스크톱] 1440px 이상 (xl 또는 사용자 정의) */
    lg:h-[342px] lg:max-w-[678px]"
        style={{
          backgroundImage: `url(${homeIntrotitle})`,
        }}
      ></div>
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
