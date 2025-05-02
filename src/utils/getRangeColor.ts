import { Color } from "three";

const RANGE_1 = "#FE6F61";
const RANGE_2 = "#FEAE51";
const RANGE_3 = "#45B7A9";
const RANGE_4 = "#B19CD9";
const RANGE_5 = "#9C0F5F";
const RANGE_DEFAULT = "#9C0F5F";

export const getColorByAdjustment = (adjustment: number) => {
  if (adjustment > 110 && adjustment <= 120) return new Color(RANGE_1);
  if (adjustment > 105 && adjustment <= 110) return new Color(RANGE_2);
  if (adjustment > 95 && adjustment <= 105) return new Color(RANGE_3);
  if (adjustment > 90 && adjustment <= 95) return new Color(RANGE_4);
  if (adjustment > 80 && adjustment <= 90) return new Color(RANGE_5);
  return new Color(RANGE_DEFAULT);
};
