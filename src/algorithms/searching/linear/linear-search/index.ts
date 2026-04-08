/**
 * Linear Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { linearSearch } from "./sources/linear-search.ts?fn";
import { generateLinearSearchSteps } from "./step-generator";
import { linearSearchEducational } from "./educational";

import typescriptSource from "./sources/linear-search.ts?raw";
import pythonSource from "./sources/linear-search.py?raw";
import javaSource from "./sources/LinearSearch.java?raw";
import rustSource from "./sources/linear-search.rs?raw";
import cppSource from "./sources/LinearSearch.cpp?raw";
import goSource from "./sources/linear-search.go?raw";

const linearSearchDefinition: AlgorithmDefinition<{
  array: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.LINEAR_SEARCH!,
    name: "Linear Search",
    category: CATEGORY.SEARCHING!,
    technique: "linear",
    description:
      "A simple sequential search that scans each element of an unsorted array from left to right until the target value is found or the array is exhausted",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 7,
    },
  },
  execute: ({ array, targetValue }) => linearSearch(array, targetValue),
  generateSteps: generateLinearSearchSteps,
  educational: linearSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(linearSearchDefinition);
