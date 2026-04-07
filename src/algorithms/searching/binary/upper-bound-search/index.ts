/**
 * Upper Bound Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { upperBoundSearch } from "./sources/upper-bound-search.ts?fn";
import { generateUpperBoundSearchSteps } from "./step-generator";
import { upperBoundSearchEducational } from "./educational";

import typescriptSource from "./sources/upper-bound-search.ts?raw";
import pythonSource from "./sources/upper-bound-search.py?raw";
import javaSource from "./sources/UpperBoundSearch.java?raw";
import rustSource from "./sources/upper-bound-search.rs?raw";
import cppSource from "./sources/UpperBoundSearch.cpp?raw";
import goSource from "./sources/upper-bound-search.go?raw";

const upperBoundSearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.UPPER_BOUND_SEARCH!,
    name: "Upper Bound Search",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "A modified binary search that finds the first position in a sorted array where an element is strictly greater than the target, returning the array length if all elements are less than or equal to the target",
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
  execute: ({ sortedArray, targetValue }) => upperBoundSearch(sortedArray, targetValue),
  generateSteps: generateUpperBoundSearchSteps,
  educational: upperBoundSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(upperBoundSearchDefinition);
