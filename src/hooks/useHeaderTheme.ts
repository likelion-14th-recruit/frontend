import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type HeaderTheme = "dark" | "light";

export function useHeaderTheme(headerPx = 80) {
  const [theme, setTheme] = useState<HeaderTheme>("light");
  const { pathname } = useLocation();

  useEffect(() => {
    const marker = document.createElement("div");
    marker.style.position = "fixed";
    marker.style.top = `${headerPx}px`; // 헤더 높이만큼 아래
    marker.style.left = "0";
    marker.style.width = "1px";
    marker.style.height = "1px";
    marker.style.pointerEvents = "none";
    marker.style.zIndex = "999999";
    document.body.appendChild(marker);

    const pickTheme = () => {
      // marker 좌표가 속한 요소를 찾고, 그 요소의 조상 중 data-header 가진 섹션을 찾음
      const rect = marker.getBoundingClientRect();
      const el = document.elementFromPoint(rect.left + 1, rect.top + 1);
      const section = el?.closest<HTMLElement>("[data-header]") || null;

      const next = (section?.dataset?.header as HeaderTheme) || "light";
      setTheme(next);
    };

    const update = () => pickTheme();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // 처음 + route 바뀔 때도 실행
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      marker.remove();
    };
  }, [headerPx, pathname]); // ⭐ pathname 의존성 추가

  return theme;
}
