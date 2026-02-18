import { useLocation, useNavigate, NavLink } from "react-router-dom";
import mainLogo from "/main-logo.svg";
import textLogoLight from "/text-logo.svg";
import textLogoDark from "/text-logo-dark.svg";
import { useHeaderTheme } from "../../hooks/useHeaderTheme";

interface HeaderProps {
  onOpenMenu?: () => void;
}

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH;

const Nav = [
  { to: "/about", label: "ABOUT" },
  { to: "/project", label: "PROJECT" },
  { to: "/people", label: "PEOPLE" },
  { to: "/recruit", label: "RECRUIT" },
];

function cx(...arr: (string | false | null | undefined)[]) {
  return arr.filter(Boolean).join(" ");
}

const Header = ({ onOpenMenu }: HeaderProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAdmin = pathname.startsWith(`/${ADMIN_PATH}`);
  const theme = useHeaderTheme(80); // "dark" | "light"
  const isDark = theme === "dark";

  const textLogo = isDark ? textLogoDark : textLogoLight; // dark일 때 light일 때 로고 다르게
  const logoTo = isAdmin ? `/${ADMIN_PATH}` : "/"; //admin일 때 아닐 때 로고 navigate 루트 다르게
  // 공통 네비게이션 & 스크롤 함수
  const handleNavClick = (to: string) => {
    // 1. 스크롤 주체인 <main> 요소를 찾아 상단으로 이동
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // 2. 페이지 이동
    navigate(to);
  };
  const hamburger =
    "https://likrlion.s3.us-east-1.amazonaws.com/14th+web/menu.svg";

  return (
    <>
      <header className="fixed top-0 left-0 z-[100] w-full">
        {/* base layer (light) */}
        <div
          className={cx(
            "absolute inset-0 transition-opacity duration-100 ease-in-out z-0",
            isDark ? "opacity-0" : "opacity-100",
            "bg-header-light",
          )}
        />

        {/* top layer (dark) */}
        <div
          className={cx(
            "absolute inset-0 transition-opacity duration-100 ease-in-out z-0",
            isDark ? "opacity-100" : "opacity-0",
            "bg-header-dark",
          )}
        />
        {/* logo 부분 */}
        <div className="mx-auto relative z-10 flex h-[80px] w-full items-center justify-between px-[20px] lg:px-[40px]">
          <div
            className="flex items-center gap-[12px] cursor-pointer"
            onClick={() => handleNavClick(logoTo)}
          >
            <img className="h-[56px] w-[56px]" src={mainLogo} alt="logo" />
            <img
              className="w-[152px] hidden md:block"
              src={textLogo}
              alt="LikeLion Sogang"
            />
          </div>
          <div className="hidden md:block">
            <nav className="flex items-center gap-8 ">
              {/* 관리자 페이지 nav 설정 */}
              {isAdmin ? (
                <div className="flex items-center">
                  <h2
                    className="font-sogang text-[16px] font-normal cursor-pointer hover:underline"
                    onClick={() => navigate("/admin")}
                  >
                    HOME
                  </h2>
                </div>
              ) : (
                // 일반 페이지 nav 설정
                Nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cx(
                        "font-sogang text-[16px] transition-colors",
                        isActive
                          ? "text-sogang" //현재 탭 활성화면 색상 변경
                          : isDark
                            ? "text-white/80" //배경 dark일 때 텍스트
                            : "text-black", //배경 light일 때 텍스트
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))
              )}
            </nav>
          </div>
          {
            <div
              className="md:hidden w-[40px] h-[40px] flex p-[6px_3px] flex-col justify-center items-center gap-[10px] shrink-0"
              onClick={onOpenMenu}
            >
              <img
                className={`${isDark ? "invert" : ""} brightness-0`}
                src={hamburger}
              />
            </div>
          }
        </div>
      </header>
    </>
  );
};

export default Header;
