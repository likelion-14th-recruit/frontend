export type PartValue = (typeof PART)[keyof typeof PART]; // "BACKEND" | "FRONTEND" | "PRODUCT_DESIGN" | "ALL"
export type PassStatusValue = (typeof PASS_STATUS)[keyof typeof PASS_STATUS]; // ... | "ALL"

export type Filter = {
  page: number;
  part?: Exclude<PartValue, "ALL">;
  passStatus?: Exclude<PassStatusValue, "ALL">;
  dates?: string; // "2026-03-09,2026-03-10"
  startTime?: string; // "18:00:00"
  search?: string;
};

export type InterviewSchedule = {
  date?: string; // "2026-03-09,2026-03-10"
  startTime?: string; // "18:00:00"
  endTime?: string; // "18:00:00"
  place?: string;
};

export type PassStatus =
  | "PENDING"
  | "DOCUMENT_PASSED"
  | "DOCUMENT_FAILED"
  | "INTERVIEW_PASSED"
  | "INTERVIEW_FAILED";

export type ApplyDetail = {
  name: string;
  studentNumber: string;
  part: string;
  phoneNumber: string;
  major: string;
  doubleMajor?: string;
  academicStatus: string;
  semester: number;
  passStatus: string;
};

export type AvailTimeSlot = {
  interviewTimeId: number;
  startTime: string;
  endTime: string;
};

export type AvailTime = {
  date: string;
  dayOfWeek: string;
  times?: AvailTimeSlot[];
};

export type Pages = {
  page: number;
  size?: number;
  totalElements?: number;
  totalPages: number;
};

export const PART = {
  Backend: "BACKEND",
  Frontend: "FRONTEND",
  ProductDesign: "PRODUCT_DESIGN",
  All: "ALL",
} as const;

export const applyParts = [
  { label: "전체", value: PART.All },
  { label: "백엔드", value: PART.Backend },
  { label: "프론트엔드", value: PART.Frontend },
  { label: "기획·디자인", value: PART.ProductDesign },
];

export const PASS_STATUS = {
  Pending: "PENDING",
  DocumentFailed: "DOCUMENT_FAILED",
  DocumentPassed: "DOCUMENT_PASSED",
  InterviewFailed: "INTERVIEW_FAILED",
  InterviewPassed: "INTERVIEW_PASSED",
  All: "ALL",
} as const;

export const passStates = [
  { label: "전체", value: PASS_STATUS.All },
  { label: "검토 전", value: PASS_STATUS.Pending },
  { label: "서류 탈락", value: PASS_STATUS.DocumentFailed },
  { label: "서류 합격", value: PASS_STATUS.DocumentPassed },
  { label: "면접 탈락", value: PASS_STATUS.InterviewFailed },
  { label: "최종 합격", value: PASS_STATUS.InterviewPassed },
];

export const interviewDates = [
  { label: "3/9", value: "2026-03-09" },
  { label: "3/10", value: "2026-03-10" },
  { label: "3/11", value: "2026-03-11" },
  { label: "3/12", value: "2026-03-12" },
];

export const dateOfWeek = [
  { label: "월", value: "MONDAY" },
  { label: "화", value: "TUESDAY" },
  { label: "수", value: "WEDNESDAY" },
  { label: "목", value: "THURSDAY" },
  { label: "금", value: "FRIDAY" },
  { label: "토", value: "SATURDAY" },
  { label: "일", value: "SUNDAY" },
];

export const interviewTime = [
  { label: "전체", value: "ALL" },
  { label: "18:00 ~ 18:20", value: "18:00:00" },
  { label: "18:25 ~ 18:45", value: "18:25:00" },
  { label: "18:50 ~ 19:10", value: "18:50:00" },
  { label: "19:15 ~ 19:35", value: "19:15:00" },
  { label: "19:40 ~ 20:00", value: "19:40:00" },
  { label: "20:05 ~ 20:25", value: "20:05:00" },
  { label: "20:30 ~ 20:50", value: "20:30:00" },
  { label: "20:55 ~ 21:15", value: "20:55:00" },
  { label: "21:20 ~ 21:40", value: "21:20:00" },
];

export const academicStatus = [
  { label: "재학", value: "ENROLLED" },
  { label: "휴학", value: "ON_LEAVE" },
  { label: "졸업 유예", value: "GRADUATION_DEFERRED" },
  { label: "졸업", value: "GRADUATED" },
];
