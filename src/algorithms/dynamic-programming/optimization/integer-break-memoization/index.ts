import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { integerBreakMemoization } from "./sources/integer-break-memoization.ts?fn";
import { generateIntegerBreakMemoizationSteps } from "./step-generator";
import { integerBreakMemoizationEducational } from "./educational";

import typescriptSource from "./sources/integer-break-memoization.ts?raw";
import pythonSource from "./sources/integer-break-memoization.py?raw";
import javaSource from "./sources/IntegerBreakMemoization.java?raw";
import rustSource from "./sources/integer-break-memoization.rs?raw";
import cppSource from "./sources/IntegerBreakMemoization.cpp?raw";
import goSource from "./sources/integer-break-memoization.go?raw";

interface IntegerBreakInput {
  targetNumber: number;
}

const integerBreakMemoizationDefinition: AlgorithmDefinition<IntegerBreakInput> = {
  meta: {
    id: ALGORITHM_ID.INTEGER_BREAK_MEMOIZATION!,
    name: "Integer Break (Memoization)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "optimization",
    description:
      "A top-down dynamic programming approach that uses recursion with a cache to find the maximum product from breaking an integer into at least two positive parts",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { targetNumber: 10 },
  },
  execute: (input: IntegerBreakInput) => integerBreakMemoization(input.targetNumber),
  generateSteps: generateIntegerBreakMemoizationSteps,
  educational: integerBreakMemoizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(integerBreakMemoizationDefinition);
