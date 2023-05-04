import {
  actionToText,
  createActions,
  getTargetTime,
  isBreakpoint,
} from "./Actions";
import "./TechniqueConstants";

export interface Step {
  texts: string[];
  targetTime: number | null;
}

function emptyStep(): Step {
  return {
    texts: [],
    targetTime: null,
  };
}

export function createSteps(
  technique: Technique,
  coffeeAmount: number,
  ratio: number
) {
  const createdSteps: Step[] = [];

  const actions = createActions(technique, coffeeAmount!, ratio!);

  let currentStep = emptyStep();

  for (let actionIndex = 0; actionIndex < actions.length; ++actionIndex) {
    currentStep.texts.push(actionToText(actions, actionIndex));

    const action = actions[actionIndex];
    const actionTargetTime = getTargetTime(action);
    if (actionTargetTime !== null) {
      currentStep.targetTime =
        currentStep.targetTime === null
          ? actionTargetTime
          : Math.max(currentStep.targetTime, actionTargetTime);
    }

    if (isBreakpoint(action)) {
      createdSteps.push(currentStep);
      currentStep = emptyStep();
    }
  }

  if (currentStep.texts.length > 0) {
    createdSteps.push(currentStep);
  }

  return createdSteps;
}
