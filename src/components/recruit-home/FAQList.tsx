import React from "react";

import type { FAQ } from "../../types/faq";
import FAQItem from "./FAQItem";

const faqList: FAQ[] = [
  {
    question: "멋쟁이사자처럼 공식 활동은 언제인가요?",
    answer:
      "멋쟁이사자처럼은 1학기 동안 월·수 오후 7시~9시 정기 교육 세션을 통해 각 파트별 교육을 받게 됩니다. 이후 아이디어톤, 해커톤, 데모데이 등 다양한 프로젝트 경험을 통해 실전 중심의 개발 역량을 기르실 수 있습니다. 활동 특성상 매주 정기적인 참여가 어려운 경우 최종 선발이 어려울 수 있으니, 지원 전 개인 일정 및 학업 병행 가능 여부를 충분히 고려해 주시기 바랍니다.",
  },
  {
    question: "2학기에도 리크루팅을 진행하나요?",
    answer:
      "멋쟁이사자처럼의 최소 활동 단위는 1년(두 학기 연속 활동)으로, 리크루팅은 1학기에만 진행됩니다. 2학기에는 기존 기수원들이 데모데이에 집중하는 기간으로, 추가 모집은 진행하지 않으니 지원 시기를 꼭 확인해 주세요.",
  },
  {
    question: "동아리 참여에 학년 제한이 있나요?",
    answer:
      "멋쟁이사자처럼 서강대학교는 학년이나 재학/휴학 여부와 관계없이 모든 서강대 학우분들께 열려 있습니다. 1년 동안 열정적이고 성실하게 활동하실 준비가 된 분이라면 누구든 환영합니다!",
  },
  {
    question: "트랙간 중복지원이 가능한가요?",
    answer:
      "트랙 간 중복 지원은 불가능합니다. 중복 지원 시 모든 지원 사항이 무효 처리될 수 있으므로, 지원 전 본인에게 가장 적합한 트랙을 신중히 확인하시어 하나의 트랙에만 지원해 주시기 바랍니다.",
  },
  {
    question: "면접은 어떻게 진행되나요?",
    answer:
      "14기 아기사자 면접은 대면으로 진행됩니다. 서류 합격자에 한해 면접 일시와 장소를 개별 안내드릴 예정입니다.",
  },
  {
    question: "동아리 관련 문의는 어디로 하나요?",
    answer:
      "궁금한 점이 있으시면 멋쟁이사자처럼 서강대학교 공식 인스타그램(@likelion_sg) DM으로 편하게 문의해 주세요.",
  },
];

const FAQList = () => {
  return (
    <div className="flex flex-col gap-[16px] md:gap-[24px]">
      {faqList.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQList;
