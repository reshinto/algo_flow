/**
 * Floyd's Cycle Detection algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { floydCycleDetection } from "./sources/floyd-cycle-detection.ts?fn";
import { generateFloydCycleDetectionSteps } from "./step-generator";
import { floydCycleDetectionEducational } from "./educational";

import typescriptSource from "./sources/floyd-cycle-detection.ts?raw";
import pythonSource from "./sources/floyd-cycle-detection.py?raw";
import javaSource from "./sources/FloydCycleDetection.java?raw";

interface FloydCycleDetectionInput {
  inputArray: number[];
}

const floydCycleDetectionDefinition: AlgorithmDefinition<FloydCycleDetectionInput> = {
  meta: {
    id: ALGORITHM_ID.FLOYD_CYCLE_DETECTION!,
    name: "Floyd's Cycle Detection",
    category: CATEGORY.ARRAYS!,
    description:
      "Tortoise and hare algorithm that detects a cycle in an array-as-linked-list and finds the cycle entrance in O(n) time and O(1) space — commonly used to find a duplicate number",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [1, 3, 4, 2, 2],
    },
  },
  execute: (input: FloydCycleDetectionInput) => floydCycleDetection(input.inputArray),
  generateSteps: generateFloydCycleDetectionSteps,
  educational: floydCycleDetectionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(floydCycleDetectionDefinition);
