import { useEffect, useState } from 'react'
import ProjectGrid from '../../components/project/ProjectGrid';
import { useNavigate } from 'react-router-dom';
import ProjectPageTitle from '../../components/project/ProjectPageTitle';


interface Post {
  imageUrl: string;
  name: string;
  description: string;
  instagramUrl: string;
}

  const CACHE_EXPIRY = 24 * 60 * 60 * 1000;



//mockup data
// const projectsData = [
//   {
//     imageUrl: "https://www.instagram.com/",
//     name: "RunCord | 13기",
//     description:
//       "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
//     instagramUrl: "https://www.instagram.com/",
//   },
//   {
//     imageUrl: "https://www.instagram.com/",
//     name: "RunCord | 13기",
//     description:
//       "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
//     instagramUrl: "https://www.instagram.com/",
//   },
//   {
//     imageUrl: "https://www.instagram.com/",
//     name: "RunCord | 13기",
//     description:
//       "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
//     instagramUrl: "https://www.instagram.com/",
//   },
//   {
//     imageUrl: "https://www.instagram.com/",
//     name: "RunCord | 13기",
//     description:
//       "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
//     instagramUrl: "https://www.instagram.com/",
//   },
//   {
//     imageUrl: "https://www.instagram.com/",
//     name: "RunCord | 13기",
//     description:
//       "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
//     instagramUrl: "https://www.instagram.com/",
//   },
//   {
//     imageUrl: "https://www.instagram.com/",
//     name: "RunCord | 13기",
//     description:
//       "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
//     instagramUrl: "https://www.instagram.com/",
//   },
// ];


const Project = () => {
 const [activeTab, setActiveTab] = useState("all");

  // const [projects, setProjects] = useState<Post[]>(projectsData);

 //api
  const [projects, setProjects] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true); //api시 true로 변경! 

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      setIsLoading(true);

      // 기수별로 캐시 키 다르게
      const cacheKey = `PJT_${activeTab}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setProjects(data);
          setIsLoading(false);
          return;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }

      const cohortQuery =
      activeTab === "all" ? "" : `&cohort=${activeTab}`;

      let page = 0;
      let hasNext = true;
      const all: Post[] = [];

      while (hasNext) {
        const res = await fetch(
          `/api/projects?page=${page}&size=15${cohortQuery}`
        );
      const result = await res.json();

      const content: Post[] = result?.data?.content ?? [];
        hasNext = result?.data?.hasNext ?? false;

        all.push(...content);
        page += 1;
      }

      setProjects(all);

      // 캐시 저장
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: all, timestamp: Date.now() })
      );

    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  fetchProjects();
}, [activeTab]);

  //   useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1500);
  // }, []);

  console.log(projects)
  
  return (
    <>
    <ProjectPageTitle
      title="Project"
      description="멋쟁이사자처럼 서강대가 만들어온 역대 프로젝트를 소개합니다."
      tabs={[
        { label: "전체", value: "all" },
        { label: "13기", value: "13" },
        { label: "12기", value: "12" },
        { label: "11기", value: "11" },
        { label: "10기", value: "10" },
        { label: "9기", value: "9" },
        { label: "8기", value: "8" },
        { label: "7기", value: "7" },
        { label: "6기", value: "6" },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />

        
    <ProjectGrid projects={projects} isLoading={isLoading}/>
        
      
    </>
  );
}

export default Project