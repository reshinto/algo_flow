/**
 * Search in Rotated Sorted Array algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { searchRotatedArray } from "./sources/search-rotated-array.ts?fn";
import { generateSearchRotatedArraySteps } from "./step-generator";
import { searchRotatedArrayEducational } from "./educational";

import typescriptSource from "./sources/search-rotated-array.ts?raw";
import pythonSource from "./sources/search-rotated-array.py?raw";
import javaSource from "./sources/SearchRotatedArray.java?raw";
import rustSource from "./sources/search-rotated-array.rs?raw";
import cppSource from "./sources/SearchRotatedArray.cpp?raw";
import goSource from "./sources/search-rotated-array.go?raw";

const searchRotatedArrayDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.SEARCH_ROTATED_ARRAY!,
    name: "Search in Rotated Sorted Array",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "A binary search variant that finds a target value in a sorted array that has been rotated at an unknown pivot point, by identifying the sorted half at each step",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
      targetValue: 0,
    },
  },
  execute: ({ sortedArray, targetValue }) => searchRotatedArray(sortedArray, targetValue),
  generateSteps: generateSearchRotatedArraySteps,
  educational: searchRotatedArrayEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(searchRotatedArrayDefinition);
