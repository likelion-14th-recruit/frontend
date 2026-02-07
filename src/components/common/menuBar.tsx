import { NavLink } from "react-router-dom";

interface MenuBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Nav = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/project", label: "PROJECT" },
  { to: "/people", label: "PEOPLE" },
  { to: "/recruit", label: "RECRUIT" },
];

function cx(...arr: (string | false | null | undefined)[]) {
  return arr.filter(Boolean).join(" ");
}

const menuBar = ({ isOpen, onClose }: MenuBarProps) => {
  return (
    <>
      {/* 1. 배경 오버레이 (클릭 시 닫힘) */}
      <div
        className={cx(
          "fixed inset-0 z-[110] bg-black/50 transition-opacity duration-300  ",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        onClick={onClose} // 배경 누르면 닫히는 로직
      />
      {/* flex w-[200px] h-full p-[20px_0px] flex-col items-end shrink-0  bg-[lightGray]  */}
      {/* 2. 메뉴 본체 (오른쪽 정렬 + 슬라이드 애니메이션) */}
      <div
        className={cx(
          "fixed top-0 right-0 z-[120] h-full w-[200px] bg-[lightGray] transition-transform duration-300 ease-in-out shadow-2xl flex flex-col items-end",
          isOpen ? "translate-x-0" : "translate-x-full", // 오른쪽에서 왼쪽으로 나타남
        )}
      >
        {/* 닫기 버튼 영역 (오른쪽 정렬) */}
        {/* flex p-[10px_20px] justify-end items-center gap-[10px] self-stretch */}
        <div className="flex p-[20px_0px] flex-col item-start shrink-0 w-full">
          <div
            className="flex p-[10px_20px] justify-end items-center gap-[10px] cursor-pointer w-full self-stretch"
            onClick={onClose} // X 버튼 누르면 닫히는 로직
          >
            <img
              src="https://likrlion.s3.us-east-1.amazonaws.com/14th+web/close.svg"
              alt="close"
              className="w-6 h-6"
            />
          </div>

          {/* 네비게이션 리스트 (항목별로 오른쪽 정렬) */}
          {/* flex p-[10px_32px] items-center gap-[10px] self-stretch */}
          <nav className="flex flex-col w-full ">
            {Nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose} // 메뉴 클릭 시 이동하면서 닫힘
                className={({ isActive }) =>
                  cx(
                    "font-sogang flex p-[10px_32px] gap-[10px] self-stretch justify-start items-center text-[16px] font-black-80 transition-colors w-full",
                    isActive ? "text-sogang" : "text-black hover:bg-black/5",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default menuBar;
