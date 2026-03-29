import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { maxSubarrayKadane } from "./sources/max-subarray-kadane.ts?fn";
import { generateMaxSubarrayKadaneSteps } from "./step-generator";
import { maxSubarrayKadaneEducational } from "./educational";

import typescriptSource from "./sources/max-subarray-kadane.ts?raw";
import pythonSource from "./sources/max-subarray-kadane.py?raw";
import javaSource from "./sources/MaxSubarrayKadane.java?raw";

interface MaxSubarrayInput {
  array: number[];
}

const maxSubarrayKadaneDefinition: AlgorithmDefinition<MaxSubarrayInput> = {
  meta: {
    id: ALGORITHM_ID.MAX_SUBARRAY_KADANE!,
    name: "Kadane's Algorithm (Max Subarray)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "subsequence",
    description:
      "A dynamic programming approach that finds the contiguous subarray with the largest sum using Kadane's algorithm",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
  },
  execute: (input: MaxSubarrayInput) => maxSubarrayKadane(input.array),
  generateSteps: generateMaxSubarrayKadaneSteps,
  educational: maxSubarrayKadaneEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(maxSubarrayKadaneDefinition);
