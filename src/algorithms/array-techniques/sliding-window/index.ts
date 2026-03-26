/**
 * Sliding Window (Max Sum) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID } from "@/utils/constants";

import { maxSumSubarray } from "./sliding-window";
import { generateSlidingWindowSteps } from "./step-generator";
import { slidingWindowEducational } from "./educational";

import typescriptSource from "./sources/sliding-window.ts?raw";
import pythonSource from "./sources/sliding-window.py?raw";
import javaSource from "./sources/SlidingWindow.java?raw";

interface SlidingWindowInput {
  inputArray: number[];
  windowSize: number;
}

const slidingWindowDefinition: AlgorithmDefinition<SlidingWindowInput> = {
  meta: {
    id: ALGORITHM_ID.SLIDING_WINDOW!,
    name: "Sliding Window (Max Sum)",
    category: "array-techniques",
    description:
      "An efficient technique for finding the maximum sum subarray of a fixed size by sliding a window across the array",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [2, 1, 5, 1, 3, 2, 8, 4, 3, 5],
      windowSize: 3,
    },
  },
  execute: (input: SlidingWindowInput) => maxSumSubarray(input.inputArray, input.windowSize),
  generateSteps: generateSlidingWindowSteps,
  educational: slidingWindowEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(slidingWindowDefinition);
