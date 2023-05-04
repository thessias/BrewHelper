declare global {
  type Technique =
    | "V60"
    | "V60 1 cup"
    | "Chemex"
    | "AeroPress"
    | "French Press";
  type Times = number[];
  type Amounts = string[];
}

export {};
