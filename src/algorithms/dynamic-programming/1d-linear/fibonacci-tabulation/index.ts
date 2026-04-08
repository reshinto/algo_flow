import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { fibonacciTabulation } from "./sources/fibonacci-tabulation.ts?fn";
import { generateFibonacciTabulationSteps } from "./step-generator";
import { fibonacciTabulationEducational } from "./educational";

import typescriptSource from "./sources/fibonacci-tabulation.ts?raw";
import pythonSource from "./sources/fibonacci-tabulation.py?raw";
import javaSource from "./sources/FibonacciTabulation.java?raw";
import rustSource from "./sources/fibonacci-tabulation.rs?raw";
import cppSource from "./sources/FibonacciTabulation.cpp?raw";
import goSource from "./sources/fibonacci-tabulation.go?raw";

interface FibonacciInput {
  targetIndex: number;
}

const fibonacciTabulationDefinition: AlgorithmDefinition<FibonacciInput> = {
  meta: {
    id: ALGORITHM_ID.FIBONACCI_TABULATION!,
    name: "Fibonacci (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A bottom-up dynamic programming approach that builds the Fibonacci sequence iteratively from base cases using a DP table",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { targetIndex: 8 },
  },
  execute: (input: FibonacciInput) => fibonacciTabulation(input.targetIndex),
  generateSteps: generateFibonacciTabulationSteps,
  educational: fibonacciTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(fibonacciTabulationDefinition);
