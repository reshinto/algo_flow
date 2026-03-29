import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minCostClimbingStairsTabulation } from "./sources/min-cost-climbing-stairs-tabulation.ts?fn";
import { generateMinCostClimbingStairsTabulationSteps } from "./step-generator";
import { minCostClimbingStairsTabulationEducational } from "./educational";

import typescriptSource from "./sources/min-cost-climbing-stairs-tabulation.ts?raw";
import pythonSource from "./sources/min-cost-climbing-stairs-tabulation.py?raw";
import javaSource from "./sources/MinCostClimbingStairsTabulation.java?raw";

interface MinCostStairsInput {
  costs: number[];
}

const minCostClimbingStairsTabulationDefinition: AlgorithmDefinition<MinCostStairsInput> = {
  meta: {
    id: ALGORITHM_ID.MIN_COST_CLIMBING_STAIRS_TABULATION!,
    name: "Min Cost Climbing Stairs (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A bottom-up dynamic programming approach to find the minimum cost to reach the top of a staircase where each step has an associated cost",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { costs: [10, 15, 20, 5, 25, 10] },
  },
  execute: (input: MinCostStairsInput) => minCostClimbingStairsTabulation(input.costs),
  generateSteps: generateMinCostClimbingStairsTabulationSteps,
  educational: minCostClimbingStairsTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(minCostClimbingStairsTabulationDefinition);
