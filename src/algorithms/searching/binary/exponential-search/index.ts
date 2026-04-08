/**
 * Exponential Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { exponentialSearch } from "./sources/exponential-search.ts?fn";
import { generateExponentialSearchSteps } from "./step-generator";
import { exponentialSearchEducational } from "./educational";

import typescriptSource from "./sources/exponential-search.ts?raw";
import pythonSource from "./sources/exponential-search.py?raw";
import javaSource from "./sources/ExponentialSearch.java?raw";
import rustSource from "./sources/exponential-search.rs?raw";
import cppSource from "./sources/ExponentialSearch.cpp?raw";
import goSource from "./sources/exponential-search.go?raw";

const exponentialSearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.EXPONENTIAL_SEARCH!,
    name: "Exponential Search",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "A two-phase search algorithm that probes exponentially growing indices to bound the search range, then applies binary search within that range",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 8,
    },
  },
  execute: ({ sortedArray, targetValue }) => exponentialSearch(sortedArray, targetValue),
  generateSteps: generateExponentialSearchSteps,
  educational: exponentialSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(exponentialSearchDefinition);
