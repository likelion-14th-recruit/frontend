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
          font-semibold
          leading-[140%]
          text-black
          text-center

          text-[16px]
          tablet-lg:text-[20px]
        "
      >
        {label}
      </span>

      <span
        className="
          font-pretendard
          font-regular
          text-black/80
          leading-[160%]
          text-center

          text-[14px]
          tablet-lg:text-[16px]
        "
      >
        {date}
      </span>
    </div>
  );
};

export default ScheduleItem;
