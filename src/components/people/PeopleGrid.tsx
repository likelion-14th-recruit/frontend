import PeopleCard from "./PeopleCard";
import type { PeopleType } from "../../types/people";
import PeopleSkeletonCard from "./PeopleSkeletonCard";

type PeopleGridProps = {
  people: PeopleType[];
  isLoading: boolean;
};

const PeopleGrid = ({ people, isLoading }: PeopleGridProps) => {

    if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="
          grid 
          grid-cols-2
          r-600-768:grid-cols-3
          r-769-819:grid-cols-3
          r-820-1099:grid-cols-3
          r-1100-up:grid-cols-4
          gap-[24px] 
          w-fit">
          {Array.from({ length: 12 }).map((_, i) => (
            <PeopleSkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center 
      mb-[40px]
      r-769-819:mb-[120px]
      r-820-1099:mb-[120px]
      r-1100-up:mb-[120px]
      ">
      <div
        className="
          grid 
          grid-cols-2

          r-600-768:grid-cols-3
          r-769-819:grid-cols-3
          r-820-1099:grid-cols-3
          r-1100-up:grid-cols-4

          gap-[8px]
          r-600-768:gap-[16px]
          r-769-819:gap-[16px]
          r-820-1099:gap-[24px] 
          r-1100-up:gap-[24px] 

          w-fit
        "
      >
        {people.map((person) => (
          <PeopleCard key={person.name} person={person} />
        ))}
      </div>
    </div>
  );
};


export default PeopleGrid;
