/**
 * Meta Binary Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { metaBinarySearch } from "./sources/meta-binary-search.ts?fn";
import { generateMetaBinarySearchSteps } from "./step-generator";
import { metaBinarySearchEducational } from "./educational";

import typescriptSource from "./sources/meta-binary-search.ts?raw";
import pythonSource from "./sources/meta-binary-search.py?raw";
import javaSource from "./sources/MetaBinarySearch.java?raw";

const metaBinarySearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.META_BINARY_SEARCH!,
    name: "Meta Binary Search",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "A binary search variant that uses bit manipulation to construct the target index one bit at a time, from most significant to least significant bit",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    },
  },
  execute: ({ sortedArray, targetValue }) => metaBinarySearch(sortedArray, targetValue),
  generateSteps: generateMetaBinarySearchSteps,
  educational: metaBinarySearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(metaBinarySearchDefinition);
