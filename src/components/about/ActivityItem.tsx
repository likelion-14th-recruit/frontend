interface Activity {
  id: number;
  title: string;
  term: string;
  description: string;
  imageURL: string;
}

interface ActivityItemProps {
  data: Activity;
  isSelected: boolean;
  isNothingSelected: boolean;
  onClick: () => void;
}

const ActivityItem = ({
  data,
  isSelected,
  isNothingSelected,
  onClick,
}: ActivityItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col items-start gap-[16px] w-[320px] h-[200px] tablet-lg:w-auto tablet-lg:h-[240px] self-stretch overflow-hidden justify-end cursor-pointer transition-all 
      ${!isNothingSelected && !isSelected ? "opacity-90" : "opacity-100"}`}
      /* 선택된 게 있는데 내가 아니면 opacity를 낮춤 (90%보다 더 차이를 두기 위해 40% 예시) */
    >
      <div
        className="flex p-[24px_32px] flex-col items-start gap-[16px] self-stretch h-full transition-opacity duration-300"
        style={{
          background: `linear-gradient(0deg, rgba(18, 18, 18, 0.64) 0%, rgba(18, 18, 18, 0.64) 100%), url(${data.imageURL}) lightgray 50% / cover no-repeat`,
        }}
      >
        <div className="flex justify-between items-center self-stretch">
          <div className="font-pretendard text-[20px] tablet-lg:text-[28px] font-semibold tablet-lg:font-normal leading-[120%] tracking-[-0.02em] text-white">
            {data.title}
          </div>
          <div className="flex p-[4px_12px] justify-center items-center gap-[10px] rounded-[8px] border border-white/80 text-white/80 text-[14px]">
            {data.term}
          </div>
        </div>

        {/* 클릭된 아이템만 설명(description) 노출 */}
        <div
          className={`self-stretch text-white/100 font-pretendard text-[14px] tablet-lg:text-[16px] leading-[160%] transition-all duration-300 overflow-hidden
          ${isSelected ? "opacity-100 max-h-[200px] mt-2" : "opacity-0 max-h-0"}`}
        >
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
