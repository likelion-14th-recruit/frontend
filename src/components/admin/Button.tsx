import type { ReactNode } from "react";

type ButtonStyleType = "purple" | "sogang" | "active" | "inactive";

type buttonProps = {
  children: ReactNode;
  onClick?: () => void;
  block?: boolean;
  isActive?: boolean;
  styleType: ButtonStyleType;
};

const STYLE_MAP = {
  purple: "text-purple bg-purple/[0.08] hover:bg-purple/[0.13]",
  sogang: "text-sogang bg-sogang/[0.08] hover:bg-sogang/[0.13]",
  active: "text-white bg-black/80 hover:bg-black/95",
  inactive: "text-white bg-black/20",
} as const;

const Button = ({
  children,
  onClick,
  block,
  isActive,
  styleType = "purple",
}: buttonProps) => {
  const style = STYLE_MAP[styleType];
  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={`flex justify-center items-center rounded-[12px]
        border-none font-sans font-[550] ease-in-out duration-200
        ${
          block
            ? `w-full text-[19px] px-[24px] py-[12px] ${style}`
            : `text-[14px] px-[12px] py-[8px] ${style}`
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
