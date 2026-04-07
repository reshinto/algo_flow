/**
 * Uniform Binary Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { uniformBinarySearch } from "./sources/uniform-binary-search.ts?fn";
import { generateUniformBinarySearchSteps } from "./step-generator";
import { uniformBinarySearchEducational } from "./educational";

import typescriptSource from "./sources/uniform-binary-search.ts?raw";
import pythonSource from "./sources/uniform-binary-search.py?raw";
import javaSource from "./sources/UniformBinarySearch.java?raw";
import rustSource from "./sources/uniform-binary-search.rs?raw";
import cppSource from "./sources/UniformBinarySearch.cpp?raw";
import goSource from "./sources/uniform-binary-search.go?raw";

const uniformBinarySearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.UNIFORM_BINARY_SEARCH!,
    name: "Uniform Binary Search",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "A binary search variant that pre-computes a lookup table of jump deltas, replacing repeated midpoint arithmetic with a single table lookup per step",
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
  execute: ({ sortedArray, targetValue }) => uniformBinarySearch(sortedArray, targetValue),
  generateSteps: generateUniformBinarySearchSteps,
  educational: uniformBinarySearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(uniformBinarySearchDefinition);
