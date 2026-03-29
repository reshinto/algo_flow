import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { integerBreakTabulation } from "./sources/integer-break-tabulation.ts?fn";
import { generateIntegerBreakTabulationSteps } from "./step-generator";
import { integerBreakTabulationEducational } from "./educational";

import typescriptSource from "./sources/integer-break-tabulation.ts?raw";
import pythonSource from "./sources/integer-break-tabulation.py?raw";
import javaSource from "./sources/IntegerBreakTabulation.java?raw";

interface IntegerBreakInput {
  targetNumber: number;
}

const integerBreakTabulationDefinition: AlgorithmDefinition<IntegerBreakInput> = {
  meta: {
    id: ALGORITHM_ID.INTEGER_BREAK_TABULATION!,
    name: "Integer Break (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "optimization",
    description:
      "A bottom-up dynamic programming approach to find the maximum product from breaking a positive integer into at least two positive integer parts",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { targetNumber: 10 },
  },
  execute: (input: IntegerBreakInput) => integerBreakTabulation(input.targetNumber),
  generateSteps: generateIntegerBreakTabulationSteps,
  educational: integerBreakTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(integerBreakTabulationDefinition);
