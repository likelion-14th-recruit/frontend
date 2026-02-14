type TabItem = {
  label: string;
  value: string;
};

type PageTitleProps = {
  title: string;
  description?: string;
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
};

const ProjectPageTitle = ({
  title,
  description,
  tabs,
  activeTab,
  onTabChange,
}: PageTitleProps) => {
  return (
    <div className="flex flex-col items-center gap-[16px] 
        px-[20px]
        mt-[100px]

        md:mt-[120px]
        ">
      {/* 타이틀 */}
      <h1 className="
        text-[28px]
        md:text-[32px] 
        text-black font-sogang font-regular leading-[120%] tracking-[-0.64px]">
        {title}
      </h1>

      {/* 설명 */}
      {description && (
        <p className="
          text-[16px]
          md:text-[20px] 
          text-black/80 font-pretendard font-regular leading-[140%] text-center">
          {description}
        </p>
      )}

      {/* 탭 버튼 */}
      {tabs && tabs.length > 0 && (
        <div className="w-full py-[20px] md:py-[40px]">

          <div
            className="
              flex gap-[12px]

              w-full
              overflow-x-auto
              whitespace-nowrap
              md:overflow-visible
              md:justify-center

              px-[20px]
            "
          >
            {tabs.map((tab) => {
              const isActive = tab.value === activeTab;

              return (
                <button
                  key={tab.value}
                  onClick={() => onTabChange?.(tab.value)}
                  className={`
                    flex-shrink-0
                    px-[12px] py-[4px]
                    rounded-[12px]
                    text-[16px]
                    font-pretendard
                    font-normal
                    leading-[160%]
                    border
                    transition
                    ${
                      isActive
                        ? "border-sogang text-sogang"
                        : "border-black/40 text-black/60"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPageTitle;
