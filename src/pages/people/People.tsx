import { useEffect, useState } from "react";
import PageTitle from "../../components/people/PeoplePageTitle";
import PeopleGrid from "../../components/people/PeopleGrid";
import { type PeopleType } from "../../types/people";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type TabValue = "all" | "backend" | "frontend" | "product_design";

const TAB_TO_PART_MAP: Record<Exclude<TabValue, "all">, PeopleType["part"]> = {
  backend: "BACKEND",
  frontend: "FRONTEND",
  product_design: "PRODUCT_DESIGN",
};

const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

// ✅ RecruitHome에서 사용한 흐름과 동일한 모션
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

const People = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [people, setPeople] = useState<PeopleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);

        const cacheKey = `PPL_${activeTab}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setPeople(data);
            return;
          }
          localStorage.removeItem(cacheKey);
        }

        const query =
          activeTab === "all" ? "" : `?part=${TAB_TO_PART_MAP[activeTab]}`;

        const res = await fetch(`/api/members${query}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const result = await res.json();
        const data: PeopleType[] = result?.data ?? result ?? [];

        setPeople(data);

        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data, timestamp: Date.now() })
        );
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, [activeTab]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      
      <motion.div variants={itemVariants}>
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
          onTabChange={(value) => setActiveTab(value as TabValue)}
        />
      </motion.div>

    
      <motion.div variants={itemVariants}>
        <PeopleGrid people={people} isLoading={isLoading} />
      </motion.div>
    </motion.div>
  );
};

export default People;