interface RecruitActionCardProps {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
}

const RecruitActionCard = ({
  image,
  title,
  description,
  onClick,
}: RecruitActionCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center items-center cursor-pointer transition-all hover:brightness-95
                 bg-[#F0F0F0]
                 
                 /* 스마트폰 */
                 w-[280px] p-[32px_40px] rounded-[16px] gap-[16px]
                 
                 /* 태블릿 (md) */
                 md:w-[280px] md:h-[320px] md:p-[40px] md:rounded-[16px] md:gap-[16px]
                 
                 /* 노트북 (xl: 1440px) */
                 xl:w-[360px] xl:h-[400px] xl:p-[40px] xl:rounded-[20px] xl:gap-[16px]"
    >
      {/* 1. 로고 이미지 섹션 (가이드: xl일 때 96x96) */}
      <div
        className="flex-shrink-0 flex items-center justify-center
                      w-[64px] h-[64px] xl:w-[96px] xl:h-[96px]"
      >
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* 2. 텍스트 섹션 (서정 님 가이드: gap 4px 반영) */}
      <div className="flex flex-col items-center gap-[4px]">
        {/* 제목 */}
        <h3
          className="text-[#333] font-bold text-center whitespace-nowrap
                       text-[18px] md:text-[20px] xl:text-[24px]"
        >
          {title}
        </h3>

        {/* 설명 */}
        <p
          className="text-[#666] text-center break-keep
                      text-[14px] md:text-[15px] xl:text-[16px]"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default RecruitActionCard;
