import { useState } from 'react'
import PageTitle from '../../components/people+project/PageTitle';

const Project = () => {
 const [activeTab, setActiveTab] = useState("all");

  return (
    <PageTitle
      title="Project"
      description="멋쟁이사자처럼 서강대가 만들어온 역대 프로젝트를 소개합니다."
      tabs={[
        { label: "전체", value: "all" },
        { label: "13기", value: "13th" },
        { label: "12기", value: "12th" },
        { label: "11기", value: "11th" },
        { label: "10기", value: "10th" },
        { label: "9기", value: "9th" },
        { label: "8기", value: "8th" },
        { label: "7기", value: "7th" },
        { label: "6기", value: "6th" },
        { label: "5기", value: "5th" },
        { label: "4기", value: "4th" },
        { label: "3기", value: "3th" }
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}

export default Project