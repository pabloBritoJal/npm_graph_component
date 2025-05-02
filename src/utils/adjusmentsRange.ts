export type RangeFilter = {
  id: string;
  from: number;
  to: number;
};

export const adjustmentRanges: RangeFilter[] = [
  { id: "range-1", from: 110, to: 120 },
  { id: "range-2", from: 105, to: 110 },
  { id: "range-3", from: 95, to: 105 },
  { id: "range-4", from: 90, to: 95 },
  { id: "range-5", from: 80, to: 90 },
];
