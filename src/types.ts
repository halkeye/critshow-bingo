export type Character = {
  id: string;
  name: string;
  squares: string[];
};

export type Square = {
  idx: number;
  selected: boolean;
};
