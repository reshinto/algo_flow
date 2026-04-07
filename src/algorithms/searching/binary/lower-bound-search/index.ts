/**
 * Lower Bound Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { lowerBoundSearch } from "./sources/lower-bound-search.ts?fn";
import { generateLowerBoundSearchSteps } from "./step-generator";
import { lowerBoundSearchEducational } from "./educational";

import typescriptSource from "./sources/lower-bound-search.ts?raw";
import pythonSource from "./sources/lower-bound-search.py?raw";
import javaSource from "./sources/LowerBoundSearch.java?raw";
import rustSource from "./sources/lower-bound-search.rs?raw";
import cppSource from "./sources/LowerBoundSearch.cpp?raw";
import goSource from "./sources/lower-bound-search.go?raw";

const lowerBoundSearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.LOWER_BOUND_SEARCH!,
    name: "Lower Bound Search",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "A modified binary search that finds the first position in a sorted array where an element is greater than or equal to the target, returning the array length if no such element exists",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      sortedArray: [1, 3, 3, 5, 5, 5, 8, 12],
      targetValue: 5,
    },
  },
  execute: ({ sortedArray, targetValue }) => lowerBoundSearch(sortedArray, targetValue),
  generateSteps: generateLowerBoundSearchSteps,
  educational: lowerBoundSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(lowerBoundSearchDefinition);
