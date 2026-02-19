import type { Dispatch, SetStateAction } from "react";
import {
  interviewDates,
  interviewTime,
  passStates,
  type AvailTime,
  type ApplyDetail,
  applyParts,
  academicStatus,
  type InterviewSchedule,
  type PassStatus,
} from "../../constants/adminFilter";
import DropDown from "./DropDown";

const DetailTable = ({
  data,
  availTime,
  isLoading,
  ApplyState,
  setApplyState,
  interviewSchedule,
  setInterviewSchedule,
}: {
  data: ApplyDetail | undefined;
  availTime?: AvailTime[];
  isLoading: boolean;
  ApplyState: PassStatus | "";
  setApplyState: Dispatch<SetStateAction<PassStatus | "">>;
  interviewSchedule: InterviewSchedule;
  setInterviewSchedule: Dispatch<SetStateAction<InterviewSchedule>>;
}) => {
  const labelStyle =
    "bg-lightGray w-[100px] font-[550] flex justify-center items-center text-center py-[10px] border-t border-t-[#E3E3E3]";
  const contentStyle =
    "bg-white font-[350] py-[10px] pl-[20px] border-t border-t-[#E3E3E3]";
  const dropDownStyle =
    "bg-white font-[350] flex py-[4px] pl-[10px] border-t border-t-[#E3E3E3]";
  const timetableStyle =
    "flex flex-col justify-start items-center px-[20px] py-[6px] gap-[4px]";

  return (
    <div className="w-full text-[16px] text-black">
      {/* 행 1 */}
      <div className="grid grid-cols-[100px_1fr_100px_1fr]">
        <div className={labelStyle}>이름</div>
        <div className={contentStyle}>{data?.name}</div>
        <div className={labelStyle}>학번</div>
        <div className={contentStyle}>{data?.studentNumber}</div>
      </div>
      {/* 행 2 */}
      <div className="grid grid-cols-[100px_1fr_100px_1fr]">
        <div className={labelStyle}>지원 분야</div>
        <div className={contentStyle}>
          {applyParts.find((i) => i.value === data?.part)?.label ?? "-"}
        </div>
        <div className={labelStyle}>전화번호</div>
        <div className={contentStyle}>
          {data?.phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
        </div>
      </div>
      {/* 행 3 */}
      <div className="grid grid-cols-[100px_1fr_100px_1fr]">
        <div className={labelStyle}>주전공</div>
        <div className={contentStyle}>{data?.major}</div>
        <div className={labelStyle}>부전공</div>
        <div className={contentStyle}>{data?.doubleMajor || "-"}</div>
      </div>
      {/* 행 4 */}
      <div className="grid grid-cols-[100px_1fr_100px_1fr]">
        <div className={labelStyle}>학적 상태</div>
        <div className={contentStyle}>
          {academicStatus.find((i) => i.value === data?.academicStatus)
            ?.label ?? "-"}
        </div>
        <div className={labelStyle}>이수 학기</div>
        <div className={contentStyle}>{data?.semester}학기</div>
      </div>
      {/* 행 5 -- 가능 면접 시간 */}
      <div className="grid grid-cols-[100px_1fr]">
        <div className={labelStyle}>
          가능
          <br /> 면접 시간
        </div>
        <div className={contentStyle}>
          {isLoading ? (
            <div className="flex items-center justify-center h-[250px]">
              불러오는 중..
            </div>
          ) : (
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr]">
              {interviewDates.map((day) => {
                const matchedDate = availTime?.find(
                  (i) => i.date === day.value,
                );
                const times = matchedDate?.times ?? [];
                const hasAvailTime = times.length > 0;

                return (
                  <div key={day.value} className={timetableStyle}>
                    <span className="font-[550] pb-[8px]">
                      {day.label}({day.dayOfWeek})
                    </span>

                    {hasAvailTime ? (
                      times?.map((time, index) => (
                        <div key={index}>
                          {time.startTime}~{time.endTime}
                        </div>
                      ))
                    ) : (
                      <div>가능 시간 없음</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* 행 6 */}
      <div className="grid grid-cols-[100px_1fr_100px_1fr]">
        <div className={labelStyle}>지원 결과</div>
        <div className={dropDownStyle}>
          <DropDown
            data={passStates.slice(1)}
            value={ApplyState}
            onChange={(v) => setApplyState(v as PassStatus)}
            placeholder="검토 전"
          />
        </div>
        <div className={labelStyle}>면접일</div>
        <div className={dropDownStyle}>
          <DropDown
            data={interviewDates}
            value={interviewSchedule.date}
            inactive={ApplyState !== "DOCUMENT_PASSED"}
            placeholder="면접일"
            onChange={(v) =>
              setInterviewSchedule({
                date: v,
                startTime: interviewSchedule?.startTime ?? "",
                place: interviewSchedule?.place ?? "",
              })
            }
          />
        </div>
      </div>
      {/* 행 7 */}
      <div className="grid grid-cols-[100px_1fr_100px_1fr]">
        <div className={`${labelStyle} border-b`}>면접 시간</div>
        <div className={`${dropDownStyle} border-b`}>
          <DropDown
            data={interviewTime.slice(1)}
            value={interviewSchedule.startTime}
            isTime={true}
            inactive={
              ApplyState !== "DOCUMENT_PASSED" || !interviewSchedule?.date
            }
            placeholder="면접 시간"
            onChange={(v) =>
              setInterviewSchedule({
                date: interviewSchedule.date,
                startTime: v,
                place: interviewSchedule?.place ?? "",
              })
            }
          />
        </div>
        <div className={`${labelStyle} border-b`}>면접 장소</div>
        <div className={`${dropDownStyle} border-b`}>
          <input
            type="text"
            value={interviewSchedule.place}
            placeholder="면접 장소를 입력해주세요."
            className={`bg-white pl-[12px] w-[220px] focus:outline-none font-[350] text-black ${
              ApplyState !== "DOCUMENT_PASSED" || !interviewSchedule?.startTime
                ? " placeholder:text-black/30 text-black/30"
                : " placeholder:text-black/60 text-black"
            }`}
            disabled={
              ApplyState !== "DOCUMENT_PASSED" || !interviewSchedule?.startTime
            }
            onChange={(v) =>
              setInterviewSchedule({
                date: interviewSchedule.date,
                startTime: interviewSchedule.startTime,
                place: v.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DetailTable;
