import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { tribonacciMemoization } from "./sources/tribonacci-memoization.ts?fn";
import { generateTribonacciMemoizationSteps } from "./step-generator";
import { tribonacciMemoizationEducational } from "./educational";

import typescriptSource from "./sources/tribonacci-memoization.ts?raw";
import pythonSource from "./sources/tribonacci-memoization.py?raw";
import javaSource from "./sources/TribonacciMemoization.java?raw";
import rustSource from "./sources/tribonacci-memoization.rs?raw";
import cppSource from "./sources/TribonacciMemoization.cpp?raw";
import goSource from "./sources/tribonacci-memoization.go?raw";

interface TribonacciInput {
  targetIndex: number;
}

const tribonacciMemoizationDefinition: AlgorithmDefinition<TribonacciInput> = {
  meta: {
    id: ALGORITHM_ID.TRIBONACCI_MEMOIZATION!,
    name: "Tribonacci (Memoization)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A top-down dynamic programming approach that uses recursion with a cache to avoid recomputing Tribonacci subproblems, summing the three preceding values",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { targetIndex: 10 },
  },
  execute: (input: TribonacciInput) => tribonacciMemoization(input.targetIndex),
  generateSteps: generateTribonacciMemoizationSteps,
  educational: tribonacciMemoizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(tribonacciMemoizationDefinition);
