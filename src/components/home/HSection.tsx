import React from "react";

const HSection = ({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) => {
  return (
    <section
      data-header="light"
      className={
        color == "light"
          ? "flex p-[28px_20px] md:p-[60px] lg:p-[100px] flex-col justify-center items-start gap-10 self-strech"
          : "flex p-[28px_20px] md:p-[60px] lg:p-[100px] flex-col justify-center items-end gap-10 self-stretch bg-[lightGray]"
      }
    >
      {children}
    </section>
  );
};

export default HSection;
