type Action =
  | GetReadyAction
  | PourAction
  | SimplePourAction
  | WaitAction
  | SwirlAction
  | ScoopAction
  | SimplePressAction
  | PressAction
  | FinishAction;

interface GetReadyAction {
  type: "GET_READY";
}

interface PourAction {
  type: "POUR";
  waterAmountCumulativeMin: number;
  waterAmountCumulativeMax: number;
}

interface SimplePourAction {
  type: "SIMPLE_POUR";
  waterAmount: number;
}

interface WaitAction {
  type: "WAIT";
  targetSeconds: number;
}

interface SwirlAction {
  type: "SWIRL";
}

interface ScoopAction {
  type: "SCOOP";
}
interface PressAction {
  type: "PRESS";
  pressSeconds: number;
}
interface SimplePressAction {
  type: "PRESS_SIMPLE";
}

interface FinishAction {
  type: "FINISH";
}

function fromToText(from: number, to: number) {
  if (from === to) {
    return "" + from;
  } else {
    return `${from} to ${to}`;
  }
}

export function actionToText(actions: Action[], actionIndex: number) {
  const action = actions[actionIndex];

  if (action.type === "GET_READY") {
    return "Get ready";
  }

  if (action.type === "POUR") {
    const previousPourAction = actions
      .slice(0, actionIndex)
      .reverse()
      .find((o) => o.type === "POUR");

    const previousCumulativeMin =
      previousPourAction !== undefined
        ? (previousPourAction as PourAction).waterAmountCumulativeMin
        : 0;
    const previousCumulativeMax =
      previousPourAction !== undefined
        ? (previousPourAction as PourAction).waterAmountCumulativeMax
        : 0;

    return `Pour ${fromToText(
      +(action.waterAmountCumulativeMin - previousCumulativeMax).toFixed(2),
      +(action.waterAmountCumulativeMax - previousCumulativeMin).toFixed(2)
    )} ml of water (to have total of ${fromToText(
      +action.waterAmountCumulativeMin.toFixed(2),
      +action.waterAmountCumulativeMax.toFixed(2)
    )}).`;
  }

  if (action.type === "SIMPLE_POUR") {
    return `Pour ${fromToText(
      +action.waterAmount.toFixed(2),
      +action.waterAmount.toFixed(2)
    )} ml of water.`;
  }

  if (action.type === "WAIT") {
    return `Wait till ${action.targetSeconds} seconds.`;
  }

  if (action.type === "SWIRL") {
    return "Swirl the brewer.";
  }

  if (action.type === "SCOOP") {
    return "Scoop.";
  }
  if (action.type === "PRESS_SIMPLE") {
    return "Press down.";
  }
  if (action.type === "PRESS") {
    return `Press down. It should take about ${action.pressSeconds}`;
  }
  if (action.type === "FINISH") {
    return "Finish brewing.";
  }

  throw new Error("I DON'T KNOW WHAT THIS IS");
}

export function getTargetTime(action: Action): number | null {
  if (action.type === "GET_READY") {
    return 0;
  }

  if (action.type === "POUR") {
    return null;
  }

  if (action.type === "SIMPLE_POUR") {
    return null;
  }

  if (action.type === "WAIT") {
    return action.targetSeconds;
  }

  if (action.type === "SWIRL") {
    return null;
  }

  if (action.type === "SCOOP") {
    return null;
  }
  if (action.type === "PRESS_SIMPLE") {
    return null;
  }
  if (action.type === "PRESS") {
    return action.pressSeconds;
  }

  if (action.type === "FINISH") {
    return null;
  }

  throw new Error("I DON'T KNOW WHAT THIS IS");
}

export function isBreakpoint(action: Action) {
  if (action.type === "GET_READY") {
    return true;
  }

  if (action.type === "POUR") {
    return false;
  }

  if (action.type === "SIMPLE_POUR") {
    return false;
  }

  if (action.type === "WAIT") {
    return true;
  }

  if (action.type === "SWIRL") {
    return false;
  }

  if (action.type === "SCOOP") {
    return false;
  }

  if (action.type === "PRESS") {
    return false;
  }
  if (action.type === "PRESS_SIMPLE") {
    return false;
  }

  if (action.type === "FINISH") {
    return false;
  }

  throw new Error("I DON'T KNOW WHAT THIS IS");
}

