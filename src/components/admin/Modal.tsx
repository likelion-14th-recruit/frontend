import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

type modalProps = {
  isOpen: boolean;
  isTwo: boolean;
  onClose: () => void;
  children: ReactNode;
  onConfirm?: () => Promise<ConfirmResult>;
};

type ConfirmResult =
  | { ok: true; message?: string }
  | { ok: false; message?: string };

type View = "confirm" | "result";

const Modal = ({ isOpen, isTwo, onClose, onConfirm, children }: modalProps) => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("confirm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ConfirmResult | null>(null);

  const handleAccept = () => {
    setView("confirm");
    setResult(null);
    setIsSubmitting(false);
    onClose();
    navigate("/admin79182e7i8-jd8h229jdkfj37r8x90");
  };

  const handleConfirm = async () => {
    if (!onConfirm) return;
    setIsSubmitting(true);
    const res = await onConfirm();
    setResult(res);
    setView("result");
    setIsSubmitting(false);
  };

  const handleResultOk = () => {
    if (result?.ok) {
      setView("confirm");
      setResult(null);
      onClose();
      navigate("/admin79182e7i8-jd8h229jdkfj37r8x90");
      return;
    }
    setView("confirm");
    setResult(null);
  };

  const handleClose = () => {
    setView("confirm");
    setResult(null);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full t-0 l-0 bg-black/60">
      <div className="flex flex-col text-[20px] font-[400] bg-white rounded-[20px] w-[560px] relative px-[40px] py-[24px] gap-[40px]">
        {view === "confirm"
          ? children
          : result?.message ??
            (result?.ok
              ? "문자 발송이 완료되었습니다."
              : "문자 발송에 실패했습니다.")}
        {isTwo ? (
          view === "confirm" ? (
            <div className="flex justify-end text-[16px] font-[600] gap-[16px]">
              <button
                className="flex px-[24px] py-[10px] justify-center items-center rounded-[12px] bg-black/80 text-white disabled:opacity-50"
                onClick={handleConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? "발송 중..." : "문자 발송"}
              </button>
              <button
                className="flex px-[24px] py-[10px] justify-center items-center rounded-[12px] text-black/80 bg-white border border-black/40 disabled:opacity-50"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                취소
              </button>
            </div>
          ) : (
            <div className="flex justify-end text-[16px] font-[600] gap-[16px]">
              <button
                className="flex px-[24px] py-[10px] justify-center items-center rounded-[12px] bg-black/80 text-white"
                onClick={handleResultOk}
              >
                확인
              </button>
            </div>
          )
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
