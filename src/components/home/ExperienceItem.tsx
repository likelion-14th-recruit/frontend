interface ExperienceProps {
  track: string;
  content: string;
}

const ExperieceItem = ({ track, content }: ExperienceProps) => {
  // 클릭 핸들러: 주소가 있을 때만 새 탭을 엽니다.
  return (
    <div className="flex w-[360px] h-[260px] p-[32px] flex-col items-center gap-[12px] border border-[var(--Black-20,rgba(18,18,18,0.20))]">
      <div className="self-stretch text-[var(--Sogang-100,#B60005)] font-sogang text-[20px] font-normal leading-[140%]">
        {track}
      </div>
      <div className="self-stretch font-pretendard text-[16px] font-normal leading-[160%] text-black/80">
        {content}
      </div>
    </div>
  );
};

export default ExperieceItem;
