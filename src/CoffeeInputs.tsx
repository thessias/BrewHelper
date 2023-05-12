import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type CoffeeInputsProps = {
  coffeeAmount: number | null;
  technique: Technique;
  ratio: number | null;
  handleCoffeeAmountChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleTechniqueChange: (event: SelectChangeEvent) => void;
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
  const [coffeeAmountWarning, setCoffeeAmountWarning] = useState("");
  const [techniqueWarning, setTechniqueWarning] = useState("");
  const [ratioWarning, setRatioWarning] = useState("");

  useEffect(() => {
    setCoffeeAmountWarning("");
    setTechniqueWarning("");
    setRatioWarning("");

    if (coffeeAmount !== null && ratio !== null) {
      if (coffeeAmount > 100) {
        setCoffeeAmountWarning("You're kidding, right?");
      }

      // V60
      if (technique === "V60" && coffeeAmount > 45 && coffeeAmount <= 100) {
        setCoffeeAmountWarning(
          "Max 45 g of coffee is recommended for V60 (standard)."
        );
      }

      if (technique === "V60" && coffeeAmount < 16) {
        setCoffeeAmountWarning(
          "For 15 g of coffee or less consider the V60 (better 1 cup) technique."
        );
      }
      if (technique === "V60 1 cup" && coffeeAmount > 15) {
        setCoffeeAmountWarning(
          "Max 15 g of coffee is recommended for V60 (better 1 cup)."
        );
      }
      if (
        (technique === "V60" || technique === "V60 1 cup") &&
        (ratio > 60 || ratio < 55)
      ) {
        setRatioWarning("The recommended ratio is 60 g/l.");
      }

      // Chemex
      if (technique === "Chemex" && coffeeAmount > 50 && coffeeAmount <= 100) {
        setCoffeeAmountWarning("Max 50 g of coffee is recommended for Chemex.");
      }
      if (technique === "Chemex" && (ratio > 60 || ratio < 55)) {
        setRatioWarning("The recommended ratio is 60 g/l.");
      }

      // Aeropress - can hold max 300 ml of water
      if (
        technique === "AeroPress" &&
        coffeeAmount > 15 &&
        coffeeAmount <= 100
      ) {
        setCoffeeAmountWarning(
          "Max 15 g of coffee is recommended for AeroPress when using recommended ratio. The capacity is ~300 ml."
        );
      }
      if (technique === "AeroPress" && (ratio > 60 || ratio < 55)) {
        setRatioWarning("The recommended ratio is 55-60 g/l.");
      }

      // French Press
      if (technique === "French Press" && (ratio > 70 || ratio < 60)) {
        setRatioWarning("The recommended ratio is 60-70 g/l.");
      }

      if (
        technique === "French Press" &&
        coffeeAmount > 39 &&
        coffeeAmount <= 100
      ) {
        setCoffeeAmountWarning(
          "Are you sure the needed amount of water will fit into your French Press? They usually have max 600 ml capacity."
        );
      }
    }
  }, [technique, coffeeAmount, ratio]);

  return (
    <Stack direction="column" alignItems="center" rowGap="12px">
      <TextField
        variant="outlined"
        size="medium"
        label="Coffee amount"
        onChange={handleCoffeeAmountChange}
        type="number"
        sx={{
          fontSize: "20px",
        }}
        fullWidth
        InputProps={{
          style: { fontSize: "20px" },
          endAdornment: <InputAdornment position="end">g</InputAdornment>,
        }}
        value={coffeeAmount !== null ? "" + coffeeAmount : ""}
      />
      {coffeeAmountWarning && (
        <Typography variant="caption">{coffeeAmountWarning}</Typography>
      )}
      <FormControl size="medium" fullWidth>
        <InputLabel id="technique-select-label">Technique</InputLabel>
        <Select
          labelId="technique-select-label"
          id="technique-select"
          value={technique}
          label="Technique"
          onChange={handleTechniqueChange}
          sx={{
            fontSize: "20px",
            boxSizing: "border-box",
          }}
          fullWidth
        >
          <MenuItem value="V60">V60 (standard)</MenuItem>
          <MenuItem value="V60 1 cup">V60 (better 1 cup)</MenuItem>
          <MenuItem value="Chemex">Chemex</MenuItem>
          <MenuItem value="AeroPress">AeroPress</MenuItem>
          <MenuItem value="French Press">French Press</MenuItem>
        </Select>
      </FormControl>
      {techniqueWarning && (
        <Typography variant="caption">{techniqueWarning}</Typography>
      )}

      <TextField
        variant="outlined"
        size="medium"
        label="Ratio"
        type="number"
        onChange={handleRatioChange}
        sx={{ fontSize: "20px" }}
        fullWidth
        InputProps={{
          style: { fontSize: "20px" },
          endAdornment: <InputAdornment position="end">g/l</InputAdornment>,
        }}
        value={ratio !== null ? "" + ratio : ""}
      />
      {ratioWarning && (
        <Typography variant="caption">{ratioWarning}</Typography>
      )}
    </Stack>
  );
};

export default CoffeeInputs;
