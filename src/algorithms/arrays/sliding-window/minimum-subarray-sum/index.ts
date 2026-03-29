/**
 * Minimum Subarray Sum (Inverted Kadane's) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minimumSubarraySum } from "./sources/minimum-subarray-sum.ts?fn";
import { generateMinimumSubarraySumSteps } from "./step-generator";
import { minimumSubarraySumEducational } from "./educational";

import typescriptSource from "./sources/minimum-subarray-sum.ts?raw";
import pythonSource from "./sources/minimum-subarray-sum.py?raw";
import javaSource from "./sources/MinimumSubarraySum.java?raw";

interface MinimumSubarraySumInput {
  inputArray: number[];
}

const minimumSubarraySumDefinition: AlgorithmDefinition<MinimumSubarraySumInput> = {
  meta: {
    id: ALGORITHM_ID.MINIMUM_SUBARRAY_SUM!,
    name: "Minimum Subarray Sum",
    category: CATEGORY.ARRAYS!,
    technique: "sliding-window",
    description:
      "An inverted Kadane's algorithm that finds the contiguous subarray with the smallest (most negative) sum in linear time",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [3, -4, 2, -3, -1, 7, -5],
    },
  },
  execute: (input: MinimumSubarraySumInput) => minimumSubarraySum(input.inputArray),
  generateSteps: generateMinimumSubarraySumSteps,
  educational: minimumSubarraySumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(minimumSubarraySumDefinition);
