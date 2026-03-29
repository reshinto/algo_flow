import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { climbingStairsTabulation } from "./sources/climbing-stairs-tabulation.ts?fn";
import { generateClimbingStairsTabulationSteps } from "./step-generator";
import { climbingStairsTabulationEducational } from "./educational";

import typescriptSource from "./sources/climbing-stairs-tabulation.ts?raw";
import pythonSource from "./sources/climbing-stairs-tabulation.py?raw";
import javaSource from "./sources/ClimbingStairsTabulation.java?raw";

interface ClimbingStairsInput {
  numberOfStairs: number;
}

const climbingStairsTabulationDefinition: AlgorithmDefinition<ClimbingStairsInput> = {
  meta: {
    id: ALGORITHM_ID.CLIMBING_STAIRS_TABULATION!,
    name: "Climbing Stairs (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    description:
      "A bottom-up dynamic programming approach that counts the distinct ways to climb n stairs taking 1 or 2 steps at a time",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numberOfStairs: 7 },
  },
  execute: (input: ClimbingStairsInput) => climbingStairsTabulation(input.numberOfStairs),
  generateSteps: generateClimbingStairsTabulationSteps,
  educational: climbingStairsTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(climbingStairsTabulationDefinition);
