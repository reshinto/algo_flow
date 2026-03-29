/**
 * Min Size Subarray Sum algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minSizeSubarraySum } from "./sources/min-size-subarray-sum.ts?fn";
import { generateMinSizeSubarraySumSteps } from "./step-generator";
import { minSizeSubarraySumEducational } from "./educational";

import typescriptSource from "./sources/min-size-subarray-sum.ts?raw";
import pythonSource from "./sources/min-size-subarray-sum.py?raw";
import javaSource from "./sources/MinSizeSubarraySum.java?raw";

interface MinSizeSubarraySumInput {
  inputArray: number[];
  target: number;
}

const minSizeSubarraySumDefinition: AlgorithmDefinition<MinSizeSubarraySumInput> = {
  meta: {
    id: ALGORITHM_ID.MIN_SIZE_SUBARRAY_SUM!,
    name: "Min Size Subarray Sum",
    category: CATEGORY.ARRAYS!,
    technique: "sliding-window",
    description:
      "A variable sliding window technique that finds the shortest contiguous subarray whose sum is at least the target value",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [2, 3, 1, 2, 4, 3],
      target: 7,
    },
  },
  execute: (input: MinSizeSubarraySumInput) => minSizeSubarraySum(input.inputArray, input.target),
  generateSteps: generateMinSizeSubarraySumSteps,
  educational: minSizeSubarraySumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(minSizeSubarraySumDefinition);
