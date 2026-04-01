/**
 * Sentinel Linear Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sentinelLinearSearch } from "./sources/sentinel-linear-search.ts?fn";
import { generateSentinelLinearSearchSteps } from "./step-generator";
import { sentinelLinearSearchEducational } from "./educational";

import typescriptSource from "./sources/sentinel-linear-search.ts?raw";
import pythonSource from "./sources/sentinel-linear-search.py?raw";
import javaSource from "./sources/SentinelLinearSearch.java?raw";

const sentinelLinearSearchDefinition: AlgorithmDefinition<{
  array: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.SENTINEL_LINEAR_SEARCH!,
    name: "Sentinel Linear Search",
    category: CATEGORY.SEARCHING!,
    technique: "linear",
    description:
      "An optimized linear search that places the target value as a sentinel at the end of the array, eliminating the bounds check inside the loop for a constant-factor speedup",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    },
  },
  execute: ({ array, targetValue }) => sentinelLinearSearch(array, targetValue),
  generateSteps: generateSentinelLinearSearchSteps,
  educational: sentinelLinearSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(sentinelLinearSearchDefinition);
