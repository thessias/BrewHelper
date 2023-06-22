import {
  Container,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
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

  const [concentratePPMWarning, setConcentratePPMWarning] = useState("");
  const [diluentPPMWarning, setDiluentPPMWarning] = useState("");
  const [targetPPMWarning, setTargetPPMWarning] = useState("");
  const [targetVolumeWarning, setTargetVolumeWarning] = useState("");

  useEffect(() => {
    setConcentratePPMWarning("");
    setDiluentPPMWarning("");
    setTargetPPMWarning("");
    setTargetVolumeWarning("");
    if (concentratePPM !== undefined && concentratePPM < 250) {
      setConcentratePPMWarning("Very low PPM for a concentrate. Are you sure?");
    }

    if (diluentPPM !== undefined && diluentPPM > 25) {
      setDiluentPPMWarning(
        "It's pretty high ppm for diluent; consider using cleaner water."
      );
    }
    if (targetPPM !== undefined && targetPPM < 30) {
      setTargetPPMWarning("Very low ppm, the resulting coffee may be flat.");
    }
    if (targetPPM !== undefined && targetPPM > 250) {
      setTargetPPMWarning("Very high ppm, the resulting coffee may be harsh.");
    }
    if (targetVolume !== undefined && targetVolume > 1000) {
      setTargetPPMWarning("Are you sure you need that much water?");
    }
    if (
      concentratePPM !== undefined &&
      diluentPPM !== undefined &&
      concentratePPM < diluentPPM
    ) {
      setConcentratePPMWarning("Concentrate ppm is LESS than diluent ppm!");
      setDiluentPPMWarning("Diluent ppm is MORE than concentrate ppm!");
    }
    if (
      concentratePPM !== undefined &&
      targetPPM !== undefined &&
      concentratePPM < targetPPM
    ) {
      setConcentratePPMWarning("Concentrate ppm is LESS than target ppm!");
      setTargetPPMWarning("Target ppm is MORE than concentrate ppm!");
    }
    if (
      diluentPPM !== undefined &&
      targetPPM !== undefined &&
      targetPPM < diluentPPM
    ) {
      setDiluentPPMWarning("Diluent ppm is MORE than target ppm!");
      setTargetPPMWarning("Target ppm is LESS than diluent ppm!");
    }
  }, [concentratePPM, diluentPPM, targetPPM, targetVolume]);

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
        {concentratePPMWarning && (
          <Typography variant="caption">{concentratePPMWarning}</Typography>
        )}

        <Tooltip title="distilled water should be under 10 pmm; RO water under 25 ppm">
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
        </Tooltip>
        {diluentPPMWarning && (
          <Typography variant="caption">{diluentPPMWarning}</Typography>
        )}

        <br></br>
        <Tooltip title="SCA recommends 150 ppm; acceptable range is 75-250 ppm">
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
        </Tooltip>

        {targetPPMWarning && (
          <Typography variant="caption">{targetPPMWarning}</Typography>
        )}
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
        {targetVolumeWarning && (
          <Typography variant="caption">{targetVolumeWarning}</Typography>
        )}

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
