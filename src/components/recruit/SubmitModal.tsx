interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SubmitModal = ({ isOpen, onClose, onConfirm }: SubmitModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-pretendard px-[20px]">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 본체: ConfirmModal과 동일한 반응형 수치 적용 */}
      <div
        className="relative bg-white shadow-xl flex flex-col transition-all 
        /* 너비 설정: 모바일 max 320px, 데스크탑 max 560px */
        w-full max-w-[320px] md:max-w-[560px] 
        /* 모서리 및 패딩 */
        rounded-[12px] md:rounded-[20px] 
        px-[24px] py-[32px] md:px-[40px] md:py-[40px] 
        /* 내부 간격 (텍스트와 버튼 사이) */
        gap-[32px] md:gap-[40px]"
      >
        {/* 텍스트 영역: 왼쪽 정렬 확실히 고정 */}
        <div className="w-full text-left">
          <p className="text-[16px] md:text-[20px] font-normal leading-[150%] text-[#000] whitespace-pre-line break-all">
            지원서를 제출하면 이후에는 수정할 수 없습니다.
            <br />
            제출하시겠습니까?
          </p>
        </div>

        {/* 버튼 영역: 오른쪽 정렬 및 반응형 간격 */}
        <div className="flex justify-end gap-[12px] md:gap-[16px] w-full">
          {/* 계속 진행 (검은색 80%) */}
          <button
            onClick={onClose}
            className="flex-1 md:flex-none flex items-center justify-center cursor-pointer transition-all font-semibold text-[14px] md:text-[16px] h-[48px] md:h-[50px] px-[20px] md:px-[24px] rounded-[8px] md:rounded-[12px] bg-[rgba(18,18,18,0.80)] text-white hover:bg-black whitespace-nowrap"
          >
            계속 진행
          </button>

          {/* 제출 (흰색/테두리) */}
          <button
            onClick={onConfirm}
            className="flex-1 md:flex-none flex items-center justify-center cursor-pointer transition-all font-semibold text-[14px] md:text-[16px] h-[48px] md:h-[50px] px-[20px] md:px-[24px] rounded-[8px] md:rounded-[12px] border border-[rgba(18,18,18,0.40)] bg-white text-[rgba(18,18,18,0.80)] hover:bg-gray-50 whitespace-nowrap"
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
