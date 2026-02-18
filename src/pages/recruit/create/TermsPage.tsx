import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();

  // 체크박스 상태 관리
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  // 모든 체크박스가 선택되었는지 확인
  const isAllChecked = checked1 && checked2;

  const CheckboxIcon = ({ isChecked }: { isChecked: boolean }) => (
    <div className="w-30 h-30 shrink-0">
      {isChecked ? (
        <img
          src="/recruit/checkbox_on.svg" // public 폴더 기준 경로는 /부터 시작합니다.
          alt="checked"
          width="30"
          height="30"
        />
      ) : (
        <img
          src="/recruit/checkbox_off.svg"
          alt="unchecked"
          width="30"
          height="30"
        />
      )}
    </div>
  );

  return (
    <div
      className="
      flex flex-col mx-auto font-pretendard pb-20
      /* 1. 데스크탑 (1024px 이상) */
      lg:max-w-[800px] lg:gap-8
      /* 2. 태블릿 (769px ~ 1024px) */
      md:w-full md:gap-8 md:px-10
      /* 3. 모바일 (360px ~ 768px) */
      w-full gap-5 px-4 py-5
    "
    >
      {/* 1. 모집 일정 박스 */}
      <div className="bg-[#f2f2f2] rounded-[20px] py-[24px] px-[40px] text-[#333] mobile:py-[20px] mobile:px-[16px]">
        <h2 className="text-[#121212] text-[20px] font-semibold mb-6 flex items-center gap-2 mobile:text-[18px] mobile:mb-4">
          🦁 멋쟁이사자처럼 서강대학교 14기 모집 안내 🦁
        </h2>
        <ul className="flex flex-col gap-3 font-medium text-[16px] mobile:text-[14px] mobile:gap-2">
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
        <p className="mt-6 text-[16px] text-gray-500 mobile:text-[14px] mobile:mt-4">
          * 발표 시간은 추후 변경될 수 있습니다.
        </p>
      </div>

      {/* 2. 주의 사항 박스 */}
      <div className="bg-[#f2f2f2] rounded-[20px] py-[24px] px-[40px] text-[#000] mobile:py-[20px] mobile:px-[16px]">
        <div className="flex flex-col gap-8 text-[16px] leading-relaxed mobile:gap-6">
          {/* 1. 지원 안내 */}
          <div className="flex gap-2">
            <span className="font-bold shrink-0 w-5">1.</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">지원 안내</h3>
              <p className="text-[#121212] mobile:text-[14px]">
                제출 전까지 임시 저장이 가능하며, 제출 후에는 더 이상 수정이
                불가능합니다.
                <br />
                지원서는 다음과 같은 구성으로 되어있습니다. 모든 사항을 빠짐없이
                작성 바랍니다.
              </p>
              <ul className="flex flex-col gap-1 mt-1 ml-4 mobile:text-[14px]">
                <li className="flex gap-2 text-[#121212]">
                  <span className="shrink-0 w-4">a.</span>
                  <span>인적사항 작성</span>
                </li>
                <li className="flex gap-2 text-[#121212]">
                  <span className="shrink-0 w-4">b.</span>
                  <span>지원서 작성</span>
                </li>
                <li className="flex gap-2 text-[#121212]">
                  <span className="shrink-0 w-4">c.</span>
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
              <p className="text-[#121212] mobile:text-[14px]">
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
              <p className="text-[#121212] mobile:text-[14px]">
                OT(3/16), Lion Sprint(3월~6월, 시험기간 제외), 아이디어톤(5월),
                중앙 해커톤(8월), 데모데이(11월) 위 활동들은 모두 필수 참여
                프로그램으로,{" "}
                <span className="font-bold">1년간의 활동을 전제</span>로
                운영되는 멋쟁이사자처럼 서강대학교 14기의 공식 일정입니다.
              </p>
            </div>
          </div>

          {/* 4. 공식 홈페이지, 인스타그램 */}
          <div className="flex gap-2">
            <span className="font-bold shrink-0 w-5">4.</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">공식 홈페이지, 인스타그램</h3>
              <p className="text-[#121212] mobile:text-[14px]">
                서강대학교 멋쟁이사자처럼 공식 홈페이지와 @likelion_sg 공식
                인스타그램에서 다양한 정보를 확인하실 수 있습니다.
              </p>
            </div>
          </div>

          {/* 5. 회비 안내 */}
          <div className="flex gap-2">
            <span className="font-bold shrink-0 w-5">5.</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">회비 안내</h3>
              <p className="text-[#121212] mobile:text-[14px]">
                1년 활동비 6만원
              </p>
            </div>
          </div>

          {/* 6. 문의사항 */}
          <div className="flex gap-2">
            <span className="font-bold shrink-0 w-5">6.</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">문의사항</h3>
              <ul className="flex flex-col gap-1 mt-1 ml-4 text-[#121212] mobile:text-[14px]">
                <li className="flex gap-2">
                  <span className="shrink-0 w-4">a.</span>
                  <span>
                    대표 김지오: 010-6264-7243 | 부대표 이예나, 전해찬
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 w-4">b.</span>
                  <span>인스타그램: @likelion_sg</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 체크박스 영역 */}
      <div className="flex flex-col gap-4 mt-4 mobile:gap-3 mobile:mt-0">
        <div
          className="flex items-center justify-between cursor-pointer group px-2"
          onClick={() => setChecked1(!checked1)}
        >
          <span className="font-bold text-[#333] text-[16px] mobile:text-[14px]">
            상기 내용을 충분히 숙지하였습니다.
          </span>
          <CheckboxIcon isChecked={checked1} />
        </div>
        <div
          className="flex items-center justify-between cursor-pointer group px-2"
          onClick={() => setChecked2(!checked2)}
        >
          <span className="font-bold text-[#333] text-[16px] mobile:text-[14px]">
            멋쟁이사자처럼 서강대학교의 모든 활동에 참여 가능합니다.
          </span>
          <CheckboxIcon isChecked={checked2} />
        </div>
      </div>

      {/* 4. 다음으로 버튼 */}
      <button
        disabled={!isAllChecked}
        onClick={() => navigate("/recruit/info")}
        className={`w-full py-5 rounded-[12px] text-[20px] font-semibold transition-all mt-[60px]
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
