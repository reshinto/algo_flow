/**
 * Longest K-Distinct Subarray algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { longestKDistinct } from "./sources/longest-k-distinct.ts?fn";
import { generateLongestKDistinctSteps } from "./step-generator";
import { longestKDistinctEducational } from "./educational";

import typescriptSource from "./sources/longest-k-distinct.ts?raw";
import pythonSource from "./sources/longest-k-distinct.py?raw";
import javaSource from "./sources/LongestKDistinct.java?raw";

interface LongestKDistinctInput {
  inputArray: number[];
  maxDistinct: number;
}

const longestKDistinctDefinition: AlgorithmDefinition<LongestKDistinctInput> = {
  meta: {
    id: ALGORITHM_ID.LONGEST_K_DISTINCT!,
    name: "Longest K-Distinct Subarray",
    category: CATEGORY.ARRAYS!,
    description:
      "Finds the longest contiguous subarray containing at most K distinct values using a variable-size sliding window",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [1, 2, 1, 2, 3, 3, 4, 1],
      maxDistinct: 2,
    },
  },
  execute: (input: LongestKDistinctInput) => longestKDistinct(input.inputArray, input.maxDistinct),
  generateSteps: generateLongestKDistinctSteps,
  educational: longestKDistinctEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(longestKDistinctDefinition);
