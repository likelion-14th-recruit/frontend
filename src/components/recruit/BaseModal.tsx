import React from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // 메시지 내용
  buttons: React.ReactNode; // 버튼 영역 (상황에 따라 1개 혹은 2개)
}

const BaseModal = ({ isOpen, onClose, children, buttons }: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-pretendard p-4">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 본체: 반응형 대응(max-w-px 대신 w-full max-w 활용) */}
      <div
        className="relative bg-white rounded-[30px] shadow-xl transition-all flex flex-col w-full max-w-[560px]"
        style={{ padding: "40px", gap: "40px" }}
      >
        {/* 텍스트 영역: 왼쪽 정렬 */}
        <div className="w-full text-left text-[19px] sm:text-[20px] font-normal leading-[160%] text-[#000] whitespace-pre-line">
          {children}
        </div>

        {/* 버튼 영역: 오른쪽 정렬 */}
        <div className="flex justify-end gap-3 w-full">{buttons}</div>
      </div>
    </div>
  );
};

export default BaseModal;
