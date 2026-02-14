import { useEffect, useState } from 'react'
import PageTitle from '../../components/people/PageTitle';
import ProjectGrid from '../../components/project/ProjectGrid';
import { useNavigate } from 'react-router-dom';


interface Post {
  imageUrl: string;
  name: string;
  description: string;
  instagramUrl: string;
}

const CACHE_KEY = "PJT";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

const getCachedProjects = (): Post[] | null => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_EXPIRY) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
  return data;
};

//mockup data
const projectsData = [
  {
    imageUrl: "https://www.instagram.com/",
    name: "RunCord | 13기",
    description:
      "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
    instagramUrl: "https://www.instagram.com/",
  },
  {
    imageUrl: "https://www.instagram.com/",
    name: "RunCord | 13기",
    description:
      "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
    instagramUrl: "https://www.instagram.com/",
  },
  {
    imageUrl: "https://www.instagram.com/",
    name: "RunCord | 13기",
    description:
      "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
    instagramUrl: "https://www.instagram.com/",
  },
  {
    imageUrl: "https://www.instagram.com/",
    name: "RunCord | 13기",
    description:
      "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
    instagramUrl: "https://www.instagram.com/",
  },
  {
    imageUrl: "https://www.instagram.com/",
    name: "RunCord | 13기",
    description:
      "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
    instagramUrl: "https://www.instagram.com/",
  },
  {
    imageUrl: "https://www.instagram.com/",
    name: "RunCord | 13기",
    description:
      "기존 러닝 기록에 아카이빙을 더해 러닝의 의미와 재미를 확장하는 서비스",
    instagramUrl: "https://www.instagram.com/",
  },
];

const Project = () => {
 const [activeTab, setActiveTab] = useState("all");

  // const [projects, setProjects] = useState<Post[]>(projectsData);
  const nav = useNavigate();

 //api
  const [projects, setProjects] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true); //api시 true로 변경! 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const cached = getCachedProjects();
        if (cached) {
          setProjects(cached);
          setIsLoading(false);
          return;
        }

        const res = await fetch("/api/projects");
        const result = await res.json();
        const data = Array.isArray(result) ? result : result.data;

        if (Array.isArray(data)) {
          setProjects(data);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data, timestamp: Date.now() })
          );
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

    useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <>
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

        
    <ProjectGrid projects={projects} isLoading={isLoading}/>
        
      
    </>
  );
}

export default Project