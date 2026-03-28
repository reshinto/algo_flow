/**
 * Kadane's Algorithm (Maximum Subarray Sum) registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { kadanesAlgorithm } from "./sources/kadanes-algorithm.ts?fn";
import { generateKadanesSteps } from "./step-generator";
import { kadanesEducational } from "./educational";

import typescriptSource from "./sources/kadanes-algorithm.ts?raw";
import pythonSource from "./sources/kadanes-algorithm.py?raw";
import javaSource from "./sources/KadanesAlgorithm.java?raw";

interface KadanesInput {
  inputArray: number[];
}

const kadanesDefinition: AlgorithmDefinition<KadanesInput> = {
  meta: {
    id: ALGORITHM_ID.KADANES_ALGORITHM!,
    name: "Kadane's Algorithm (Max Subarray)",
    category: CATEGORY.ARRAYS!,
    description:
      "An efficient O(n) algorithm for finding the contiguous subarray with the largest sum using the extend-or-restart decision",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    },
  },
  execute: (input: KadanesInput) => kadanesAlgorithm(input.inputArray),
  generateSteps: generateKadanesSteps,
  educational: kadanesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(kadanesDefinition);
