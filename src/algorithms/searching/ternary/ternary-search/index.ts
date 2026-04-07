/**
 * Ternary Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { ternarySearch } from "./sources/ternary-search.ts?fn";
import { generateTernarySearchSteps } from "./step-generator";
import { ternarySearchEducational } from "./educational";

import typescriptSource from "./sources/ternary-search.ts?raw";
import pythonSource from "./sources/ternary-search.py?raw";
import javaSource from "./sources/TernarySearch.java?raw";
import rustSource from "./sources/ternary-search.rs?raw";
import cppSource from "./sources/TernarySearch.cpp?raw";
import goSource from "./sources/ternary-search.go?raw";

const ternarySearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.TERNARY_SEARCH!,
    name: "Ternary Search",
    category: CATEGORY.SEARCHING!,
    technique: "ternary",
    description:
      "A divide-and-conquer algorithm that splits the sorted array into three parts per iteration using two midpoints, converging in O(log₃ n) steps",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 72,
    },
  },
  execute: ({ sortedArray, targetValue }) => ternarySearch(sortedArray, targetValue),
  generateSteps: generateTernarySearchSteps,
  educational: ternarySearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(ternarySearchDefinition);
