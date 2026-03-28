/**
 * Subarray Sum Equals K algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { subarraySumEqualsK } from "./sources/subarray-sum-equals-k.ts?fn";
import { generateSubarraySumEqualsKSteps } from "./step-generator";
import { subarraySumEqualsKEducational } from "./educational";

import typescriptSource from "./sources/subarray-sum-equals-k.ts?raw";
import pythonSource from "./sources/subarray-sum-equals-k.py?raw";
import javaSource from "./sources/SubarraySumEqualsK.java?raw";

interface SubarraySumEqualsKInput {
  inputArray: number[];
  target: number;
}

const subarraySumEqualsKDefinition: AlgorithmDefinition<SubarraySumEqualsKInput> = {
  meta: {
    id: ALGORITHM_ID.SUBARRAY_SUM_EQUALS_K!,
    name: "Subarray Sum Equals K",
    category: CATEGORY.ARRAYS!,
    description:
      "Counts all contiguous subarrays whose elements sum to a target value, using a prefix sum hash map for O(n) time instead of O(n²) brute force",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [1, 2, 3, -1, 1, 2],
      target: 3,
    },
  },
  execute: (input: SubarraySumEqualsKInput) => subarraySumEqualsK(input.inputArray, input.target),
  generateSteps: generateSubarraySumEqualsKSteps,
  educational: subarraySumEqualsKEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(subarraySumEqualsKDefinition);
