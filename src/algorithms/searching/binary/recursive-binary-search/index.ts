/**
 * Recursive Binary Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { recursiveBinarySearch } from "./sources/recursive-binary-search.ts?fn";
import { generateRecursiveBinarySearchSteps } from "./step-generator";
import { recursiveBinarySearchEducational } from "./educational";

import typescriptSource from "./sources/recursive-binary-search.ts?raw";
import pythonSource from "./sources/recursive-binary-search.py?raw";
import javaSource from "./sources/RecursiveBinarySearch.java?raw";
import rustSource from "./sources/recursive-binary-search.rs?raw";
import cppSource from "./sources/RecursiveBinarySearch.cpp?raw";
import goSource from "./sources/recursive-binary-search.go?raw";

const recursiveBinarySearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.RECURSIVE_BINARY_SEARCH!,
    name: "Recursive Binary Search",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "A divide-and-conquer search algorithm that recursively halves the search range until the target is found or the range is empty",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    },
  },
  execute: ({ sortedArray, targetValue }) => recursiveBinarySearch(sortedArray, targetValue),
  generateSteps: generateRecursiveBinarySearchSteps,
  educational: recursiveBinarySearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(recursiveBinarySearchDefinition);
