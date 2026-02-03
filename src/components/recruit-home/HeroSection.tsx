import React from 'react'

const HeroSection = () => {
  return (
<section data-header="dark" className="relative z-0 h-[600px] flex items-center justify-center text-white">
  <div className="absolute inset-0 bg-black/60 pointer-events-none" />
  <img
    src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/Recruit/1.png"
    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
  />


  <div className="relative flex flex-col items-center text-center overflow-hidden">
  {/* 🔥 Ellipse 배경 */}
  <div
    className="
      absolute
      left-1/2
      top-1/2
      -translate-x-1/2
      -translate-y-1/2
      w-[800px]
      h-[500px]
      rounded-[778px]
      pointer-events-none
    "
    style={{
      background:
        "radial-gradient(50% 50% at 50% 50%, #121212 0%, rgba(18, 18, 18, 0) 100%)",
    }}
  />

  {/* 콘텐츠 */}
  <h1 className="text-white text-center font-sogang relative z-10 text-5xl font-normal text-[64px] leading-[120%]">
    LikeLion 14th <br/>Recruit
  </h1>

  <p className="text-white/80 text-center font-pretendard text-[20px] font-normal leading-[140%] relative z-10 mt-[24px] mb-[40px] ">
    멋쟁이사자처럼에서 꿈을 실현할 아기사자를 모집합니다!
  </p>

  <button
  className="
    relative z-10
    flex items-center justify-center gap-[10px]
    px-[24px] py-[10px]
    rounded-[12px]
    bg-sogang
    text-white
    text-center
    font-pretendard
    text-[20px]
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

</div>

</section>

  );
};


export default HeroSection