import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

type modalProps = {
  isOpen: boolean;
  isTwo: boolean;
  children: ReactNode;
  onClose?: () => void;
};

const Modal = ({ isOpen, isTwo, onClose, children }: modalProps) => {
  const navigate = useNavigate();
  const handleAccept = () => {
    onClose;
    navigate("/admin");
  };
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full t-0 l-0 bg-black/60">
      <div className="flex flex-col text-[20px] font-[400] bg-white rounded-[20px] w-[560px] relative px-[40px] py-[24px] gap-[40px]">
        {children}
        {isTwo ? (
          <div className="flex justify-end text-[16px] font-[600] gap-[16px]">
            <button
              className="flex px-[24px] py-[10px] justify-center items-center rounded-[12px] bg-black/80 text-white"
              onClick={onClose}
            >
              문자 발송
            </button>
            <button
              className="flex px-[24px] py-[10px] justify-center items-center rounded-[12px] text-black/80 bg-white border border-black/40"
              onClick={onClose}
            >
              취소
            </button>
          </div>
        ) : (
          <div className="flex justify-end text-[16px] font-[600] gap-[16px]">
            <button
              className="flex px-[24px] py-[10px] justify-center items-center rounded-[12px] bg-black/80 text-white"
              onClick={handleAccept}
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
