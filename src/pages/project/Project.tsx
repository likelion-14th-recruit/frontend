import { useEffect, useState } from "react";
import ProjectGrid from "../../components/project/ProjectGrid";
import ProjectPageTitle from "../../components/project/ProjectPageTitle";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface Post {
  imageUrl: string;
  name: string;
  description: string;
  instagramUrl: string;
}

const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

// ✅ 이전 페이지들과 동일한 모션 프리셋
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Project = () => {
  const [activeTab, setActiveTab] = useState("all");

  const [projects, setProjects] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);

        const cacheKey = `PJT_${activeTab}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setProjects(data);
            return;
          }
          localStorage.removeItem(cacheKey);
        }

        const cohortQuery = activeTab === "all" ? "" : `&cohort=${activeTab}`;

        let page = 0;
        let hasNext = true;
        const all: Post[] = [];

        while (hasNext) {
          const res = await fetch(
            `/api/projects?page=${page}&size=15${cohortQuery}`
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const result = await res.json();

          const content: Post[] = result?.data?.content ?? [];
          hasNext = result?.data?.hasNext ?? false;

          all.push(...content);
          page += 1;
        }

        setProjects(all);
        

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

  console.log(projects);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      
      <motion.div variants={itemVariants}>
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
      </motion.div>

      
      <motion.div
        variants={itemVariants}
         //key={activeTab}// ✅ 탭 바뀔 때도 그리드가 살짝 다시 등장 (원치 않으면 삭제)
      >
        <ProjectGrid projects={projects} isLoading={isLoading} />
      </motion.div>
    </motion.div>
  );
};

export default Project;