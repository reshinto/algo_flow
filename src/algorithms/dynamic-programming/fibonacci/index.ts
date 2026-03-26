/**
 * Fibonacci (Tabulation) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID } from "@/utils/constants";

import { fibonacciTabulation } from "./fibonacci";
import { generateFibonacciSteps } from "./step-generator";
import { fibonacciEducational } from "./educational";

import typescriptSource from "./sources/fibonacci.ts?raw";
import pythonSource from "./sources/fibonacci.py?raw";
import javaSource from "./sources/Fibonacci.java?raw";

interface FibonacciInput {
  targetIndex: number;
}

const fibonacciDefinition: AlgorithmDefinition<FibonacciInput> = {
  meta: {
    id: ALGORITHM_ID.FIBONACCI,
    name: "Fibonacci (Tabulation)",
    category: "dynamic-programming",
    description:
      "A dynamic programming approach to computing Fibonacci numbers by building up a table from base cases",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { targetIndex: 8 },
  },
  execute: (input: FibonacciInput) => fibonacciTabulation(input.targetIndex),
  generateSteps: generateFibonacciSteps,
  educational: fibonacciEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(fibonacciDefinition);
