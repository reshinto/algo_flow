/**
 * Square Root via Binary Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sqrtBinarySearch } from "./sources/sqrt-binary-search.ts?fn";
import { generateSqrtBinarySearchSteps } from "./step-generator";
import { sqrtBinarySearchEducational } from "./educational";

import typescriptSource from "./sources/sqrt-binary-search.ts?raw";
import pythonSource from "./sources/sqrt-binary-search.py?raw";
import javaSource from "./sources/SqrtBinarySearch.java?raw";

const sqrtBinarySearchDefinition: AlgorithmDefinition<{ targetValue: number }> = {
  meta: {
    id: ALGORITHM_ID.SQRT_BINARY_SEARCH!,
    name: "Square Root via Binary Search",
    category: CATEGORY.SEARCHING!,
    technique: "binary",
    description:
      "Computes the integer square root of a non-negative number by performing binary search on the answer space [0, n/2], comparing mid² against the target to narrow the search range",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      targetValue: 49,
    },
  },
  execute: ({ targetValue }) => sqrtBinarySearch(targetValue),
  generateSteps: generateSqrtBinarySearchSteps,
  educational: sqrtBinarySearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(sqrtBinarySearchDefinition);
