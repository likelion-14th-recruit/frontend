import React from 'react'

const HeroSection = () => {
  return (
<section className="relative h-[600px] flex items-center justify-center text-white">
  <div className="absolute inset-0 bg-black/60" />
  <img
    src="/hero.jpg"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="relative text-center">
    <h1 className="text-5xl font-bold mb-4">
      LikeLion 14th Recruit
    </h1>
    <p className="mb-6 text-lg">
      멋쟁이사자처럼과 함께...
    </p>
    <button className="bg-red-600 px-6 py-3 rounded-md">
      14기 지원하기
    </button>
  </div>
</section>

  );
};


export default HeroSection