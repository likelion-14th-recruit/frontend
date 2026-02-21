interface ProjectProps {
  imageUrl: string;
  name: string;
  description: string;
  linkUrl?: string;
  cohort?: number;
}

const ProjectItem = ({
  imageUrl,
  name,
  description,
  linkUrl,
  cohort,
}: ProjectProps) => {
  // 클릭 핸들러: 주소가 있을 때만 새 탭을 엽니다.
  const handleClick = () => {
    if (linkUrl) {
      window.open(linkUrl, "_blank", "noopener,noreferrer");
    }
  };
  return (
    // <div
    //   onClick={handleClick}
    //   className="flex w-full flex-col items-start gap-[12px]"
    // >
    //   <img
    //     className="w-full aspect-[9/5] object-cover"
    //     src={imageUrl}
    //     alt={name}
    //   />
    //   <div className="self-stretch px-1 pb-1 inline-flex flex-col justify-end items-start gap-[12px]">
    //     <div className="flex justify-center items-center gap-[8px] text-black/100 text-[16px] md:text-[20px] font-semibold leading-[140%] ">
    //       <div>{name}</div>
    //       {cohort ? (
    //         <div className="text-black/60 text-[14px] md:text-[16px] font-normal">
    //           | {cohort}기
    //         </div>
    //       ) : (
    //         ""
    //       )}
    //     </div>
    //     <div className="text-black/80 text-[14px] md:text-[16px] font-normal leading-[140%] md:leading-[160%] self-stretch">
    //       {description}
    //     </div>
    //   </div>
    // </div>
    <div
      onClick={handleClick}
      className="group flex w-full flex-col items-start gap-[12px] cursor-pointer"
    >
      {/* ✅ hover 시 이미지가 카드 안에서만 커지도록 래퍼를 만들고 overflow-hidden 처리 */}
      <div className="w-full aspect-[9/5] overflow-hidden">
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
        <div className="flex justify-center items-center gap-[8px] text-black/100 text-[16px] md:text-[20px] font-semibold leading-[140%] ">
          <div>{name}</div>
          {cohort ? (
            <div className="text-black/60 text-[14px] md:text-[16px] font-normal">
              | {cohort}기
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="text-black/80 text-[14px] md:text-[16px] font-normal leading-[140%] md:leading-[160%] self-stretch">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
