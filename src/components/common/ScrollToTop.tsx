// ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. 실제 스크롤이 발생하고 있는 <main> 요소를 찾습니다.
    const mainElement = document.querySelector("main");

    if (mainElement) {
      // 2. 해당 요소의 스크롤을 맨 위로 올립니다.
      mainElement.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
