import React from 'react'

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
    const isFAQ = title === "FAQ";
    
  return (
    <section className='
        flex
        flex-col
        gap-[20px]

        tablet-lg:gap-[24px]
        
        desktop:gap-[32px]'>
      <h2
        className={`
          text-[20px]
          tracking-[-0.64px]
          tablet-lg:text-[28px]
          desktop:text-[32px]
          ${isFAQ 
            ? "font-sogang font-normal text-black/80"
            : "font-pretendard font-semibold text-black/80"}
        `}
      >
        {title}
      </h2>
      {children}
    </section>
  );
};


export default Section


