import React from "react";

interface CompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompleteModal = ({ isOpen, onClose }: CompleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-pretendard">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* 모달 본체: SubmitModal과 디자인 통일 */}
      <div
        className="relative bg-white rounded-[30px] shadow-2xl transition-all"
        style={{
          display: "flex",
          width: "560px",
          padding: "40px",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* 텍스트: 왼쪽 정렬 */}
        <div className="w-full text-left">
          <p className="text-[19px] font-normal leading-[160%] text-[#000]">
            멋쟁이사자처럼 서강대 14기 지원이 성공적으로 완료되었습니다.
            <br />
            지원해주셔서 감사합니다.
          </p>
        </div>

        {/* 버튼 영역: 오른쪽 정렬 */}
        <div className="flex justify-end w-full">
          <button
            onClick={onClose}
            style={{
              display: "flex",
              height: "50px",
              padding: "10px 32px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12px",
              background: "rgba(18, 18, 18, 0.80)",
              color: "#FFF",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            className="hover:bg-[#000] transition-all cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;
