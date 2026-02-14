interface ArchiveProps {
  imageURL: string;
  instaURL: string;
}
const ArchiveItem = ({ imageURL, instaURL }: ArchiveProps) => {
  const handleClick = () => {
    if (instaURL) {
      window.open(instaURL, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex w-[160px] h-[160px] tablet-lg:w-[320px] tablet-lg:h-[320px] p-[32px] flex-col justify-center items-center gap-[4px] cursor-pointer flex-shrink-0 "
      style={{
        background: `url("${imageURL}") center/cover no-repeat`,
      }}
    ></div>
  );
};

export default ArchiveItem;
