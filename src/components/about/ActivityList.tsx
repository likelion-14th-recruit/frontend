import { useState } from "react";
import ActivityItem from "./ActivityItem";

interface Activity {
  id: number;
  title: string;
  term: string;
  description: string;
  imageURL: string;
}

const activitiesData: Activity[] = [
  {
    id: 1,
    title: "Lion Sprint",
    term: "1학기",
    description:
      "백엔드, 프론트엔드, 기획&디자인 각 파트별로 진행되는 집중 교육 세션입니다. 기초부터 심화까지 단계적으로 학습한 후, 실습을 통해 직접 적용해보는 방식으로 진행됩니다.",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Activites/1.png",
  },
  {
    id: 2,
    title: "아이디어톤",
    term: "1학기",
    description:
      "각 파트가 한 팀이 되어 하나의 서비스 아이디어를 기획하고, 실제 서비스처럼 디자인까지 완성하는 방식으로 진행됩니다.",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Activites/2.png",
  },
  {
    id: 3,
    title: "복커톤",
    term: "1학기",
    description:
      "Lion Sprint에서 배운 내용을 바탕으로, 팀 단위로 주제에 맞는 작은 서비스를 기획부터 개발까지 직접 완성해보는 프로그램입니다.",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Activites/3.png",
  },
  {
    id: 4,
    title: "중앙 해커톤",
    term: "여름방학",
    description:
      "방학 기간 동안 Lion Sprint와 스터디로 쌓은 역량을 바탕으로, 멋쟁이사자처럼 전국 대학교가 참여해 학교별 팀으로 프로젝트를 기획·구현합니다.",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Activites/4.png",
  },
  {
    id: 5,
    title: "신촌톤",
    term: "2학기",
    description:
      "서강대, 연세대, 이화여대, 홍익대가 함께 하룻동안 서비스를 기획하고 개발까지 완성하여 시연까지 해보는 시간을 가집니다.",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Activites/5.png",
  },
  {
    id: 6,
    title: "데모데이",
    term: "2학기",
    description:
      "지금까지 학습한 내용을 바탕으로 1학기 동안 기획, 디자인, 개발 전 과정을 완성도 높게 구현하고, 그 결과물을 신촌 일대 대학 간 창업 경진대회에서 시연합니다.",
    imageURL:
      "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/About/Activites/6.png",
  },
];
const ActivityList = () => {
  // 마우스 호버 상태 추가
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <div
      className="inline-grid 
    w-[320px] mobile-lg:w-[656px] tablet-lg:w-[792px] desktop:w-[1200px] gap-[16px] tablet-lg:gap-[24px] 
    grid-cols-1 mobile-lg:grid-cols-2 desktop:grid-cols-3 items-start mx-auto"
    >
      {activitiesData.map((data) => (
        <ActivityItem
          key={data.id}
          data={data}
          // 내가 호버되었는가?
          isHovered={hoveredId === data.id}
          // 현재 아무것도 호버되지 않았는가? (모두 100% 유지를 위해)
          isNothingHovered={hoveredId === null}
          // 이벤트 핸들러
          onMouseEnter={() => setHoveredId(data.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => setHoveredId(data.id)}
        />
      ))}
    </div>
  );
};

export default ActivityList;
