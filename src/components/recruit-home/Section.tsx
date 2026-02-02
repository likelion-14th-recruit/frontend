import React from 'react'

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
};


export default Section