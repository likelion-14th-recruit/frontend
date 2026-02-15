interface ProjectProps {
  imageUrl: string;
  name: string;
  description: string;
  linkUrl?: string;
}

const ProjectCard = ({ imageUrl, name, description, linkUrl }: ProjectProps) => {
  // 클릭 핸들러: 주소가 있을 때만 새 탭을 엽니다.
  const handleClick = () => {
    if (linkUrl) {
      window.open(linkUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group inline-flex flex-col justify-start items-start gap-3 w-[360px] cursor-pointer"
    >
      {/* ✅ hover 시 이미지가 카드 안에서만 커지도록 래퍼를 만들고 overflow-hidden 처리 */}
      <div className="w-[360px] h-[200px] aspect-[9/5] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="
            w-full h-full object-cover
            transform-gpu
            transition-transform duration-500 ease-in-out
            group-hover:scale-110
          "
        />
      </div>

      <div className="self-stretch px-1 pb-1 inline-flex flex-col justify-end items-start gap-[12px]">
        <div className="flex justify-center items-center gap-[8px] text-black/100 font-pretendard text-[20px] font-semibold leading-[140%]">
          {name}
        </div>
        <div className="text-black/80 font-pretendard text-[16px] font-normal leading-[160%] self-stretch">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;