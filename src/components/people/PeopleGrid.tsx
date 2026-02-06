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
        <div className="grid grid-cols-4 gap-[24px] w-fit">
          {Array.from({ length: 12 }).map((_, i) => (
            <PeopleSkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-[120px]">
      <div
        className="
          grid
          grid-cols-4
          gap-x-[24px]
          gap-y-[24px]
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
