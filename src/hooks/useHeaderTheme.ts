import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type HeaderTheme = "dark" | "light";
// 현재 섹션이 dark인지 light인지 전달하는 hook
// -> 페이지 내에서 섹션별로 배경색 다르면, 어두운 부분에서는 data-header=dark, 밝은 부분에서는 =light로 설정하면됨
// 자세한 건 home이랑 recruitHome에서만 배경색 변화 있어서 거기 코드 참고

export function useHeaderTheme(headerPx = 80) {
  const [theme, setTheme] = useState<HeaderTheme>("dark");
  const { pathname } = useLocation();

  useEffect(() => {
    let rafId: number | null = null;

    const getScroller = (): Window | HTMLElement => {
      const main = document.querySelector("main") as HTMLElement | null;
      // main이 스크롤 컨테이너(overflow)일 때만 main을 쓰고,
      // 아니면 window로 fallback
      if (main) {
        const style = window.getComputedStyle(main);
        const canScroll =
          /(auto|scroll|overlay)/.test(style.overflowY) ||
          /(auto|scroll|overlay)/.test(style.overflow);
        if (canScroll) return main;
      }
      return window;
    };

    const pickTheme = () => {
      const y = headerPx + 1;

      // data-header 달린 섹션들 중에서 y를 포함하는 “가장 마지막” 요소 선택
      // (겹칠 때 안쪽/후순위 DOM을 우선)
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header]"),
      );

      let match: HTMLElement | null = null;
      for (const sec of sections) {
        const r = sec.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) match = sec;
      }

      const next = (match?.dataset.header as HeaderTheme) || "light";
      setTheme(next);
    };

    const update = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        pickTheme();
      });
    };

    const scroller = getScroller();

    if (scroller === window) {
      window.addEventListener("scroll", update, { passive: true });
    } else {
      (scroller as HTMLElement).addEventListener("scroll", update, {
        passive: true,
      });
    }

    window.addEventListener("resize", update);

    // 첫 렌더/라우트 변경 직후 레이아웃 안정화까지 반영
    update();
    const t = window.setTimeout(update, 0);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.clearTimeout(t);

      if (scroller === window) {
        window.removeEventListener("scroll", update);
      } else {
        (scroller as HTMLElement).removeEventListener("scroll", update);
      }

      window.removeEventListener("resize", update);
    };
  }, [headerPx, pathname]);

  return theme;
}
