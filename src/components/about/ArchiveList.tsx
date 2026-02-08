import React from "react";
import ArchiveItem from "./ArchiveItem";
import { motion } from "framer-motion";

interface Archive {
  id: number;
  title: string;
  term: string;
  imageURL: string;
  instaURL: string;
}

const activitiesData: Archive[] = [
  {
    id: 1,
    title: "Orientation",
    term: "1학기",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/1.png",
    instaURL:
      "https://www.instagram.com/p/DIakZdXzJ1f/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 2,
    title: "MT",
    term: "1학기",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/2.png",
    instaURL:
      "https://www.instagram.com/p/DIak26ITjkV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 3,
    title: "POV & 아이디어톤",
    term: "1학기",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/3.png",
    instaURL:
      "https://www.instagram.com/p/DMhWkqQS60D/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 4,
    title: "Lion Sprint",
    term: "1학기",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/4.png",
    instaURL:
      "https://www.instagram.com/p/DMmadOcyx7K/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 5,
    title: "복커톤",
    term: "1학기",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/5.png",
    instaURL:
      "https://www.instagram.com/p/DMsBFWfSrjj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 6,
    title: "중앙 해커톤",
    term: "여름방학",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/6.png",
    instaURL:
      "https://www.instagram.com/p/DPu-s8yErcN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 7,
    title: "스터디",
    term: "여름방학",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/7.png",
    instaURL:
      "https://www.instagram.com/p/DPxr9IQkQ3B/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 8,
    title: "신촌톤",
    term: "2학기",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Archive/8.png",
    instaURL:
      "https://www.instagram.com/p/DPz_5MjEi89/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 9,
    title: "데모데이",
    term: "2학기",
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
        x: [0, "-25%"], // 전체 너비의 절반만큼 이동 (데이터가 반복되므로)
      }}
      transition={{
        duration: 45, // 속도 조절
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {duplicatedactivities.map((data, index) => (
        <div key={index} className="flex-shrink-0">
          <ArchiveItem
            id={data.id}
            title={data.title}
            term={data.term}
            imageURL={data.imageURL}
            instaURL={data.instaURL}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default ArchiveList;
