import { useLocation, useNavigate, NavLink } from "react-router-dom";
import mainLogo from "/main-logo.svg";
import textLogoLight from "/text-logo.svg";
import instaIcon from "/instagramIcon.svg";

const Nav = [
  { to: "/about", label: "ABOUT" },
  { to: "/project", label: "PROJECT" },
  { to: "/people", label: "PEOPLE" },
  { to: "/recruit", label: "RECRUIT" },
];

function cx(...arr: (string | false | null | undefined)[]) {
  return arr.filter(Boolean).join(" ");
}

const Footer = () => {
  return (
    <footer className="w-full bg-white flex justify-center border-t border-gray-100">
      <div
        className={cx(
          "flex w-full max-w-[1440px] justify-between items-center transition-all",
          // 모바일 스타일 (기본)
          "flex-col px-[40px] pt-[20px] pb-[40px] gap-[20px]",
          // 데스크탑 스타일 (md 이상)
          "md:flex-row md:px-[60px] md:pt-[30px] md:pb-[60px] md:gap-0",
        )}
      >
        {/* 1. 로고 및 저작권 영역 */}
        <div className="flex flex-col items-center md:items-start gap-[16px]">
          <div className="hidden md:flex items-center gap-[12px] cursor-pointer">
            <img
              className="h-[40px] w-[40px] md:h-[56px] md:w-[56px]"
              src={mainLogo}
              alt="logo"
            />
            <img
              className="w-[120px] md:w-[152px]"
              src={textLogoLight}
              alt="LikeLion Sogang"
            />
          </div>
          <a
            className="block md:hidden"
            href="https://instagram.com/..."
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={instaIcon}
              alt="instagram"
              className="w-[44px] h-[44px] md:w-auto md:h-auto"
            />
          </a>
          <div className="flex flex-col items-center md:items-start gap-[4px] text-center md:text-left">
            <div className="text-black/60 font-pretendard text-[14px] leading-[140%] self-stretch">
              서강대학교 IT 창업 동아리
            </div>
            <div className="text-black/60 font-pretendard text-[12px] md:text-[14px] leading-[140%] self-stretch">
              © 2025 LikeLion Sogang 14th. All rights reserved.
            </div>
          </div>
        </div>

        {/* 2. 메뉴 및 소셜 영역 (모바일에서 세로 배치) */}
        <div
          className={cx(
            "flex flex-col shrink-0 items-center",
            // 모바일: 인스타 아이콘과 글자만 남는 구조
            "gap-[20px]",
            // 데스크탑: 가로로 긴 구조
            "md:w-[317px] md:items-end md:gap-[38px] md:pt-[20px]",
          )}
        >
          {/* 메뉴 Nav: 모바일에서는 숨기거나 작게 배치 (요청하신 대로 글자만 남김) */}
          <div className="hidden md:flex items-center gap-[20px] md:gap-[24px]">
            {Nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx(
                    "font-sogang text-[14px] font-black-80 transition-colors",
                    isActive ? "text-sogang" : "text-black",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* 인스타 아이콘 */}
          <a
            className="hidden md:flex "
            href="https://instagram.com/..."
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={instaIcon}
              alt="instagram"
              className="w-[24px] h-[24px] md:w-auto md:h-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
