import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      data-header="dark"
      className="
        relative z-0
        flex items-center justify-center
        h-[680px]
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
          w-full h-full
          object-cover
          pointer-events-none
        "
      />

      <div
        className="
          relative
          flex flex-col items-center
          text-center
        "
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
        <h1
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
        </h1>

        {/* 설명 */}
        <p
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
        </p>

        {/* 버튼 */}
      <button
        onClick={() => navigate("/recruit/start")}
        className="
          relative z-10
          flex items-center justify-center

          bg-sogang
          text-white

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

export default HeroSection;