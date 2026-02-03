import React from "react";

type ScheduleItemProps = {
  label: string;
  date: string;
};

const ScheduleItem = ({ label, date }: ScheduleItemProps) => {
  return (
    <div
      className="
        flex flex-col gap-[8px]
        px-[24px] py-[20px]
        bg-white
        
        flex-1
      "
    >
      <span
        className="
          font-pretendard
          text-[20px]
          font-semibold
          leading-[140%]
          text-black
          text-center
        "
      >
        {label}
      </span>

      <span
        className="
          font-pretendard
          text-[16px]
          font-regular
          text-black
          leading-[160%]
          text-center
        "
      >
        {date}
      </span>
    </div>
  );
};

export default ScheduleItem;
