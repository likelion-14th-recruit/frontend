interface ActivityItemProps {
  data: {
    title: string;
    term: string;
    description: string;
    imageURL: string;
  };
}
const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <div className="group relative flex flex-col items-start gap-[16px] h-[240px] self-stretch overflow-hidden  justify-end cursor-pointer transition-all ">
      <div
        className="flex  p-[24px_32px] flex-col items-start gap-[16px] self-stretch h-full transition-opacity duration-300 opacity-80 group-hover:opacity-100"
        style={{
          background: `linear-gradient(0deg, rgba(18, 18, 18, 0.64) 0%, rgba(18, 18, 18, 0.64) 100%), url(${data.imageURL}) lightgray 50% / cover no-repeat`,
        }}
      >
        <div className="flex justify-between items-center self-stretch">
          <div className="font-pretendard text-[28px] font-normal leading-[120%] tracking-[-0.02em] text-white">
            {data.title}
          </div>
          <div className="flex p-[4px_12px] justify-center items-center gap-[10px] rounded-[8px] border border-white/80 text-white/80 text-[14px]">
            {data.term}
          </div>
        </div>
        <div className="self-stretch  text-white/100 font-pretendard text-[16px] leading-[160%] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[200px]">
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
