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
        gap-[32px]'>
      <h2
        className={`
          text-[32px]
          font-semibold
          tracking-[-0.64px]
          text-black/80
          ${isFAQ ? "font-sogang font-normal" : "font-pretendard"}
        `}
      >
        {title}
      </h2>
      {children}
    </section>
  );
};


export default Section


