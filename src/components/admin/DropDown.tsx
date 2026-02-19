import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import dropdown_icon from "/icons/dropDown.svg";

export type DropDownOption<T = string> = {
  label: string;
  value: T;
};

export type StatusLabel = {
  label: string;
  value: string;
};

type dropDownProps<T extends string> = {
  value?: T | "" /** 현재 선택된 값 (API value) */;
  data: DropDownOption<T>[];
  onChange: (value: T) => void;

  placeholder?: ReactNode /** 선택 전 표시 텍스트 */;
  inactive?: boolean;
  isTime?: boolean;
  isAll?: boolean;
};

const DropDown = <T extends string>({
  value = "",
  data,
  onChange,
  placeholder = "전체",
  inactive,
  isTime,
  isAll,
}: dropDownProps<T>) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedLabel = useMemo(() => {
    if (!value) return null;
    return data.find((o) => o.value === value)?.label ?? String(value);
  }, [value, data]);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const toggle = () => {
    if (inactive) return;
    setOpen((p) => !p);
  };

  const handleSelect = (v: T) => {
    onChange(v); // value만 올림
    setOpen(false); // 선택하면 닫기
  };

  const getStatusStyle = (value: string) => {
    switch (value) {
      case "INTERVIEW_PASSED":
        return "text-sogang";
      case "DOCUMENT_PASSED":
        return "text-[#0003AC]";
      case "INTERVIEW_FAILED":
      case "DOCUMENT_FAILED":
        return "text-black";
      case "PENDING":
        return "text-black/60";
      case "ALL":
      case "전체":
      case "면접일":
      case "면접 시간":
        return "text-black/60";
      default:
        return "text-black";
    }
  };

  return (
    <div
      ref={rootRef}
      className={`flex relative justify-between items-center text-black w-[220px] pl-[12px] pr-[4px]
        ${inactive ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      onClick={toggle}
      role="button"
      aria-disabled={inactive}
    >
      <h3
        className={`${getStatusStyle(value)} ${
          inactive ? "text-black/40" : ""
        }`}
      >
        {selectedLabel ?? placeholder}
      </h3>

      <img
        src={dropdown_icon}
        className={`transition-transform duration-300 ${
          open && !inactive ? "rotate-180" : ""
        }`}
        alt=""
      />

      {open && !inactive && (
        <div
          className="absolute top-[42px] left-0 w-full z-50 shadow-[0_2px_8px_rgba(0,0,0,0.25)] rounded-[12px]"
          style={{}}
        >
          <div
            className="flex flex-col w-full bg-white overflow-hidden rounded-[12px]"
            style={{
              transform: "translateZ(0)",
              WebkitMaskImage: "-webkit-radial-gradient(white, black)", // 사파리 border-radius 버그 수정
            }}
          >
            {data.map((d, index) => {
              return (
                <button
                  type="button"
                  key={d.value}
                  className={`text-left z-0 flex w-full ${
                    index === data.length - 1
                      ? "border-none"
                      : "border-b border-b-solid border-b-lightGray"
                  } px-[12px] py-[8px] font-[350] transition-colors
                ${index === 0 ? "rounded-t-[12px]" : ""}
                ${index === data.length - 1 ? "rounded-b-[12px]" : ""}
                hover:bg-lightGray focus:outline-none`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(d.value);
                  }}
                >
                  {isTime
                    ? isAll
                      ? index !== 0
                        ? `타임 ${index} |  `
                        : ""
                      : `타임 ${index + 1} |  `
                    : ""}
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
