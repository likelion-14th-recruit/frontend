import React from "react";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SubmitModal = ({ isOpen, onClose, onConfirm }: SubmitModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-pretendard">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 🛠️ 모달 본체: 주신 CSS 수치 그대로 반영 */}
      <div
        className="relative bg-white rounded-[30px] shadow-xl transition-all"
        style={{
          display: "flex",
          width: "560px",
          padding: "24px 40px",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px", // 텍스트와 버튼 영역 사이의 간격
        }}
      >
        {/* 텍스트 영역: 왼쪽 정렬을 위해 w-full 추가 */}
        <div className="w-full text-left">
          <p className="text-[20px] font-normal leading-[150%] text-[#000]">
            지원서를 제출하면 이후에는 수정할 수 없습니다.
            <br />
            제출하시겠습니까?
          </p>
        </div>

        {/* 버튼 영역: 오른쪽 정렬 */}
        <div className="flex justify-end gap-3 w-full">
          {/* 계속 진행 (검은색 80%) */}
          <button
            onClick={onClose}
            style={{
              display: "flex",
              height: "50px",
              padding: "10px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "12px",
              background: "rgba(18, 18, 18, 0.80)",
              color: "#FFF",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            className="hover:opacity-90 transition-all cursor-pointer"
          >
            계속 진행
          </button>

          {/* 제출 (흰색/테두리) */}
          <button
            onClick={onConfirm}
            style={{
              display: "flex",
              height: "50px",
              padding: "10px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              background: "#FFF",
              color: "#333",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            className="hover:bg-gray-50 transition-all cursor-pointer"
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
