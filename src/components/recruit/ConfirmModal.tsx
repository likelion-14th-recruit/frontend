import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void; // 취소 (모달 닫기)
  onConfirm: () => void; // 확인 (이전 단계로 이동)
  message: React.ReactNode;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center font-pretendard">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 본체: width 560 고정 및 주신 수치 반영 */}
      <div
        className="relative bg-white rounded-[30px] shadow-xl flex flex-col transition-all"
        style={{
          width: "560px",
          padding: "24px 40px",
          gap: "40px",
        }}
      >
        {/* 메시지: 왼쪽 정렬 */}
        <div className="w-full text-left">
          <div className="text-[20px] font-normal leading-[150%] text-[#000]">
            {message}
          </div>
        </div>

        {/* 버튼 영역: 오른쪽 정렬 */}
        <div className="flex justify-end gap-3 w-full">
          {/* 취소 (Black-80) */}
          <button
            onClick={onClose}
            style={{
              height: "50px",
              padding: "10px 24px",
              borderRadius: "12px",
              background: "rgba(18, 18, 18, 0.80)",
              color: "#FFF",
              fontWeight: "semibold",
              fontSize: "16px",
            }}
            className="cursor-pointer hover:bg-black transition-all"
          >
            취소
          </button>

          {/* 계속 진행 (흰색/테두리) */}
          <button
            onClick={onConfirm}
            style={{
              height: "50px",
              padding: "10px 24px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              background: "#FFF",
              color: "#333",
              fontWeight: "semibold",
              fontSize: "16px",
            }}
            className="cursor-pointer hover:bg-gray-50 transition-all"
          >
            계속 진행
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
