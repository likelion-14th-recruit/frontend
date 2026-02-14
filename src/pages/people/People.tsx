import { useEffect, useState } from "react";
import PageTitle from "../../components/people/PeoplePageTitle";
import PeopleGrid from "../../components/people/PeopleGrid";
import { type PeopleType } from "../../types/people";

type TabValue = "all" | "backend" | "frontend" | "product_design";

const TAB_TO_PART_MAP: Record<Exclude<TabValue, "all">, PeopleType["part"]> = {
  backend: "BACKEND",
  frontend: "FRONTEND",
  product_design: "PRODUCT_DESIGN",
};

const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

const People = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [people, setPeople] = useState<PeopleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);

        // ✅ 탭별 캐시
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

        // ✅ part 쿼리 생성
        const query =
          activeTab === "all" ? "" : `?part=${TAB_TO_PART_MAP[activeTab]}`;

        const res = await fetch(`/api/members${query}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const result = await res.json();

        // 응답 구조에 맞게 (필요하면 data/content 조정)
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
        onTabChange={(value) => setActiveTab(value as TabValue)}
      />

      <PeopleGrid people={people} isLoading={isLoading} />
    </>
  );
};

export default People;