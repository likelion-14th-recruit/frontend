import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: React.ReactNode;
  confirmText?: string; // "계속 진행" 등 (흰색 버튼)
  cancelText?: string; // "취소" 등 (검정색 버튼)
  isSingleButton?: boolean;
  isInfoPage?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "계속 진행",
  cancelText = "취소",
  isSingleButton = false,
  isInfoPage = false,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center font-pretendard">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`
        relative bg-white rounded-[12px] gap-[20px] md:gap-[40px] md:rounded-[20px] shadow-xl flex flex-col transition-all 
        w-full max-w-[320px] md:max-w-[560px] px-[20px] py-[24px] md:px-[40px] md:py-[24px]
      `}
      >
        <div className="w-full text-left text-[16px] md:text-[20px] font-normal leading-[140%] text-[#000] whitespace-pre-line">
          {message}
        </div>

        <div className="flex justify-end gap-[12px] md:gap-[16px] w-full">
          {!isSingleButton && (
            /* 🔥 취소 버튼: 검은색 배경 (사용자를 머무르게 유도) */
            <button
              onClick={onClose}
              className="cursor-pointer transition-all font-semibold text-[14px] md:text-[16px] px-[24px] py-[10px] rounded-[8px] md:rounded-[12px] bg-[rgba(18,18,18,0.80)] text-white hover:bg-black"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`cursor-pointer transition-all font-semibold text-[14px] md:text-[16px] px-[24px] py-[10px] rounded-[8px] md:rounded-[12px] border ${
              isSingleButton
                ? "bg-[rgba(18,18,18,0.80)] text-white hover:bg-black" // 버튼 하나일 땐 검은색
                : "bg-white border-[rgba(18,18,18,0.40)] text-[rgba(18,18,18,0.80)] hover:bg-gray-50" // 버튼 두 개일 땐 흰색
            }`}
          >
            {isSingleButton ? "확인" : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
