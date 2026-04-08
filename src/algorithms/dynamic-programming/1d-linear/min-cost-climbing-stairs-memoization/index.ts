import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minCostClimbingStairsMemoization } from "./sources/min-cost-climbing-stairs-memoization.ts?fn";
import { generateMinCostClimbingStairsMemoizationSteps } from "./step-generator";
import { minCostClimbingStairsMemoizationEducational } from "./educational";

import typescriptSource from "./sources/min-cost-climbing-stairs-memoization.ts?raw";
import pythonSource from "./sources/min-cost-climbing-stairs-memoization.py?raw";
import javaSource from "./sources/MinCostClimbingStairsMemoization.java?raw";
import rustSource from "./sources/min-cost-climbing-stairs-memoization.rs?raw";
import cppSource from "./sources/MinCostClimbingStairsMemoization.cpp?raw";
import goSource from "./sources/min-cost-climbing-stairs-memoization.go?raw";

export interface MinCostStairsInput {
  costs: number[];
}

const minCostClimbingStairsMemoizationDefinition: AlgorithmDefinition<MinCostStairsInput> = {
  meta: {
    id: ALGORITHM_ID.MIN_COST_CLIMBING_STAIRS_MEMOIZATION!,
    name: "Min Cost Climbing Stairs (Memoization)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A top-down dynamic programming approach using recursion with memoization to find the minimum cost to reach the top of a staircase",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { costs: [10, 15, 20, 5, 25, 10] },
  },
  execute: (input: MinCostStairsInput) => minCostClimbingStairsMemoization(input.costs),
  generateSteps: generateMinCostClimbingStairsMemoizationSteps,
  educational: minCostClimbingStairsMemoizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(minCostClimbingStairsMemoizationDefinition);
