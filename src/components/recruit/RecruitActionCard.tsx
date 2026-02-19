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
                 
                 /* 노트북 (lg: 1440px) */
                 lg:w-[360px] lg:h-[400px] lg:p-[40px] lg:rounded-[20px] lg:gap-[16px]"
    >
      {/* 1. 로고 이미지 섹션 (가이드: lg 때 96x96) */}
      <div
        className="flex-shrink-0 flex items-center justify-center
                      w-[60px] h-[60px] lg:w-[96px] lg:h-[96px] md:w-[60px] md:h-[60px]"
      >
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* 2. 텍스트 섹션 (서정 님 가이드: gap 4px 반영) */}
      <div className="flex flex-col items-center gap-[4px]">
        {/* 제목 */}
        <h3
          className="text-[rgba(18,18,18,0.8)] font-semibold text-center whitespace-nowrap
                       text-[20px] md:text-[28px] lg:text-[32px]"
        >
          {title}
        </h3>

        {/* 설명 */}
        <p
          className="text-[#121212] text-center break-keep
                      text-[14px] md:text-[15px] lg:text-[20px]"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default RecruitActionCard;
