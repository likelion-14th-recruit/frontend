import { useEffect, useState } from "react";
import SearchIcon from "/icons/search.svg";
import DropDown from "../../components/admin/DropDown";
import Button from "../../components/admin/Button";
import Pagination from "../../components/admin/Pagination";
import Modal from "../../components/admin/Modal";
import FilterLabel from "../../components/admin/FilterLabel";
import FilterBtn from "../../components/admin/FilterBtn";
import {
  PART,
  PASS_STATUS,
  applyParts,
  interviewDates,
  interviewTime,
  type Filter,
  type PartValue,
  type PassStatusValue,
  type Pages,
  passStates,
} from "../../constants/adminFilter";
import ApplicantTable from "../../components/admin/ApplicantTable";

type ConfirmResult =
  | { ok: true; message?: string }
  | { ok: false; message?: string };

const Admin = () => {
  const [partSelected, setPartSelected] = useState<PartValue>("ALL"); //지원 분야
  const [stateSelected, setStateSelected] = useState<PassStatusValue>("ALL"); //지원 결과
  const [dateSelected, setDateSelected] = useState<string[]>([]); //가능 면접일
  const [timeSelected, setTimeSelected] = useState<string>("ALL"); //가능 면접 시간
  const [search, setSearch] = useState(""); //검색어
  const [lastSearched, setLastSearched] = useState({
    part: "ALL",
    passStatus: "ALL",
    dates: "",
    startTime: "ALL",
    search: "",
  }); //(검색된) 마지막 필터 설정
  const [isFilterChanged, setIsFilterChanged] = useState(false); //필터변화 여부
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const [modalContent, setModalContent] = useState(""); //모달 내용
  const [open, setOpen] = useState(false); //모달 표시 여부
  const [sendType, setSendType] = useState<"doc" | "final" | null>(null);

  //필터 설정
  const [filters, setFilters] = useState<Filter>({
    page: 0,
  });
  const [filteredList, setFilteredList] = useState([]); //필터링 결과

  const [page, setPage] = useState<Pages>({
    page: 0,
    totalPages: 0,
  }); // page 설정

  useEffect(() => {
    if (
      partSelected !== lastSearched.part ||
      stateSelected !== lastSearched.passStatus ||
      dateSelected.sort().join(",") !== lastSearched.dates ||
      timeSelected !== lastSearched.startTime ||
      search !== lastSearched.search
    ) {
      setIsFilterChanged(true);
    } else {
      setIsFilterChanged(false);
    }
  }, [partSelected, stateSelected, dateSelected, search, timeSelected]);

  function buildQuery(params: Record<string, any>) {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      sp.set(k, String(v));
    });
    return sp.toString();
  }

  const checkDate = (e: string) => {
    setDateSelected((prev) =>
      prev.includes(e) ? prev.filter((item) => item !== e) : [...prev, e]
    );
  };

  const handleSearch = () => {
    setLastSearched({
      part: partSelected,
      passStatus: stateSelected,
      dates: dateSelected.sort().join(","),
      startTime: timeSelected,
      search: search.trim(),
    });
    setIsFilterChanged(false);
    setPage((prev) => ({ ...prev, page: 0 }));
  };

  // 서류 합격자 문자 발송
  const sendDocPassMessage = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/applications/messages/document-result`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        return {
          ok: false,
          message: "서류 합격자 문자 발송에 실패했습니다.",
        };
      }

      return {
        ok: true,
        message: "서류 합격자 문자 발송이 완료되었습니다.",
      };
    } catch (error) {
      return {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "서류 합격자 문자 발송에 실패했습니다.",
      };
    }
  };

  // 최종 합격자 문자 발송
  const sendFinalPassMessage = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/applications/messages/interview-result`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        return {
          ok: false,
          message: "최종 합격자 문자 발송에 실패했습니다.",
        };
      }

      return {
        ok: true,
        message: "최종 합격자 문자 발송이 완료되었습니다.",
      };
    } catch (error) {
      return {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "최종 합격자 문자 발송에 실패했습니다.",
      };
    }
  };

  const handleFilter = async () => {
    const nextFilters: Filter = {
      page: page.page,
    };

    if (partSelected !== "ALL") nextFilters.part = partSelected;
    if (stateSelected !== "ALL") nextFilters.passStatus = stateSelected;
    if (dateSelected.length > 0)
      nextFilters.dates = dateSelected.sort().join(",");
    if (timeSelected !== "ALL") nextFilters.startTime = timeSelected;

    if (search.trim() !== "") nextFilters.search = search.trim();

    setFilters(nextFilters);

    try {
      const qs = buildQuery(nextFilters);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/applications?${qs}`,
        {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching applications: ${response.status}`);
      }

      const data = await response.json();
      setFilteredList(data.data.content);
      const pageData = {
        page: data.data.page,
        totalPages: data.data.totalPages,
      };
      setPage(pageData);
    } catch (error) {
      console.error("지원서 데이터 불러오기에 실패했습니다.", error);
    }
  };

  useEffect(() => {
    let t: number | undefined;

    if (isLoading) {
      t = window.setTimeout(() => setShowLoading(true), 150); // 150ms 후에만 표시
    } else {
      setShowLoading(false);
    }

    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [isLoading]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setIsLoading(true);
      try {
        await handleFilter();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [page.page, lastSearched]);

  const handleSendMessage = (type: "doc" | "final") => {
    setSendType(type);

    setModalContent(
      type === "doc"
        ? "서류 합격자 문자를 발송하시겠습니까?"
        : "최종 합격자 문자를 발송하시겠습니까?"
    );

    setOpen(true);
  };

  const handleConfirmSend = async (): Promise<ConfirmResult> => {
    if (!sendType) {
      return { ok: false, message: "발송 타입이 선택되지 않았습니다." };
    }

    const result =
      sendType === "doc"
        ? await sendDocPassMessage()
        : await sendFinalPassMessage();

    return result;
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center m-0 p-0 h-auto">
      <div className="flex flex-col w-[800px] justify-start items-start gap-[16px]">
        {/* ------- 지원 분야 필터 ------- */}
        <FilterLabel label="지원 분야">
          <div className="flex gap-[12px]">
            {applyParts.map((part) => (
              <FilterBtn
                key={part.value}
                onChange={setPartSelected}
                selected={partSelected === part.value}
                onClick={() => setPartSelected(part.value)}
              >
                {part.label}
              </FilterBtn>
            ))}
          </div>
        </FilterLabel>

        {/* ------- 지원 결과 필터 ------- */}
        <FilterLabel label="지원 결과">
          <div className="flex gap-[12px]">
            {passStates.map((state) => (
              <FilterBtn
                key={state.value}
                onChange={setPartSelected}
                selected={stateSelected === state.value}
                onClick={() => setStateSelected(state.value)}
              >
                {state.label}
              </FilterBtn>
            ))}
          </div>
        </FilterLabel>

        {/* ------- 면접일 필터 ------- */}
        <div className="flex w-[100%] justify-between gap-9">
          <FilterLabel label="가능 면접일">
            <div className="flex gap-[12px]">
              {interviewDates.map((date) => (
                <FilterBtn
                  key={date.value}
                  onChange={setPartSelected}
                  hasClose={true}
                  selected={dateSelected.includes(date.value)}
                  onClick={() => checkDate(date.value)}
                >
                  {date.label}
                </FilterBtn>
              ))}
            </div>
          </FilterLabel>

          {/* ------- 면접시간 필터 ------- */}
          <FilterLabel label="가능 면접 시간">
            <div className="flex gap-[12px] z-10">
              <DropDown
                isTime={true}
                isAll={true}
                value={timeSelected}
                data={interviewTime}
                onChange={setTimeSelected}
                placeholder={"전체"}
              />
            </div>
          </FilterLabel>
        </div>

        {/* ------- 서치바 ------- */}
        <div className="flex w-full px-[4px] relative items-center">
          <input
            className="pl-[60px] text-[16px] font-[400] focus:outline-none text-black placeholder::text-black/60 bg-no flex items-center gap-[10px] w-full bg-lightGray rounded-[16px] px-[12px] py-[8px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="이름 혹은 전화번호(뒷 부분 4자리 포함)를 검색하세요."
          />
          <img
            src={SearchIcon}
            alt=""
            className="w-[20px] absolute ml-[22px]"
          />
        </div>

        {/* 조회 버튼 */}
        <button
          onClick={handleSearch}
          disabled={!isFilterChanged}
          className={`flex px-[20px] py-[8px] text-[14px] font-[600] text-white rounded-[12px]  ${
            isFilterChanged
              ? "bg-black/80 hover:bg-black ease-in-out duration-200"
              : "bg-black/20 cursor-default"
          }`}
        >
          목록 조회
        </button>

        <div className="w-full border-b border-lightGray"></div>

        <div className="flex w-full justify-end gap-[12px] mt-[20px]">
          <Button
            styleType="purple"
            isActive={true}
            onClick={() => handleSendMessage("doc")}
          >
            서류 합격자 문자 발송
          </Button>
          <Button
            styleType="sogang"
            isActive={true}
            onClick={() => handleSendMessage("final")}
          >
            최종 합격자 문자 발송
          </Button>
        </div>

        <Modal
          isTwo={true}
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setSendType(null);
          }}
          onConfirm={handleConfirmSend}
        >
          <div>
            {modalContent}
            <br />
            발송 후에는 되돌릴 수 없습니다.
          </div>
        </Modal>

        <ApplicantTable data={filteredList} isLoading={showLoading} />
        <Pagination
          currentPage={page.page}
          totalPages={page.totalPages}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Admin;
