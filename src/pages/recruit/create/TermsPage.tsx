import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();

  // 체크박스 상태 관리
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  // 모든 체크박스가 선택되었는지 확인
  const isAllChecked = checked1 && checked2;

  return (
    <div className="flex flex-col gap-10 max-w-[800px] mx-auto pb-20 font-pretendard">
      {/* 1. 모집 일정 박스 */}
      <div className="bg-[#f2f2f2] rounded-[20px] py-[24px] px-[40px] text-[#333]">
        <h2 className="text-[#121212] text-[20px] font-medium mb-6 flex items-center gap-2">
          🦁 멋쟁이사자처럼 서강대학교 14기 모집 안내 🦁
        </h2>
        <ul className="flex flex-col gap-3 font-medium text-[16px]">
          <li>
            📌 <span className="font-bold">서류 모집 기간 :</span> 2월 21일(토)
            12:00 ~ 3월 5일(목) 23:59
          </li>
          <li>
            📌 <span className="font-bold">서류 합격 발표 :</span> 3월 7일(토)
            18:00
          </li>
          <li>
            📌 <span className="font-bold">면접 기간 :</span> 3월 9일(월) ~ 3월
            12일(목) 18:00 ~ 22:00
          </li>
          <li>
            📌 <span className="font-bold">최종 합격 발표 :</span> 3월 14일(토)
            18:00
          </li>
          <li>
            📌 <span className="font-bold">활동 기간 :</span> 3월 ~ 12월
          </li>
          <li>
            📌 <span className="font-bold">OT (필참) :</span> 3월 16일(월)
          </li>
        </ul>
        <p className="mt-6 text-[16px] text-gray-500">
          * 발표 시간은 추후 변경될 수 있습니다.
        </p>
      </div>

      {/* 2. 주의 사항 박스 */}
      <div className="bg-[#f2f2f2] rounded-[20px] py-[24px] px-[40px] text-[#000]">
        <div className="flex flex-col gap-8 text-[15px] leading-relaxed">
          {/* 1. 지원 안내 */}
          <div className="flex gap-2">
            <span className="font-bold shrink-0 w-5">1.</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">지원 안내</h3>
              <p className="text-[#121212]">
                제출 전까지 임시 저장이 가능하며, 제출 후에는 더 이상 수정이
                불가능합니다.
                <br />
                지원서는 다음과 같은 구성으로 되어있습니다. 모든 사항을 빠짐없이
                작성 바랍니다.
              </p>
              <ul className="flex flex-col gap-1 mt-1 ml-4">
                <li className="flex gap-2 text-[#121212]">
                  <span className="shrink-0 w-4 text-[15px]">a.</span>
                  <span>인적사항 작성</span>
                </li>
                <li className="flex gap-2 text-[#121212]">
                  <span className="shrink-0 w-4 text-[15px]">b.</span>
                  <span>지원서 작성</span>
                </li>
                <li className="flex gap-2 text-[#121212]">
                  <span className="shrink-0 w-4 text-[15px]">c.</span>
                  <span>면접 가능 시간 선택 및 지원서 제출</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. 면접 촬영 및 개인정보 수집 안내 */}
          <div className="flex gap-2">
            <span className="font-bold shrink-0 w-5">2.</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">면접 촬영 및 개인정보 수집 안내</h3>
              <p className="text-[#121212]">
                면접은 대면으로 진행되며, 공정한 면접 평가를 위해 면접 내용을
                촬영 및 수집할 예정입니다. 수집한 면접 영상은 선발 과정에서만
                활용되며, 최종 선발 이후 즉시 폐기됩니다.
              </p>
            </div>
          </div>

          {/* 3. 필수 활동 안내 */}
          <div className="flex gap-2">
            <span className="font-bold shrink-0 w-5">3.</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">필수 활동 안내</h3>
              <p className="text-[#121212]">
                OT(3/16), Lion Sprint(3월~6월, 시험기간 제외), 아이디어톤(5월),
                중앙 해커톤(8월), 데모데이(11월) 위 활동들은 모두 필수 참여
                프로그램으로,{" "}
                <span className="font-bold">1년간의 활동을 전제</span>로
                운영되는 멋쟁이사자처럼 서강대학교 14기의 공식 일정입니다. 모든
                활동에 성실히 참여하신 분에 한해 수료증이 발급됩니다.
              </p>
            </div>
          </div>

          {/* 4. 공식 홈페이지, 인스타그램 */}
          <div className="flex gap-2">
            <span className="font-bold shrink-0 w-5">4.</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">공식 홈페이지, 인스타그램</h3>
              <p className="text-[#121212]">
                서강대학교 멋쟁이사자처럼 공식 홈페이지와 @likelion_sg 공식
                인스타그램에서 커리큘럼, 활동 일정 등 다양한 정보를 확인하실 수
                있습니다.
              </p>
            </div>
          </div>

          {/* 5. 회비 안내 */}
          <div className="flex gap-2">
            <span className="font-bold shrink-0 w-5">5.</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">회비 안내</h3>
              <p className="text-[#121212]">1년 활동비 6만원</p>
            </div>
          </div>

          {/* 6. 문의사항 */}
          <div className="flex gap-2">
            <span className="font-bold shrink-0 w-5">6.</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">문의사항</h3>
              <ul className="flex flex-col gap-1 mt-1 ml-4 text-[#121212]">
                <li className="flex gap-2">
                  <span className="shrink-0 w-4 text-[15px]">a.</span>
                  <span>
                    대표 김지오: 010-6264-7243 | 부대표 이예나: 010-9338-5848,
                    전해찬: 010-3076-2799
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 w-4 text-[15px]">b.</span>
                  <span>인스타그램: @likelion_sg</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 체크박스 영역 */}
      <div className="flex flex-col gap-4 mt-4">
        <label className="flex items-center justify-between cursor-pointer group px-2">
          <span className="font-bold text-[#333] text-[16px]">
            상기 내용을 충분히 숙지하였습니다.
          </span>
          <input
            type="checkbox"
            checked={checked1}
            onChange={() => setChecked1(!checked1)}
            className="w-6 h-6 accent-[#000] cursor-pointer"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer group px-2">
          <span className="font-bold text-[#333] text-[16px]">
            멋쟁이사자처럼 서강대학교의 모든 활동에 참여 가능합니다.
          </span>
          <input
            type="checkbox"
            checked={checked2}
            onChange={() => setChecked2(!checked2)}
            className="w-6 h-6 accent-[#000] cursor-pointer"
          />
        </label>
      </div>

      {/* 4. 다음으로 버튼 */}
      <button
        disabled={!isAllChecked}
        onClick={() => navigate("/recruit/info")}
        className={`w-full py-5 rounded-[15px] text-xl font-bold transition-all
          ${
            isAllChecked
              ? "bg-[#000] text-white cursor-pointer hover:bg-[#222]"
              : "bg-[#ccc] text-white cursor-not-allowed"
          }`}
      >
        다음으로
      </button>
    </div>
  );
};

export default TermsPage;
