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

const PeoplePageTitle = ({
  title,
  description,
  tabs,
  activeTab,
  onTabChange,
}: PageTitleProps) => {
  return (
    <div className="flex flex-col items-center
      px-[20px]  
      mt-[100px]

      r-769-819:mt-[120px]
      r-820-1099:mt-[120px]
      r-1100-up:mt-[120px]
      ">
      {/* 타이틀 */}
      <h1 className="
        text-[28px]
        
        mb-[12px]
        r-769-819:mb-[16px]
        r-820-1099:mb-[16px]
        r-1100-up:mb-[16px]

        r-769-819:text-[32px]
        r-820-1099:text-[32px] 
        r-1100-up:text-[32px] 
        text-black font-sogang font-regular leading-[120%] tracking-[-0.64px]">
        {title}
      </h1>

      {/* 설명 */}
      {description && (
        <p className="
          text-[16px]
          r-769-819:text-[20px] 
          r-820-1099:text-[20px] 
          r-1100-up:text-[20px] 
          text-black/80 font-pretendard font-regular leading-[140%] text-center">
          {description}
        </p>
      )}

      {/* 탭 버튼 */}
      {tabs && tabs.length > 0 && (
        <div className="flex gap-[12px] 
          py-[20px]
          
          r-769-819:py-[40px]
          r-820-1099:py-[40px]
          r-1100-up:py-[40px]
          ">
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
                  font-regular
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
      )}
    </div>
  );
};

export default PeoplePageTitle;
