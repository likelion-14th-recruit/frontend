import PeopleCard from "./PeopleCard";
import type { PeopleType } from "../../types/people";

type PeopleGridProps = {
  people: PeopleType[];
};

const PeopleGrid = ({ people }: PeopleGridProps) => {
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
