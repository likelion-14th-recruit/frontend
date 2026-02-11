import { useEffect, useState } from "react";
import ArticleBlock from "../../components/admin/articleBlock";
import Button from "../../components/admin/button";
import DetailTable from "../../components/admin/detailTable";
import Modal from "../../components/admin/modal";
import { useParams } from "react-router-dom";
import {
  type AvailTime,
  type ApplyDetail,
  type InterviewSchedule,
  type PassStatus,
} from "../../constants/adminFilter";

const AdminDetail = () => {
  const [open, setOpen] = useState(false);
  const [applyState, setApplyState] = useState<PassStatus | "">("");
  // const [interviewDate, setInterviewDate] = useState();
  // const [interviewTime, setInterviewTime] = useState();
  // const [interviewPlace, setInterviewPlace] = useState();
  const { applicationPublicId } = useParams();

  const [applyData, setApplyData] = useState<ApplyDetail>();
  const [availTime, setAvailTime] = useState<AvailTime[]>();
  const [interviewSchedule, setInterviewSchedule] = useState<InterviewSchedule>(
    {
      date: "",
      startTime: "",
      place: "",
    }
  ); //면접 확정 날/시간/장소
  const [answers, setAnswers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // 지원 상세정보 조회 (이름 ~ 이수학기)
  const fetchApplyData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/applications/${applicationPublicId}/detail`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setApplyData(data.data);
      setApplyState(data.data.passStatus);
    } catch (error) {
      console.error("Error fetching application detail data:", error);
    }
  };

  // 가능 면접 시간
  const fetchAvailTime = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/applications/${applicationPublicId}/detail-interview-available`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setAvailTime(data.data.interviewAvailableTimes);
    } catch (error) {
      console.error("Error fetching application detail data:", error);
    }
  };

  // 답변 조회
  const fetchAnswers = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/applications/${applicationPublicId}/answers`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setAnswers(data.data.answers);
    } catch (error) {
      console.error("Error fetching application detail data:", error);
    }
  };

  // 면접 확정 시간 조회
  const fetchInterviewTime = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/applications/${applicationPublicId}/interview-schedule/select`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setInterviewSchedule(data.data);
    } catch (error) {
      console.error("Error fetching application detail data:", error);
    }
  };

  // 면접 상태 변경
  const changePassStatus = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/applications/${applicationPublicId}/pass-status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            passStatus: applyState,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching application detail data:", error);
    }
  };

  // 면접 일정(날짜/시간/장소) 변경
  const changeInterviewSchedule = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/applications/${applicationPublicId}/interview-schedule/select`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            date: interviewSchedule.date,
            startTime: interviewSchedule.startTime,
            place: interviewSchedule.place,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching application detail data:", error);
    }
  };

  const handleSaveBtn = () => {
    if (applyData?.passStatus !== applyState) {
      changePassStatus();
    }
    if (interviewSchedule.place !== "") {
      changeInterviewSchedule();
    }
    setOpen(true);
  };

  useEffect(() => {
    fetchApplyData();
    fetchAvailTime();
    fetchAnswers();
    fetchInterviewTime();
    setIsLoading(false);
  }, [applicationPublicId]);

  // 디버깅용 - 면접 상태 확인
  // useEffect(() => {
  //   console.log(applyState);
  // }, [applyState]);

  // 디버깅용 - 면접 스케줄 확인
  useEffect(() => {
    console.log(interviewSchedule);
  }, [interviewSchedule]);

  return (
    <div className="w-[100%] flex flex-col justify-center items-center m-0 py-[50px]">
      <div className="w-[800px] flex flex-col justify-center items-center gap-[40px]">
        <div className="w-full">
          <DetailTable
            data={applyData}
            ApplyState={applyState}
            setApplyState={setApplyState}
            availTime={availTime}
            interviewSchedule={interviewSchedule}
            setInterviewSchedule={setInterviewSchedule}
          />
          <div className="w-full flex justify-start items-start text-[16px] text-sogang font-[400] mt-[10px]">
            *면접일과 면접 시간은 서류 합격자에 한해 선택 가능하며, 선택 후 면접
            장소 입력이 가능합니다. <br />
            또한 세 항목을 모두 입력해야 저장됩니다.
          </div>
        </div>

        {questions.map((q, index) => (
          <ArticleBlock
            key={index}
            num={index}
            question={q}
            answer={answers?.[index]}
          />
        ))}
        <Button block={true} styleType="active" onClick={handleSaveBtn}>
          저장하기
        </Button>
        <Modal isTwo={false} isOpen={open} onClose={() => setOpen(false)}>
          <div>저장이 완료되었습니다.</div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminDetail;

const questions = [
  "간단한 자기소개와 함께, 다양한 IT 동아리 중에서 멋쟁이사자처럼 서강대학교 14기를 선택하고 지원하시게 된 이유를 작성해주세요. (500자 이내)",
  "선택한 파트를 지원하게 된 이유와 관련 경험이 있다면 함께 작성해주세요. 관련 경험이 없다면, 멋쟁이사자처럼에서 해당 파트로 활동하며 어떤 성장을 기대하는지 작성해주세요. (500자 이내)",
  "멋쟁이사자처럼 서강대학교는 협업과 팀워크를 중요한 가치로 생각하는 공동체입니다. 지원 분야와 관계 없이 지원자 본인이 협업과 팀워크를 진행해보았던 경험과, 그 경험을 멋쟁이사자처럼 서강대학교에서 어떻게 적용시킬 수 있을지 작성해주세요. (500자 이내)",
  "실현하고 싶은 자신만의 서비스, IT 서비스 아이디어에 대해 설명해주세요. (500자 이내)",
  "GitHub / 포트폴리오 링크",
];
