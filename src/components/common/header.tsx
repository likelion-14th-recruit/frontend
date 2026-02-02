import { useLocation, useNavigate, NavLink } from "react-router-dom";
import mainLogo from "/main-logo.svg";
import textLogoLight from "/text-logo.svg";
import textLogoDark from "/text-logo-dark.svg";
import { useHeaderTheme } from "../../hooks/useHeaderTheme";

const Nav = [
  { to: "/about", label: "ABOUT" },
  { to: "/project", label: "PROJECT" },
  { to: "/people", label: "PEOPLE" },
  { to: "/recruit", label: "RECRUIT" },
];

function cx(...arr: (string | false | null | undefined)[]) {
  return arr.filter(Boolean).join(" ");
}

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useHeaderTheme(80); // "dark" | "light"
  const isDark = theme === "dark";

  const textLogo = isDark ? textLogoDark : textLogoLight; // dark일 때 light일 때 로고 다르게
  const isAdmin = pathname.startsWith("/admin");
  const logoTo = isAdmin ? "/admin" : "/"; //admin일 때 아닐 때 로고 navigate 루트 다르게

  return (

      <header
        className={cx(
          "fixed top-0 left-0 z-[100] w-full transition-colors duration-350",
          isDark ? "bg-header-dark" : "bg-header-light"
        )}
      >
        {/* logo 부분 */}
        <div className="mx-auto flex h-[80px] w-full items-center justify-between px-[40px]">
          <div
            className="flex items-center gap-[12px] cursor-pointer"
            onClick={() => navigate(logoTo)}
          >
            <img className="h-[56px] w-[56px]" src={mainLogo} alt="logo" />
            <img className="w-[152px]" src={textLogo} alt="LikeLion Sogang" />
          </div>

          <nav className="flex items-center gap-8">
            {/* 관리자 페이지 nav 설정 */}
            {isAdmin ? (
              <div className="flex items-center">
                <h2
                  className="font-sogang text-[16px] font-black cursor-pointer hover:underline"
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
                      "font-sogang text-[16px] font-black transition-colors",
                      isActive
                        ? "text-sogang" //현재 탭 활성화면 색상 변경
                        : isDark
                        ? "text-white" //배경 dark일 때 텍스트
                        : "text-black" //배경 light일 때 텍스트
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))
            )}
          </nav>
        </div>
      </header>

  );
};

export default Header;
