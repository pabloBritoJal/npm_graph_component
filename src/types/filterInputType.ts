export type FilterInput = {
  make?: string;
  model?: string;
  year?: number;
};

export interface FiltersData {
  year: string[];
  make: string[];
  model: string[];
}
