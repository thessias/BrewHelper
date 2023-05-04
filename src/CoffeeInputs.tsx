import React from "react";
import "./App.css";

type CoffeeInputsProps = {
  coffeeAmount: number | null;
  technique: string;
  ratio: number | null;
  handleCoffeeAmountChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleTechniqueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleRatioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CoffeeInputs = (props: CoffeeInputsProps) => {
  const {
    coffeeAmount,
    technique,
    ratio,
    handleCoffeeAmountChange,
    handleTechniqueChange,
    handleRatioChange,
  } = props;
  return (
    <>
      <label className="label">
        Coffee amount (g):
        <input
          className="input"
          type="number"
          step="0.1"
          value={coffeeAmount ?? ""}
          onChange={handleCoffeeAmountChange}
        />
      </label>
      <label className="label">
        Technique:
        <select
          className="select"
          value={technique}
          onChange={handleTechniqueChange}
        >
          <option value="V60">V60 (standard)</option>
          <option value="V60 1 cup">V60 (better 1 cup)</option>
          <option value="Chemex">Chemex</option>
          <option value="AeroPress">AeroPress</option>
          <option value="French Press">French Press</option>
        </select>
      </label>
      <label className="label">
        Ratio (g/l):
        <input
          className="input"
          type="number"
          step="0.1"
          value={ratio !== null ? "" + ratio : ""}
          onChange={handleRatioChange}
        />
      </label>
    </>
  );
};

export default CoffeeInputs;
