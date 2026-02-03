interface ProjectProps {
  imageUrl: string;
  name: string;
  description: string;
  linkUrl?: string;
}

const ProjectItem = ({
  imageUrl,
  name,
  description,
  linkUrl,
}: ProjectProps) => {
  // 클릭 핸들러: 주소가 있을 때만 새 탭을 엽니다.
  const handleClick = () => {
    if (linkUrl) {
      window.open(linkUrl, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div
      onClick={handleClick}
      className="inline-flex flex-col justify-start items-start gap-3 w-[360px]"
    >
      <img
        src={imageUrl}
        className="flex flex-col items-start w-[360px] h-[200px] p-[10px] gap-[10px] aspect-[9/5] bg-zinc-100 rounded-xl"
      />
      <div className="self-stretch px-1 pb-1 rounded-2xl inline-flex flex-col justify-end items-start gap-[12px]">
        <div className="flex justify-center items-center gap-[8px] text-black/100 font-pretendard text-[20px] font-semibold leading-[140%] ">
          {name}
        </div>
        <div className="text-black/80 font-pretendard text-[16px] font-normal leading-[160%] self-stretch">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
