import { useState } from "react";
import PageTitle from "../../components/people+project/PageTitle";
import PeopleGrid from "../../components/people+project/PeopleGrid";
import { type PeopleType } from "../../types/people";

type TabValue = "all" | "backend" | "frontend" | "product_design";

const People = () => {

  const [activeTab, setActiveTab] = useState<TabValue>("all");
  
  //mock-up data
  const peopleData: PeopleType[] = [
  {
    cohort: 14,
    imageUrl: "http://dummy1",
    name: "김지오",
    part: "BACKEND",
    position: "PRESIDENT",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy2",
    name: "이예나",
    part: "FRONTEND",
    position: "VICE_PRESIDENT",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy3",
    name: "전해찬",
    part: "BACKEND",
    position: "VICE_PRESIDENT",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy7",
    name: "문금미",
    part: "FRONTEND",
    position: "PART_LEADER",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy4",
    name: "송명은",
    part: "PRODUCT_DESIGN",
    position: "PART_LEADER",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy10",
    name: "최성민",
    part: "BACKEND",
    position: "PART_LEADER",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy5",
    name: "오서현",
    part: "PRODUCT_DESIGN",
    position: "MEMBER",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy11",
    name: "유지오",
    part: "BACKEND",
    position: "MEMBER",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy12",
    name: "전수아",
    part: "BACKEND",
    position: "MEMBER",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy8",
    name: "주현수",
    part: "FRONTEND",
    position: "MEMBER",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy6",
    name: "천사은",
    part: "PRODUCT_DESIGN",
    position: "MEMBER",
  },
  {
    cohort: 14,
    imageUrl: "http://dummy9",
    name: "한서정",
    part: "FRONTEND",
    position: "MEMBER",
  },
];

  //필터
  const filteredPeople =
    activeTab === "all"
      ? peopleData
      : peopleData.filter(
          (person) =>
            person.part === activeTab.toUpperCase()
        );


  return (
    <>
    <PageTitle
      title="People"
      description="멋쟁이사자처럼 서강대의 14기 운영진을 소개합니다."
      tabs={[
      { label: "전체", value: "all" },
      { label: "BE", value: "backend" },
      { label: "FE", value: "frontend" },
      { label: "DE", value: "product_design" },
    ]}

      activeTab={activeTab}
      onTabChange={(value) => {
    setActiveTab(value as TabValue);
  }}
    />

    <PeopleGrid people={filteredPeople} />
    </>
  );
};


export default People;
