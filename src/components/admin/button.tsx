import type { ReactNode } from "react";

type ButtonStyleType = "purple" | "sogang" | "active" | "inactive";

type buttonProps = {
  children: ReactNode;
  onClick?: () => void;
  block?: boolean;
  styleType: ButtonStyleType;
};

const STYLE_MAP = {
  purple: "text-purple bg-purple/[0.08]",
  sogang: "text-sogang bg-sogang/[0.08]",
  active: "text-white bg-black",
  inactive: "text-white bg-black/80",
} as const;

const Button = ({
  children,
  onClick,
  block,
  styleType = "purple",
}: buttonProps) => {
  const style = STYLE_MAP[styleType];
  return (
    <button
      onClick={onClick}
      className={`flex px-[12px] py-[8px] justify-center items-center rounded-[12px]
        border-none font-sans font-[600]
        ${block ? `w-full text-[20px] ${style}` : `text-[14px] ${style}`}`}
    >
      {children}
    </button>
  );
};

export default Button;
