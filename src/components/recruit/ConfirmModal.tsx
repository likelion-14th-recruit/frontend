import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: React.ReactNode;
  confirmText?: string; // "계속 진행" 등 (흰색 버튼)
  cancelText?: string; // "취소" 등 (검정색 버튼)
  isSingleButton?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "계속 진행",
  cancelText = "취소",
  isSingleButton = false,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center font-pretendard p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className="relative bg-white rounded-[30px] shadow-xl flex flex-col transition-all w-full max-w-[560px]"
        style={{ padding: "24px 40px", gap: "40px" }}
      >
        <div className="w-full text-left text-[20px] font-normal leading-[150%] text-[#000] whitespace-pre-line">
          {message}
        </div>

        <div className="flex justify-end gap-3 w-full">
          {!isSingleButton && (
            /* 🔥 취소 버튼: 검은색 배경 (사용자를 머무르게 유도) */
            <button
              onClick={onClose}
              className="cursor-pointer transition-all font-semibold text-[16px] h-[50px] px-6 rounded-[12px] bg-[rgba(18,18,18,0.80)] text-white hover:bg-black"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`cursor-pointer transition-all font-semibold text-[16px] h-[50px] px-6 rounded-[12px] border ${
              isSingleButton
                ? "bg-[rgba(18,18,18,0.80)] text-white hover:bg-black" // 버튼 하나일 땐 검은색
                : "bg-white border-[#ccc] text-[#333] hover:bg-gray-50" // 버튼 두 개일 땐 흰색
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
