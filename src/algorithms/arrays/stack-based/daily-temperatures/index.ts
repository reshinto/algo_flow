/**
 * Daily Temperatures algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { dailyTemperatures } from "./sources/daily-temperatures.ts?fn";
import { generateDailyTemperaturesSteps } from "./step-generator";
import { dailyTemperaturesEducational } from "./educational";

import typescriptSource from "./sources/daily-temperatures.ts?raw";
import pythonSource from "./sources/daily-temperatures.py?raw";
import javaSource from "./sources/DailyTemperatures.java?raw";

interface DailyTemperaturesInput {
  temperatures: number[];
}

const dailyTemperaturesDefinition: AlgorithmDefinition<DailyTemperaturesInput> = {
  meta: {
    id: ALGORITHM_ID.DAILY_TEMPERATURES!,
    name: "Daily Temperatures",
    category: CATEGORY.ARRAYS!,
    technique: "stack-based",
    description:
      "Monotonic stack algorithm that finds, for each day, how many days until a warmer temperature arrives — computed in O(n) using a single left-to-right pass",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    },
  },
  execute: (input: DailyTemperaturesInput) => dailyTemperatures(input.temperatures),
  generateSteps: generateDailyTemperaturesSteps,
  educational: dailyTemperaturesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(dailyTemperaturesDefinition);
