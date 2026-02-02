import React from 'react'

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <section className='
        flex
        flex-col
        gap-[32px]'>
      <h2 
        className='
        text-[32px]
        font-semibold
        tracking-[-0.64px]
        text-[rgba(18,18,18,0.8)]'
      >{title}</h2>
      {children}
    </section>
  );
};


export default Section


