import type { Dispatch, SetStateAction } from "react";
import DropDown from "./DropDown";
import {
  dateOfWeek,
  interviewDates,
  interviewTime,
  passStates,
  type AvailTime,
  type ApplyDetail,
  applyParts,
  academicStatus,
  type InterviewSchedule,
} from "../../constants/adminFilter";

const DetailTable = ({
  data,
  availTime,
  ApplyState,
  setApplyState,
  interviewSchedule,
  setInterviewSchedule,
}: {
  data: ApplyDetail | undefined;
  availTime?: AvailTime[];
  ApplyState: string;
  setApplyState: Dispatch<SetStateAction<string>>;
  interviewSchedule: InterviewSchedule;
  setInterviewSchedule: Dispatch<SetStateAction<InterviewSchedule>>;
}) => {
  const labelStyle =
    "bg-lightGray w-[100px] font-[600] flex justify-center items-center text-center py-[10px] border-t border-t-lightGray";
  const contentStyle =
    "bg-white font-[400] py-[10px] pl-[20px] border-t border-t-lightGray";
  const dropDownStyle =
    "bg-white font-[400] flex py-[4px] pl-[10px] border-t border-t-lightGray";
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
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr]">
            {availTime?.map((day) => {
              const dateLabel =
                interviewDates.find((i) => i.value === day.date)?.label ?? "-";
              const dateOfWeekLabel =
                dateOfWeek.find((i) => i.value === day.dayOfWeek)?.label ?? "-";

              return (
                <div key={day.date} className={timetableStyle}>
                  <span className="font-[600] pb-[8px]">
                    {dateLabel}({dateOfWeekLabel})
                  </span>

                  {day?.times?.map((time, index) => (
                    <div key={index}>
                      {time.startTime}~{time.endTime}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 행 6 */}
      <div className="grid grid-cols-[100px_1fr_100px_1fr]">
        <div className={labelStyle}>지원 결과</div>
        <div className={dropDownStyle}>
          <DropDown
            data={passStates.slice(1)}
            value={ApplyState}
            onChange={(v) => setApplyState(v)}
            placeholder="검토 전"
            cut={true}
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
        <input
          type="text"
          value={interviewSchedule.place}
          placeholder="면접 장소를 입력해주세요."
          className={`${contentStyle} border-b focus:outline-none font-[400] text-black ${
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
  );
};

export default DetailTable;
