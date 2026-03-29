/**
 * First Negative in Window algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { firstNegativeInWindow } from "./sources/first-negative-in-window.ts?fn";
import { generateFirstNegativeInWindowSteps } from "./step-generator";
import { firstNegativeInWindowEducational } from "./educational";

import typescriptSource from "./sources/first-negative-in-window.ts?raw";
import pythonSource from "./sources/first-negative-in-window.py?raw";
import javaSource from "./sources/FirstNegativeInWindow.java?raw";

interface FirstNegativeInWindowInput {
  inputArray: number[];
  windowSize: number;
}

const firstNegativeInWindowDefinition: AlgorithmDefinition<FirstNegativeInWindowInput> = {
  meta: {
    id: ALGORITHM_ID.FIRST_NEGATIVE_IN_WINDOW!,
    name: "First Negative in Window",
    category: CATEGORY.ARRAYS!,
    technique: "sliding-window",
    description:
      "For each sliding window of size K, finds the first negative number using a deque to avoid rescanning on each slide",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [12, -1, -7, 8, -15, 30, 16, 28],
      windowSize: 3,
    },
  },
  execute: (input: FirstNegativeInWindowInput) =>
    firstNegativeInWindow(input.inputArray, input.windowSize),
  generateSteps: generateFirstNegativeInWindowSteps,
  educational: firstNegativeInWindowEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(firstNegativeInWindowDefinition);
