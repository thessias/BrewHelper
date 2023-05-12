import React from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";

type CoffeeInputsProps = {
  coffeeAmount: number | null;
  technique: string;
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
  return (
    <Stack
      direction="column"
      alignItems="center"
      rowGap="24px"
      sx={{
        padding: "12px",
      }}
    >
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
    </Stack>
  );
};

export default CoffeeInputs;
