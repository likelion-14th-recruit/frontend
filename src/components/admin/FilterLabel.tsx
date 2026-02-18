import type { ReactNode } from "react";

type FilterLabelProps = {
  children: ReactNode;
  label: string;
};

const FilterLabel = ({ children, label }: FilterLabelProps) => {
  return (
    <div className="flex gap-[27px] justify-center items-center text-[16px] font-sans">
      <h3 className="text-black font-[550] w-[91px] text-center">{label}</h3>
      {children}
    </div>
  );
};

export default FilterLabel;
