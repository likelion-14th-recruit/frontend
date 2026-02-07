import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectItem from "./ProjectItem";
import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  imageUrl: string;
  name: string;
  description: string;
  instagramUrl: string;
}

const CACHE_KEY = "PJT";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 1일 (밀리초 단위)

// 로컬 스토리지에 저장된 데이터 가져오기 (만료 체크 포함)
const getCachedProjects = (): Post[] | null => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  const isExpired = Date.now() - timestamp > CACHE_EXPIRY;

  if (isExpired) {
    localStorage.removeItem(CACHE_KEY); // 만료되면 삭제
    return null;
  }
  return data;
};

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

const ProjectSection = () => {
  // 1. 초기값은 항상 빈 배열 [] 로 설정
  const [projects, setProjects] = useState<Post[]>(projectsData);
  const nav = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 캐시 확인
        const cachedData = getCachedProjects();
        if (cachedData && Array.isArray(cachedData)) {
          setProjects(cachedData);
          return;
        }

        // API 호출 (fetch 기준)
        const response = await fetch("/api/projects");
        const result = await response.json();

        // 서버 응답 구조에 따라 result.data 혹은 result를 체크
        const finalData = Array.isArray(result) ? result : result.data;

        if (Array.isArray(finalData)) {
          setProjects(finalData);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: finalData,
              timestamp: Date.now(),
            }),
          );
        } else {
          console.error("받아온 데이터가 배열 형식이 아닙니다:", finalData);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col items-start gap-[40px]">
      <div className="text-black/80 font-sogang text-[40px] font-normal leading-[120%]">
        Projects
      </div>
      <div className="inline-grid grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            imageUrl={project.imageUrl}
            name={project.name}
            description={project.description}
            linkUrl={project.instagramUrl}
          />
        ))}
      </div>
      <div
        onClick={() => {
          nav("/project");
          window.scrollTo(0, 0);
        }}
        className="h-10 inline-flex justify-center items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
      >
        <div className="justify-start text-neutral-900 text-[16px] font-semibold font-['Pretendard'] leading-6">
          더 알아보기
        </div>
        <ChevronRight size={18} />
      </div>
    </div>
  );
};

export default ProjectSection;
