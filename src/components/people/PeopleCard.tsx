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
      <div className="w-[240px] h-[240px]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 */}
      <div className="flex flex-col items-center gap-[4px] text-center">
        <p className="font-sogang text-[20px] text-black leading-[140%]">
          {name}
        </p>

        {isPresident ? (
          <>
            <p className="font-pretendard text-[16px] text-black leading-[160%]">
              {cohort}기 멋쟁이사자처럼 {POSITION_LABEL[position]}
            </p>
            <p className="font-pretendard text-[16px] text-black leading-[160%]">
              {PART_LABEL[part]} 운영진
            </p>
          </>
        ) : (
          <p className="font-pretendard text-[16px] text-black leading-[160%]">
            {cohort}기 {PART_LABEL[part]} {POSITION_LABEL[position]}
          </p>
        )}
      </div>
    </div>
  );
};

export default PeopleCard;
