type ValueProps = {
  id: string;
  content_sm: string;
  content_md: string;
  comment: string;
};
const ValueItem = ({ id, content_sm, content_md, comment }: ValueProps) => {
  return (
    <div
      className="flex flex-col items-center gap-[12px] 
    w-[159px] h-[166px] md:w-[288px] lg:w-[360px] md:h-[200px] shrink-0 py-[24px] md:py-[36px] bg-white "
    >
      <div className="text-center justify-start text-sogang/100 text-[16px] md:text-[20px] font-normal font-sogang leading-[140%]">
        {id}
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-[4px] font-pretendard text-[14px] md:text-[16px] leading-[140%] md:leading-[160%] ">
        <div className="block md:hidden w-[80%] text-black/80 text-center font-normal md:whitespace-pre-wrap">
          {content_sm}
        </div>
        <div className="hidden md:block w-[80%] text-black/80 text-center font-normal md:whitespace-pre-wrap">
          {content_md}
        </div>
        {comment && (
          <div className="text-black/60 text-center font-normal">{comment}</div>
        )}
      </div>
    </div>
  );
};
export default ValueItem;
