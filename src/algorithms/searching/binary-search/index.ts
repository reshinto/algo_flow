/**
 * Binary Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID } from "@/utils/constants";

import { binarySearch } from "./binary-search";
import { generateBinarySearchSteps } from "./step-generator";
import { binarySearchEducational } from "./educational";

import typescriptSource from "./sources/binary-search.ts?raw";
import pythonSource from "./sources/binary-search.py?raw";
import javaSource from "./sources/BinarySearch.java?raw";

const binarySearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.BINARY_SEARCH!,
    name: "Binary Search",
    category: "searching",
    description:
      "An efficient divide-and-conquer algorithm that finds a target value in a sorted array by repeatedly halving the search range",
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
  execute: ({ sortedArray, targetValue }) => binarySearch(sortedArray, targetValue),
  generateSteps: generateBinarySearchSteps,
  educational: binarySearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(binarySearchDefinition);
