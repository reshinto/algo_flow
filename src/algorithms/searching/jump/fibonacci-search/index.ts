/**
 * Fibonacci Search algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { fibonacciSearch } from "./sources/fibonacci-search.ts?fn";
import { generateFibonacciSearchSteps } from "./step-generator";
import { fibonacciSearchEducational } from "./educational";

import typescriptSource from "./sources/fibonacci-search.ts?raw";
import pythonSource from "./sources/fibonacci-search.py?raw";
import javaSource from "./sources/FibonacciSearch.java?raw";
import rustSource from "./sources/fibonacci-search.rs?raw";
import cppSource from "./sources/FibonacciSearch.cpp?raw";
import goSource from "./sources/fibonacci-search.go?raw";

const fibonacciSearchDefinition: AlgorithmDefinition<{
  sortedArray: number[];
  targetValue: number;
}> = {
  meta: {
    id: ALGORITHM_ID.FIBONACCI_SEARCH!,
    name: "Fibonacci Search",
    category: CATEGORY.SEARCHING!,
    technique: "jump",
    description:
      "A sorted-array search that uses Fibonacci numbers to determine split points, achieving O(log n) time without division operations",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 38,
    },
  },
  execute: ({ sortedArray, targetValue }) => fibonacciSearch(sortedArray, targetValue),
  generateSteps: generateFibonacciSearchSteps,
  educational: fibonacciSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(fibonacciSearchDefinition);
