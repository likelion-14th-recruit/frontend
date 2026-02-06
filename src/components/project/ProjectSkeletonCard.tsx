const ProjectSkeletonCard = () => {
  return (
    <div className="flex flex-col items-center gap-[12px] animate-pulse">
      {/* 이미지 영역 */}
      <div className="w-[360px] h-[200px] rounded-[12px] bg-lightGray" />

      {/* 텍스트 영역 */}
      <div className="flex flex-col items-start gap-[8px] px-[4px] pb-[4px]">
        <div className="w-[129px] h-[26px] rounded-[4px] bg-lightGray" />
        <div className="w-[352px] h-[26px] rounded-[4px] bg-lightGray" />
      </div>
    </div>
  );
};

export default ProjectSkeletonCard;
