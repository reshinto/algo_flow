import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { catalanNumber } from "./sources/catalan-numbers.ts?fn";
import { generateCatalanNumbersSteps } from "./step-generator";
import { catalanNumbersEducational } from "./educational";

import typescriptSource from "./sources/catalan-numbers.ts?raw";
import pythonSource from "./sources/catalan-numbers.py?raw";
import javaSource from "./sources/CatalanNumbers.java?raw";

interface CatalanInput {
  targetIndex: number;
}

const catalanNumbersDefinition: AlgorithmDefinition<CatalanInput> = {
  meta: {
    id: ALGORITHM_ID.CATALAN_NUMBERS!,
    name: "Catalan Numbers (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    description:
      "A bottom-up dynamic programming approach that computes the n-th Catalan number by summing products of all left-right sub-structure pairs in a DP table",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { targetIndex: 8 },
  },
  execute: (input: CatalanInput) => catalanNumber(input.targetIndex),
  generateSteps: generateCatalanNumbersSteps,
  educational: catalanNumbersEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(catalanNumbersDefinition);
