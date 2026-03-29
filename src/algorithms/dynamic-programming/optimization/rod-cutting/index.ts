import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { rodCutting } from "./sources/rod-cutting.ts?fn";
import { generateRodCuttingSteps } from "./step-generator";
import { rodCuttingEducational } from "./educational";

import typescriptSource from "./sources/rod-cutting.ts?raw";
import pythonSource from "./sources/rod-cutting.py?raw";
import javaSource from "./sources/RodCutting.java?raw";

export interface RodCuttingInput {
  prices: number[];
}

const rodCuttingDefinition: AlgorithmDefinition<RodCuttingInput> = {
  meta: {
    id: ALGORITHM_ID.ROD_CUTTING!,
    name: "Rod Cutting (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "optimization",
    description:
      "A bottom-up dynamic programming approach that finds the maximum revenue from cutting a rod into pieces, given a price table — an unbounded knapsack variant where each length can be reused any number of times",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { prices: [1, 5, 8, 9, 10, 17, 17, 20] },
  },
  execute: (input: RodCuttingInput) => rodCutting(input.prices),
  generateSteps: generateRodCuttingSteps,
  educational: rodCuttingEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(rodCuttingDefinition);