export function createActions(
  technique: Technique,
  coffeeAmountG: number,
  ratio: number
): Action[] {
  let calcRatio = 1000 / ratio;
  if (technique === "V60") {
    return [
      { type: "GET_READY" },
      {
        type: "POUR",
        waterAmountCumulativeMin: ((calcRatio * 12) / 100) * coffeeAmountG,
        waterAmountCumulativeMax: ((calcRatio * 15) / 100) * coffeeAmountG,
      },
      { type: "SWIRL" },
      { type: "WAIT", targetSeconds: 45 },
      {
        type: "POUR",
        waterAmountCumulativeMin: ((calcRatio * 60) / 100) * coffeeAmountG,
        waterAmountCumulativeMax: ((calcRatio * 60) / 100) * coffeeAmountG,
      },
      { type: "WAIT", targetSeconds: 75 },
      {
        type: "POUR",
        waterAmountCumulativeMin: calcRatio * coffeeAmountG,
        waterAmountCumulativeMax: calcRatio * coffeeAmountG,
      },
      { type: "SWIRL" },
      { type: "SCOOP" },
      { type: "WAIT", targetSeconds: 180 },
      { type: "FINISH" },
    ];
  } else if (technique === "V60 1 cup") {
    return [
      { type: "GET_READY" },
      {
        type: "POUR",
        waterAmountCumulativeMin: calcRatio * coffeeAmountG * 0.2,
        waterAmountCumulativeMax: calcRatio * coffeeAmountG * 0.2,
      },
      { type: "SWIRL" },
      { type: "WAIT", targetSeconds: 45 },
      {
        type: "POUR",
        waterAmountCumulativeMin: calcRatio * coffeeAmountG * 0.4,
        waterAmountCumulativeMax: calcRatio * coffeeAmountG * 0.4,
      },
      { type: "WAIT", targetSeconds: 70 },
      {
        type: "POUR",
        waterAmountCumulativeMin: calcRatio * coffeeAmountG * 0.6,
        waterAmountCumulativeMax: calcRatio * coffeeAmountG * 0.6,
      },
      { type: "WAIT", targetSeconds: 90 },

      {
        type: "POUR",
        waterAmountCumulativeMin: calcRatio * coffeeAmountG * 0.8,
        waterAmountCumulativeMax: calcRatio * coffeeAmountG * 0.8,
      },
      { type: "WAIT", targetSeconds: 110 },
      {
        type: "POUR",
        waterAmountCumulativeMin: calcRatio * coffeeAmountG,
        waterAmountCumulativeMax: calcRatio * coffeeAmountG,
      },
      { type: "SWIRL" },
      { type: "WAIT", targetSeconds: 180 },
      { type: "FINISH" },
    ];
  } else if (technique === "Chemex") {
    return [
      { type: "GET_READY" },
      {
        type: "POUR",
        waterAmountCumulativeMin: ((calcRatio * 12) / 100) * coffeeAmountG,
        waterAmountCumulativeMax: ((calcRatio * 15) / 100) * coffeeAmountG,
      },
      { type: "SWIRL" },
      { type: "WAIT", targetSeconds: 45 },
      {
        type: "POUR",
        waterAmountCumulativeMin: ((calcRatio * 60) / 100) * coffeeAmountG,
        waterAmountCumulativeMax: ((calcRatio * 60) / 100) * coffeeAmountG,
      },
      { type: "WAIT", targetSeconds: 75 },
      {
        type: "POUR",
        waterAmountCumulativeMin: calcRatio * coffeeAmountG,
        waterAmountCumulativeMax: calcRatio * coffeeAmountG,
      },
      { type: "SWIRL" },
      { type: "SCOOP" },
      { type: "WAIT", targetSeconds: 180 },
      { type: "FINISH" },
    ];
  } else if (technique === "French Press") {
    return [
      { type: "GET_READY" },
      {
        type: "SIMPLE_POUR",
        waterAmount: coffeeAmountG * calcRatio,
      },
      { type: "SWIRL" },
      { type: "WAIT", targetSeconds: 4 * 60 },

      { type: "SWIRL" },
      { type: "SCOOP" },
      { type: "WAIT", targetSeconds: 180 },
      { type: "PRESS_SIMPLE" },
      { type: "FINISH" },
    ];
  } else if (technique === "AeroPress") {
    return [
      { type: "GET_READY" },
      {
        type: "SIMPLE_POUR",
        waterAmount: coffeeAmountG * calcRatio,
      },
      { type: "WAIT", targetSeconds: 2 * 60 },

      { type: "SWIRL" },
      { type: "WAIT", targetSeconds: 210 },
      { type: "PRESS", pressSeconds: 30 },
      { type: "FINISH" },
    ];
  }
  throw new Error();
}
