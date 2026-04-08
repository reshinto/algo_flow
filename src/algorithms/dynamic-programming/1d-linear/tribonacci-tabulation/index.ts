import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { tribonacciTabulation } from "./sources/tribonacci-tabulation.ts?fn";
import { generateTribonacciTabulationSteps } from "./step-generator";
import { tribonacciTabulationEducational } from "./educational";

import typescriptSource from "./sources/tribonacci-tabulation.ts?raw";
import pythonSource from "./sources/tribonacci-tabulation.py?raw";
import javaSource from "./sources/TribonacciTabulation.java?raw";
import rustSource from "./sources/tribonacci-tabulation.rs?raw";
import cppSource from "./sources/TribonacciTabulation.cpp?raw";
import goSource from "./sources/tribonacci-tabulation.go?raw";

interface TribonacciInput {
  targetIndex: number;
}

const tribonacciTabulationDefinition: AlgorithmDefinition<TribonacciInput> = {
  meta: {
    id: ALGORITHM_ID.TRIBONACCI_TABULATION!,
    name: "Tribonacci (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A bottom-up dynamic programming approach that computes the n-th Tribonacci number by summing the three preceding values in a DP table",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { targetIndex: 10 },
  },
  execute: (input: TribonacciInput) => tribonacciTabulation(input.targetIndex),
  generateSteps: generateTribonacciTabulationSteps,
  educational: tribonacciTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(tribonacciTabulationDefinition);
