import React, { useEffect, useState } from "react";
import "./Steps";
import CoffeeInputs from "./CoffeeInputs";
import { Step, createSteps } from "./Steps";
import * as TechniqueConstants from "./TechniqueConstants";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Pause, PlayArrow, ReplayOutlined } from "@mui/icons-material";
import {
  Box,
  Container,
  SelectChangeEvent,
  Stack,
  ThemeProvider,
} from "@mui/material";
import "./theme";
import { color_secondary_tiffany_blue, createComponentsTheme } from "./theme";
import { Theme } from "@emotion/react";

const App = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome requires this
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [coffeeAmount, setCoffeeAmount] = useState<number | null>(() => {
    const storedCoffeeAmount = localStorage.getItem("coffeeAmount");
    if (storedCoffeeAmount !== null && storedCoffeeAmount !== "") {
      return parseFloat(storedCoffeeAmount);
    }
    return null;
  });
  const [technique, setTechnique] = useState<Technique>(() => {
    const storedTechnique = localStorage.getItem("technique");
    if (storedTechnique !== null && storedTechnique !== "") {
      return storedTechnique as Technique;
    }
    return "V60";
  });
  const [ratio, setRatio] = useState<number | null>(
    TechniqueConstants.TECHNIQUE_WATER_RATIOS[technique]
  );

  useEffect(() => {
    if (coffeeAmount !== null) {
      localStorage.setItem("coffeeAmount", coffeeAmount!.toString());
    }
    localStorage.setItem("technique", technique);
  }, [coffeeAmount, technique]);

  const handleCoffeeAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    setCoffeeAmount(Number.isNaN(value) ? null : value);
  };

  const handleTechniqueChange = (event: SelectChangeEvent) => {
    const newTechnique = event.target.value as Technique;
    setTechnique(newTechnique);
    setRatio(TechniqueConstants.TECHNIQUE_WATER_RATIOS[newTechnique]);
  };

  const handleRatioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = null;
    if (event.target.value !== "") {
      value = parseFloat(event.target.value);
      if (Number.isNaN(value)) {
        value = null;
      }
    }

    setRatio(value);
  };

  const waterAmount =
    coffeeAmount !== null && ratio !== null
      ? (coffeeAmount * 1000) / ratio
      : null;

  const [currentTime, setCurrentTime] = useState(-3);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleStartTimer = () => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const handlePauseTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleTimerClick = () => {
    if (isTimerRunning) {
      handlePauseTimer();
      setIsTimerRunning(false);
    } else {
      handleStartTimer();
      setIsTimerRunning(true);
    }
  };

  const handleResetTimer = () => {
    setCurrentTime(-3);
  };

  const theme = createComponentsTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ backgroundColor: "primary_black" }}>
        <Typography variant="h1" align="center" padding="16px">
          Brewing Helper
        </Typography>

        <CoffeeInputs
          coffeeAmount={coffeeAmount}
          technique={technique}
          ratio={ratio}
          handleCoffeeAmountChange={handleCoffeeAmountChange}
          handleTechniqueChange={handleTechniqueChange}
          handleRatioChange={handleRatioChange}
        ></CoffeeInputs>

        {waterAmount !== null && (
          <>
            <Typography variant="h3" align="center">
              💧 {waterAmount.toFixed(2)} g 💧
            </Typography>

            {coffeeAmount !== null && ratio !== null && (
              <Instructions
                technique={technique}
                coffeeAmount={coffeeAmount}
                currentTime={currentTime}
                ratio={ratio}
                theme={theme}
              />
            )}

            {/* <div className="waterCalc">
              Add 💧 now:{currentWaterAdded}
            </div>
            <div className="waterCalc">
              Total💧 now:{currentCumulativeWater}
            </div> */}
            <Stack
              direction="row"
              columnGap="24px"
              alignItems="center"
              justifyContent="center"
              paddingBottom="24px"
            >
              <Button
                variant="contained"
                color="primary_dark_cyan"
                sx={{
                  borderRadius: "40px",
                  padding: "20px",
                }}
                onClick={handleTimerClick}
              >
                {isTimerRunning ? (
                  <Pause fontSize="large" color="primary_black"></Pause>
                ) : (
                  <PlayArrow fontSize="large" color="primary_black"></PlayArrow>
                )}
              </Button>

              <Button
                variant="contained"
                color="primary_alloy_orange"
                sx={{
                  borderRadius: "40px",
                  padding: "20px",
                }}
                onClick={handleResetTimer}
              >
                <ReplayOutlined
                  fontSize="large"
                  color="primary_black"
                ></ReplayOutlined>
              </Button>
            </Stack>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};
export default App;

interface InstructionsProps {
  technique: Technique;
  coffeeAmount: number;
  currentTime: number;
  ratio: number;
  theme: Theme;
}

function Instructions(props: InstructionsProps) {
  const createdSteps = createSteps(
    props.technique,
    props.coffeeAmount,
    props.ratio
  );

  let currentStepIndex = createdSteps.findIndex(
    (o) => o.targetTime === null || props.currentTime < o.targetTime
  );

  if (currentStepIndex === -1) {
    currentStepIndex = 0;
  }

  /*
  const previousStep =
    currentStepIndex > 0 ? createdSteps[currentStepIndex - 1] : null;
    */
  const currentStep = createdSteps[currentStepIndex];
  const nextStep =
    currentStepIndex < createdSteps.length - 1
      ? createdSteps[currentStepIndex + 1]
      : null;

  let targetTime = Math.max(
    ...createdSteps.map((step) =>
      step.targetTime !== null ? step.targetTime : 0
    )
  );
  const remainingTime = targetTime - props.currentTime;

  return (
    <>
      <Typography
        variant="h3"
        align="center"
        paddingTop="16px"
        paddingBottom="16px"
      >
        ⏱️ {targetTime} s ⏱️
      </Typography>
      <Container maxWidth="sm">
        <Stack
          sx={{
            bgcolor: color_secondary_tiffany_blue,
            borderRadius: "40px",
            padding: "10px",
          }}
        >
          <Typography variant="h3" align="center">
            {props.currentTime}
          </Typography>
        </Stack>
      </Container>

      <Typography
        variant="h4"
        align="center"
        paddingTop="16px"
        paddingBottom="16px"
      >
        Time remaining: {remainingTime} seconds
      </Typography>

      <Container>
        <Box
          sx={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4"> Now: {stepToTexts(currentStep)}</Typography>
          <br></br>
          {nextStep !== null && (
            <Typography variant="h5">Next: {stepToTexts(nextStep)}</Typography>
          )}
        </Box>
      </Container>
    </>
  );
}

function stepToTexts(step: Step) {
  return (
    <div>
      {step.texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
    </div>
  );
}
