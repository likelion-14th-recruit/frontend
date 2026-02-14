const PeopleSkeletonCard = () => {
  return (
    <div className="flex flex-col items-center gap-[10px] animate-pulse">
      {/* 이미지 영역 */}
      <div className="
        w-[160px]
        h-[160px]
        
        r-820-1099:w-[240px] 
        r-820-1099:h-[240px]

        r-1100-up:w-[240px] 
        r-1100-up:h-[240px]rounded-[12px] bg-lightGray" />

      {/* 텍스트 영역 */}
      <div className="flex flex-col items-center gap-[8px] mt-[12px] mb-[20px]">
        <div className="w-[57px] h-[28px] rounded-[4px] bg-lightGray" />
        <div className="w-[164px] h-[26px] rounded-[4px] bg-lightGray" />
      </div>
    </div>
  );
};

export default PeopleSkeletonCard;
