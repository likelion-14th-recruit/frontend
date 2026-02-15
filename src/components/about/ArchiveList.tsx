import ArchiveItem from "./ArchiveItem";
import { motion } from "framer-motion";

interface Archive {
  imageURL: string;
  instaURL: string;
}

const activitiesData: Archive[] = [
  {
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/1.png",
    instaURL:
      "https://www.instagram.com/p/DIakZdXzJ1f/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/2.png",
    instaURL:
      "https://www.instagram.com/p/DIak26ITjkV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/3.png",
    instaURL:
      "https://www.instagram.com/p/DMhWkqQS60D/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/4.png",
    instaURL:
      "https://www.instagram.com/p/DMmadOcyx7K/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/5.png",
    instaURL:
      "https://www.instagram.com/p/DMsBFWfSrjj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/6.png",
    instaURL:
      "https://www.instagram.com/p/DPu-s8yErcN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/7.png",
    instaURL:
      "https://www.instagram.com/p/DPxr9IQkQ3B/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/8.png",
    instaURL:
      "https://www.instagram.com/p/DPz_5MjEi89/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/9.png",
    instaURL:
      "https://www.instagram.com/p/DSzf39tEmuc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

const ArchiveList = () => {
  const duplicatedactivities = [
    ...activitiesData,
    ...activitiesData,
    ...activitiesData,
    ...activitiesData,
  ];

  return (
    <motion.div
      className="flex gap-[24px] w-max"
      animate={{
        x: ["-25%", 0],
      }}
      transition={{
        duration: 45, // 속도 조절
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {duplicatedactivities.map((data, index) => (
        <div key={index} className="flex-shrink-0">
          <ArchiveItem imageURL={data.imageURL} instaURL={data.instaURL} />
        </div>
      ))}
    </motion.div>
  );
};

export default ArchiveList;
