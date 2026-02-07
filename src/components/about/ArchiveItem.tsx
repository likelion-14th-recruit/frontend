interface ArchiveProps {
  id: number;
  title: string;
  term: string;
  imageURL: string;
  instaURL: string;
}
const ArchiveItem = ({ id, title, term, imageURL, instaURL }: ArchiveProps) => {
  const handleClick = () => {
    if (instaURL) {
      window.open(instaURL, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex w-[320px] h-[320px] p-[32px] flex-col justify-center items-center gap-[4px] cursor-pointer flex-shrink-0 "
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("${imageURL}") center/cover no-repeat`,
      }}
    ></div>
  );
};

export default ArchiveItem;
