import type { PeopleType } from "../../types/people";


type PeopleCardProps = {
  person: PeopleType;
};

const POSITION_LABEL: Record<PeopleType["position"], string> = {
  PRESIDENT: "대표",
  VICE_PRESIDENT: "부대표",
  PART_LEADER: "파트장",
  MEMBER: "운영진",
};

const PART_LABEL: Record<PeopleType["part"], string> = {
  FRONTEND: "FE",
  BACKEND: "BE",
  PRODUCT_DESIGN: "DE",
};

const PeopleCard = ({ person }: PeopleCardProps) => {
  const { name, imageUrl, cohort, part, position } = person;

  const isPresident =
    position === "PRESIDENT" || position === "VICE_PRESIDENT";

  return (
    <div className="flex flex-col items-center gap-[24px]">
      {/* 이미지 */}
      <div className="

      
        w-[160px]
        h-[160px]
        
        r-820-1099:w-[240px] 
        r-820-1099:h-[240px]

        r-1100-up:w-[240px] 
        r-1100-up:h-[240px]
        ">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 */}
      <div className="flex flex-col items-center text-center">
        <p className="font-sogang 
          text-[20px] 

          mt-[4px]
          mb-[4px]
          r-820-1099:mt-[12px]
          r-820-1099:mb-[8px]
          r-1100-up:mt-[12px]
          r-1100-up:mb-[8px]
          
          text-black leading-[140%]">
          {name}
        </p>

        {isPresident ? (
          <>
            <p className="font-pretendard 
              text-[14px]
              r-820-1099:text-[16px]  
              r-1100-up:text-[16px] 
              text-black leading-[160%]">
              {cohort}기 멋쟁이사자처럼 {POSITION_LABEL[position]}
            </p>
            <p className="font-pretendard 
              text-[14px]
              r-820-1099:text-[16px]  
              r-1100-up:text-[16px] 
              text-black leading-[160%]

              mb-[4px]
              r-820-1099:mb-[20px]
              r-1100-up:mb-[20px]
              ">
              {PART_LABEL[part]} 운영진
            </p>
          </>
        ) : (
          <p className="font-pretendard 
            text-[14px]
            r-820-1099:text-[16px]  
            r-1100-up:text-[16px] 
            text-black leading-[160%]">
            {cohort}기 {PART_LABEL[part]} {POSITION_LABEL[position]}
          </p>
        )}
      </div>
    </div>
  );
};

export default PeopleCard;
