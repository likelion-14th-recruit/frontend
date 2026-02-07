interface ExperienceProps {
  track: string;
  content: string;
}

const ExperieceItem = ({ track, content }: ExperienceProps) => {
  // 클릭 핸들러: 주소가 있을 때만 새 탭을 엽니다.
  return (
    <div
      className="flex flex-col items-center border border-black/20
                gap-[8px] md:gap-[12px]   
                w-[200px] h-[234px] md:w-[320px] md:h-[270px] lg:w-[360px] lg:h-[260px] 
                p-[12px] md:p-[24px] lg:p-[32px] 
    "
    >
      <div className="self-stretch text-sogang/100 font-sogang text-[16px] md:text-[20px] font-normal leading-[140%]">
        {track}
      </div>
      <div className="self-stretch font-pretendard text-[14px] md:text-[16px] leading-[160%] text-black/100">
        {content}
      </div>
    </div>
  );
};

export default ExperieceItem;
