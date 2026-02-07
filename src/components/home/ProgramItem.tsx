interface ProgramProps {
  img: string;
  title: string;
  content: string;
  linkUrl?: string;
}

const ProgramItem = ({ img, title, content, linkUrl }: ProgramProps) => {
  // 클릭 핸들러: 주소가 있을 때만 새 탭을 엽니다.
  const handleClick = () => {
    if (linkUrl) {
      window.open(linkUrl, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex w-full flex-col items-start gap-[8px] md:gap-[12px]"
    >
      <img src={img} className="w-full aspect-[9/5] object-cover" alt={title} />

      <div className="flex flex-col items-start gap-[4px] self-stretch">
        <div className="self-stretch text-black font-semibold text-[16px] md:text-[20px] leading-[140%]">
          {title}
        </div>
        <div className="self-stretch text-black/80 font-normal text-[14px] md:text-[16px] leading-[160%]">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ProgramItem;

// <div
//   onClick={handleClick}
//   className="flex w-[360px] flex-col items-start gap-[8px] md:gap-[12px] w-full aspect-[9/5] "
// >
//   <img
//     src={img}
//     className="flex aspect-[9/5] h-[88.333px] md:h-[160px] lg:h-[200px] flex-col items-start gap-[10px] self-stretch "
//   />
//   <div className="flex flex-col items-start gap-[4px] self-stretch">
//     <div className="self-stretch text-black/100 font-pretendard text-[16px] md:text-[20px] font-semibold leading-[140%]">
//       {title}
//     </div>
//     <div className="self-stretch text-black/80 font-pretendard text-sm md:text-base font-normal leading-[160%]">
//       {content}
//     </div>
//   </div>
// </div>
