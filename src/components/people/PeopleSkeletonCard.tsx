const PeopleSkeletonCard = () => {
  return (
    <div className="flex flex-col items-center gap-[10px] animate-pulse">
      {/* 이미지 영역 */}
      <div className="w-[240px] h-[240px] rounded-[12px] bg-lightGray" />

      {/* 텍스트 영역 */}
      <div className="flex flex-col items-center gap-[8px] mt-[12px] mb-[20px]">
        <div className="w-[57px] h-[28px] rounded-[4px] bg-lightGray" />
        <div className="w-[164px] h-[26px] rounded-[4px] bg-lightGray" />
      </div>
    </div>
  );
};

export default PeopleSkeletonCard;
