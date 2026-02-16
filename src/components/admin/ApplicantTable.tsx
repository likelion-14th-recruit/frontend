import { useNavigate } from "react-router-dom";
import { applyParts, passStates } from "../../constants/adminFilter";

interface Applicant {
  applicationPublicId?: string;
  name: string;
  studentNumber: string;
  phoneNumber: string;
  part: string;
  passStatus: string;
}

interface TableProps {
  data?: Applicant[];
  isLoading: boolean;
}

const ApplicantTable = ({ data = [], isLoading }: TableProps) => {
  const navigate = useNavigate();
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "INTERVIEW_PASSED":
        return "text-sogang";
      case "DOCUMENT_PASSED":
        return "text-purple";
      case "INTERVIEW_FAILED":
      case "DOCUMENT_FAILED":
        return "text-black/60";
      default:
        return "text-black";
    }
  };

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-lightGray text-black/80 text-[14px] font-[600]">
            <th className="py-[8px] text-center font-medium w-[15%]">이름</th>
            <th className="py-[8px] text-center font-medium w-[15%]">학번</th>
            <th className="py-[8px] text-center font-medium w-[15%]">
              학적 상태
            </th>
            <th className="py-[8px] text-center font-medium w-[25%]">
              전화 번호
            </th>
            <th className="py-[8px] text-center font-medium w-[15%]">
              지원 분야
            </th>
            <th className="py-[8px] text-center font-medium w-[15%]">
              지원 결과
            </th>
          </tr>
        </thead>

        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className="flex w-full py-[200px] items-center justify-center text-[16px] font-[400] text-center border-b border-b-lightGray">
                  불러오는 중...
                </div>
              </td>
            </tr>
          </tbody>
        ) : data.length > 0 ? (
          <tbody>
            {data.map((item) => {
              const partLabel =
                applyParts.find((i) => i.value === item.part)?.label ?? "-";

              const statusLabel =
                passStates.find((i) => i.value === item.passStatus)?.label ??
                "-";

              return (
                <tr
                  key={item.applicationPublicId}
                  className="border-b border-lightGray text-[15px] cursor-pointer hover:bg-lightGray/50 duration-200"
                  onClick={() => navigate(`/admin/${item.applicationPublicId}`)}
                >
                  <td className="py-[10px] font-[400] text-center text-black">
                    {item.name}
                  </td>
                  <td className="py-[10px] font-[400] text-center text-black">
                    {item.studentNumber}
                  </td>
                  <td className="py-[10px] font-[400] text-center text-black">
                    재학
                  </td>
                  <td className="py-[10px] font-[400] text-center text-black">
                    {item.phoneNumber.replace(
                      /^(\d{2,3})(\d{3,4})(\d{4})$/,
                      `$1-$2-$3`
                    )}
                  </td>
                  <td className="py-[10px] font-[400] text-center text-black">
                    {partLabel}
                  </td>
                  <td
                    className={`py-[10px] font-[400] text-center ${getStatusStyle(
                      item.passStatus
                    )}`}
                  >
                    {statusLabel}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className="flex w-full py-[200px] items-center justify-center text-[16px] font-[400] text-center border-b border-b-lightGray">
                  검색 조건에 해당하는 지원자가 없습니다.
                  <br />
                  필터 또는 검색 조건을 변경해 주세요.
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ApplicantTable;
