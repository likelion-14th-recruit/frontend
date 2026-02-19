import React from "react";

interface CompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompleteModal = ({ isOpen, onClose }: CompleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-pretendard px-[20px]">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* 모달 본체: 이전 모달들과 완벽히 동일한 디자인 시스템 적용 */}
      <div
        className="relative bg-white shadow-xl flex flex-col transition-all 
        /* 너비 설정: 모바일 max 320px, 데스크탑 max 560px */
        w-full max-w-[320px] md:max-w-[560px] 
        /* 모서리 및 패딩 */
        rounded-[12px] md:rounded-[20px] 
        px-[24px] py-[32px] md:px-[40px] md:py-[40px] 
        /* 내부 간격 */
        gap-[32px] md:gap-[40px]"
      >
        {/* 텍스트 영역: 왼쪽 정렬 */}
        <div className="w-full text-left">
          <p className="text-[16px] md:text-[20px] font-normal leading-[160%] text-[#000] whitespace-pre-line break-all">
            멋쟁이사자처럼 서강대 14기 지원이 성공적으로 완료되었습니다.
            지원해주셔서 감사합니다.
          </p>
        </div>

        {/* 버튼 영역: 오른쪽 정렬 */}
        <div className="flex justify-end w-full">
          <button
            onClick={onClose}
            className="flex-1 md:flex-none flex items-center justify-center cursor-pointer transition-all font-semibold text-[14px] md:text-[16px] h-[48px] md:h-[50px] px-[32px] rounded-[8px] md:rounded-[12px] bg-[rgba(18,18,18,0.80)] text-white hover:bg-black whitespace-nowrap"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;
