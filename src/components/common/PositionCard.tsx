type Position = {
  title: string;
  description: string;
  imageUrl: string; // https 이미지
  link?: string; // 바로보기 링크
};

const PositionCard = ({ title, description, imageUrl, link }: Position) => {
  return (
    <article className="flex flex-col gap-[12px]">
      {/* 카드 영역 */}
      <div
        className="
          relative
          h-[160px]
          bg-white
          p-[32px]
          overflow-hidden
        "
      >
        {/* 왼쪽 콘텐츠 */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          <h3
            className="font-sogang text-[28px] font-normal leading-[120%] text-black
          desktop:text-[32px]"
          >
            {title}
          </h3>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-[36px]
                h-[36px]
                flex-shrink-0
                rounded-full
                flex
                items-center
                justify-center
                "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path
                  d="M18 0C27.9411 0 36 8.05887 36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0ZM14.04 12.1494C13.6721 12.1495 13.3413 12.2788 13.0801 12.5391L13.0791 12.54C12.8188 12.8013 12.6895 13.1321 12.6895 13.5C12.6895 13.8677 12.8191 14.1978 13.0791 14.459L13.0801 14.46C13.3413 14.7203 13.6721 14.8495 14.04 14.8496H19.791L12.5518 22.0684V22.0693C12.2903 22.3308 12.1495 22.658 12.1494 23.0283C12.1495 23.3987 12.2903 23.7266 12.5518 23.9883C12.8132 24.2495 13.1406 24.3895 13.5107 24.3896C13.8813 24.3896 14.209 24.25 14.4707 23.9883V23.9873L21.6895 16.748V22.5C21.6895 22.8675 21.8198 23.1966 22.0801 23.457V23.458C22.3408 23.7196 22.6716 23.8495 23.04 23.8496C23.4084 23.8495 23.7383 23.7196 23.999 23.458L23.998 23.457C24.259 23.1965 24.3896 22.8679 24.3896 22.5V13.5C24.3896 13.1318 24.2599 12.8011 23.999 12.54C23.7383 12.2795 23.4078 12.1495 23.04 12.1494H14.04Z"
                  fill="rgba(182, 0, 5, 0.52)"
                />
              </svg>
            </a>
          )}
        </div>

        {/* 🔥 우측 이미지 영역 (핵심) */}
        <div
          className="
            absolute
            right-[32px]
            top-1/2
            -translate-y-1/2
            pointer-events-none
          "
        >
          <img
            src={imageUrl}
            alt={title}
            className="h-[160px]      /* 카드 높이 안에서만 제한 */
      w-auto
      object-contain"
          />
        </div>
      </div>

      {/* 설명 */}
      <p
        className="
          px-[8px]
          py-[12x]
          font-pretendard
          text-[16px]
          font-semibold
          leading-[160%]
          text-black/80
        "
      >
        {description}
      </p>
    </article>
  );
};

export default PositionCard;
