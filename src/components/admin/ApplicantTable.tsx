import { useNavigate } from "react-router-dom";
import {
  academicStatus,
  applyParts,
  passStates,
} from "../../constants/adminFilter";

interface Applicant {
  applicationPublicId?: string;
  name: string;
  studentNumber: string;
  phoneNumber: string;
  part: string;
  passStatus: string;
  academicStatus: string;
}

interface TableProps {
  data?: Applicant[];
  isLoading: boolean;
}

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH;

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
      <table className="w-full border-collapse table-fixed">
        <colgroup>
          <col className="w-[70px]" />
          <col className="w-[72px]" />
          <col className="w-[60px]" />
          <col className="w-[125px]" />
          <col className="w-[74px]" />
          <col className="w-[60px]" />
        </colgroup>

        <thead>
          <tr className="bg-lightGray text-black/80 text-[14px] font-[550]">
            <th className="py-[8px] pl-[12px] pr-[20px] text-center">이름</th>
            <th className="py-[8px] px-[20px] text-center">학번</th>
            <th className="py-[8px] px-[20px] text-center">학적 상태</th>
            <th className="py-[8px] px-[20px] pr-auto flex justify-start">
              <div className="w-[125px] mr-auto text-center whitespace-nowrap">
                전화 번호
              </div>
            </th>
            <th className="py-[8px] px-[20px] text-center">지원 분야</th>
            <th className="py-[8px] text-center pl-[20px] pr-[12px]">
              지원 결과
            </th>
          </tr>
        </thead>

        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className="flex w-full py-[200px] items-center justify-center text-[16px] font-[350] text-center border-b border-b-lightGray">
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
                  className="border-b border-lightGray font-[350] text-[16px] cursor-pointer hover:bg-lightGray/50 duration-200"
                  onClick={() =>
                    navigate(`/${ADMIN_PATH}/${item.applicationPublicId}`)
                  }
                >
                  <td className="py-[8px] pl-[12px] pr-[20px] text-center text-black">
                    {item.name}
                  </td>
                  <td className="py-[8px] px-[20px] text-center text-black">
                    {item.studentNumber}
                  </td>
                  <td className="py-[8px] px-[20px] text-center text-black">
                    {academicStatus.find(
                      (i) => i.value === item?.academicStatus
                    )?.label ?? "-"}
                  </td>
                  <td className="py-[8px] px-[20px] pr-auto flex justify-start text-black">
                    <div className="w-[125px] mr-auto text-center whitespace-nowrap">
                      {item.phoneNumber.replace(
                        /^(\d{2,3})(\d{3,4})(\d{4})$/,
                        `$1-$2-$3`
                      )}
                    </div>
                  </td>
                  <td className="py-[8px] px-[20px] text-center text-black">
                    {partLabel}
                  </td>
                  <td
                    className={`py-[8px] text-center pl-[20px] pr-[12px] ${getStatusStyle(
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
                <div className="flex w-full py-[200px] items-center justify-center text-[16px] font-[350] text-center border-b border-b-lightGray">
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
