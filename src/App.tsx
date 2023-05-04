import React, { useEffect, useState } from "react";
import "./Steps";
import "./App.css";
import CoffeeInputs from "./CoffeeInputs";
import { Step, createSteps } from "./Steps";
import * as TechniqueConstants from "./TechniqueConstants";

const App = () => {
  const [coffeeAmount, setCoffeeAmount] = useState<number | null>(null);
  const [technique, setTechnique] = useState<Technique>("V60");
  const [ratio, setRatio] = useState<number | null>(
    TechniqueConstants.TECHNIQUE_WATER_RATIOS[technique]
  );

  const handleCoffeeAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    setCoffeeAmount(Number.isNaN(value) ? null : value);
  };

  const handleTechniqueChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
    handlePauseTimer();
  };

  return (
    <div className="container">
      <h1 className="title">Brewing Helper</h1>
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
          <p className="text">💧 {waterAmount.toFixed(0)} g 💧</p>

          {coffeeAmount !== null && ratio !== null && (
            <Instructions
              technique={technique}
              coffeeAmount={coffeeAmount}
              currentTime={currentTime}
              ratio={ratio}
            />
          )}

          {/* <div className="waterCalc">
              Add 💧 now:{currentWaterAdded}
            </div>
            <div className="waterCalc">
              Total💧 now:{currentCumulativeWater}
            </div> */}

          <div className="buttons">
            <button className="buttonStart" onClick={handleTimerClick}>
              {isTimerRunning ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  viewBox="0 96 960 960"
                  width="48"
                >
                  <path d="M564 902V250h224v652H564Zm-392 0V250h224v652H172Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  viewBox="0 96 960 960"
                  width="48"
                >
                  <path d="M295 899V247l512 326-512 326Z" />
                </svg>
              )}
            </button>
            <button className="buttonReset" onClick={handleResetTimer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M451 960q-133-11-224.5-109T135 618q0-79 35.5-149.5T270 351l67 67q-50 32-79 86t-29 114q0 97 63.5 167T451 865v95Zm60 0v-95q97-11 159-80.5T732 618q0-100-67.5-172T497 368h-23l64 65-51 51-168-168 168-169 51 51-75 75h24q142 0 241 101.5T827 618q0 135-91.5 233T511 960Z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default App;

interface InstructionsProps {
  technique: Technique;
  coffeeAmount: number;
  currentTime: number;
  ratio: number;
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
      <p className="text">⏱️ {targetTime} s ⏱️</p>
      <div className="timer"> {props.currentTime}</div>

      <p className="text">Time remaining: {remainingTime} seconds</p>

      <div className="currentInstruction">
        Now: {stepToTexts(currentStep)} <br></br>
      </div>

      {nextStep !== null && (
        <div className="nextInstruction">Next: {stepToTexts(nextStep)}</div>
      )}
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
