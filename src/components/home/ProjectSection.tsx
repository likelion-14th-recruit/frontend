import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectItem from "../project/ProjectItem";
import { useState, useEffect } from "react";
import ProjectSkeletonCard from "../project/ProjectSkeletonCard";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
// Props 타입 정의
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

interface Post {
  imageUrl: string;
  name: string;
  description: string;
  instagramUrl: string;
  cohort: number;
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

const ProjectSection = () => {
  // 1. 초기값은 항상 빈 배열 [] 로 설정
  const [projects, setProjects] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가 const nav = useNavigate();
  const nav = useNavigate();
  const cohort: number = 13;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 1. 캐시 확인
        const cachedData = getCachedProjects();
        if (cachedData && Array.isArray(cachedData)) {
          setProjects(cachedData);
          setIsLoading(false); // 캐시가 있으면 즉시 로딩 종료
          return;
        }

        // 2. API 호출
        const response = await fetch(`/api/projects?cohort=${cohort}`);
        const result = await response.json();

        const finalData: Post[] = Array.isArray(result)
          ? result
          : result.data.content.slice(0, 6);

        if (Array.isArray(finalData)) {
          setProjects(finalData);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: finalData,
              timestamp: Date.now(),
            }),
          );
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        // 에러 발생 시 fallback 데이터를 보여주고 싶다면 여기서 setProjects(projectsData)
      } finally {
        setIsLoading(false); // 성공하든 실패하든 로딩 종료
      }
    };

    fetchProjects();
  }, []);

  // 로딩 중일 때 보여줄 UI
  if (isLoading) {
    return (
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-start gap-[24px] md:gap-[32px] lg:gap-[40px]"
      >
        <div className="text-black/80 font-sogang text-[40px] font-normal leading-[120%]">
          Projects
        </div>
        <div className="inline-grid grid-cols-2 gap-8 w-full">
          {/* 6개 정도의 스켈레톤을 보여줍니다 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectSkeletonCard key={i} />
          ))}
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col  min-w-[375] md:w-[596px] lg:w-[752px] items-start gap-[20px] md:gap-[32px] lg:gap-[40px]"
    >
      <motion.div
        variants={itemVariants}
        className="text-black/80 font-sogang text-[32px] md:text-[40px] font-normal leading-[120%]"
      >
        Projects
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="inline-grid grid-cols-2 gap-[16px] md:gap-[20px] lg:gap-[32px] self-stretch "
      >
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            imageUrl={project.imageUrl}
            name={project.name}
            description={project.description}
            linkUrl={project.instagramUrl}
            cohort={project.cohort}
          />
        ))}
      </motion.div>
      <motion.div
        variants={itemVariants}
        onClick={() => {
          nav("/project");
          window.scrollTo(0, 0);
        }}
        className="h-10 inline-flex justify-center items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
      >
        <div className="justify-start text-neutral-900 text-[14px] lg:text-[16px] font-semibold font-['Pretendard'] leading-6">
          더 알아보기
        </div>
        <ChevronRight size={18} />
      </motion.div>
    </motion.div>
  );
};

export default ProjectSection;
