import {
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { color_primary_vanilla, color_secondary_tiffany_blue } from "./theme";

const PPMForm: React.FC = () => {
  const [concentratePPM, setConcentratePPM] = useState<number | undefined>(
    undefined
  );
  const [diluentPPM, setDiluentPPM] = useState<number | undefined>(undefined);
  const [targetPPM, setTargetPPM] = useState<number | undefined>(undefined);
  const [targetVolume, setTargetVolume] = useState<number | undefined>(
    undefined
  );
  const [concentrateVolume, setConcentrateVolume] = useState<
    number | undefined
  >(undefined);
  const [diluentVolume, setDiluentVolume] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (
      concentratePPM !== undefined &&
      diluentPPM !== undefined &&
      targetPPM !== undefined &&
      targetVolume !== undefined
    ) {
      // CV = (EC * EV - DC * DV) / CC
      const newConcentrateVolume =
        (targetVolume * (targetPPM - diluentPPM)) /
        (concentratePPM - diluentPPM);

      // DV = (CC * EV - EC * EV) / (DC - CC)
      const newDiluentVolume = targetVolume - newConcentrateVolume;
      setConcentrateVolume(Number(newConcentrateVolume.toFixed(2)));
      setDiluentVolume(Number(newDiluentVolume.toFixed(2)));
    } else {
      setConcentrateVolume(undefined);
      setDiluentVolume(undefined);
    }
  }, [concentratePPM, diluentPPM, targetPPM, targetVolume]);

  const handleConcentratePPMChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value === "" ? undefined : Number(e.target.value);
    setConcentratePPM(value);
  };

  const handleDiluentPPMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : Number(e.target.value);
    setDiluentPPM(value);
  };

  const handleTargetPPMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : Number(e.target.value);
    setTargetPPM(value);
  };

  const handleTargetVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : Number(e.target.value);
    setTargetVolume(value);
  };

  return (
    <>
      <Stack direction="column" alignItems="center" rowGap="12px">
        <TextField
          variant="outlined"
          size="medium"
          label="Concentrate ppm"
          onChange={handleConcentratePPMChange}
          type="number"
          sx={{
            fontSize: "20px",
          }}
          fullWidth
          InputProps={{
            style: { fontSize: "20px" },
            endAdornment: <InputAdornment position="end">ppm</InputAdornment>,
          }}
          value={concentratePPM}
        />

        <TextField
          variant="outlined"
          size="medium"
          label="Diluent ppm"
          onChange={handleDiluentPPMChange}
          type="number"
          sx={{
            fontSize: "20px",
          }}
          fullWidth
          InputProps={{
            style: { fontSize: "20px" },
            endAdornment: <InputAdornment position="end">ppm</InputAdornment>,
          }}
          value={diluentPPM}
        />

        <TextField
          variant="outlined"
          size="medium"
          label="Target ppm"
          onChange={handleTargetPPMChange}
          type="number"
          sx={{
            fontSize: "20px",
          }}
          fullWidth
          InputProps={{
            style: { fontSize: "20px" },
            endAdornment: <InputAdornment position="end">ppm</InputAdornment>,
          }}
          value={targetPPM}
        />

        <TextField
          variant="outlined"
          size="medium"
          label="Target volume"
          onChange={handleTargetVolumeChange}
          type="number"
          sx={{
            fontSize: "20px",
          }}
          fullWidth
          InputProps={{
            style: { fontSize: "20px" },
            endAdornment: <InputAdornment position="end">ml</InputAdornment>,
          }}
          value={targetVolume}
        />
        <Container maxWidth="sm">
          <Stack
            sx={{
              bgcolor: color_primary_vanilla,
              borderRadius: "40px",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              paddingTop="16px"
              paddingBottom="16px"
            >
              Concentrate: <b>{concentrateVolume}</b> ml
            </Typography>
          </Stack>
          <br></br>

          <Stack
            sx={{
              bgcolor: color_secondary_tiffany_blue,
              borderRadius: "40px",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              paddingTop="16px"
              paddingBottom="16px"
            >
              Diluent: <b>{diluentVolume}</b> ml
            </Typography>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default PPMForm;
