import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { fibonacciMemoization } from "./sources/fibonacci-memoization.ts?fn";
import { generateFibonacciMemoizationSteps } from "./step-generator";
import { fibonacciMemoizationEducational } from "./educational";

import typescriptSource from "./sources/fibonacci-memoization.ts?raw";
import pythonSource from "./sources/fibonacci-memoization.py?raw";
import javaSource from "./sources/FibonacciMemoization.java?raw";
import rustSource from "./sources/fibonacci-memoization.rs?raw";
import cppSource from "./sources/FibonacciMemoization.cpp?raw";
import goSource from "./sources/fibonacci-memoization.go?raw";

interface FibonacciInput {
  targetIndex: number;
}

const fibonacciMemoizationDefinition: AlgorithmDefinition<FibonacciInput> = {
  meta: {
    id: ALGORITHM_ID.FIBONACCI_MEMOIZATION!,
    name: "Fibonacci (Memoization)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A top-down dynamic programming approach that uses recursion with a cache to avoid recomputing Fibonacci subproblems",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { targetIndex: 8 },
  },
  execute: (input: FibonacciInput) => fibonacciMemoization(input.targetIndex),
  generateSteps: generateFibonacciMemoizationSteps,
  educational: fibonacciMemoizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(fibonacciMemoizationDefinition);
