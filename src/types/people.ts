// types/people.ts

export type PartType = "FRONTEND" | "BACKEND" | "PRODUCT_DESIGN";

export type PositionType =
  | "PRESIDENT"
  | "VICE_PRESIDENT"
  | "PART_LEADER"
  | "MEMBER";

export type PeopleType = {
  name: string;
  imageUrl: string;
  cohort: number;
  part: PartType;
  position: PositionType;
};

