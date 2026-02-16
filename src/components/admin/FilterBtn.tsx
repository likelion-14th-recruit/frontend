import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { PartValue } from "../../constants/adminFilter";
import close_icon from "/icons/close.svg";

type FilterBtnProps = {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  hasClose?: boolean;
  onChange?: Dispatch<SetStateAction<PartValue>>;
};

const FilterBtn = ({
  children,
  hasClose,
  selected,
  onClick,
}: FilterBtnProps) => {
  return (
    <button
      className={`flex gap-[6px] justify-center items-center px-[12px] py-[4px] border rounded-[12px] border-solid font-400 ${
        selected ? "text-sogang border-sogang" : "text-black/60 border-black/40"
      }`}
      onClick={onClick}
    >
      {children}
      {selected && hasClose && (
        <img src={close_icon} alt="" className="w-[14px] h-[14px]" />
      )}
    </button>
  );
};

export default FilterBtn;
