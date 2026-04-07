import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { climbingStairsMemoization } from "./sources/climbing-stairs-memoization.ts?fn";
import { generateClimbingStairsMemoizationSteps } from "./step-generator";
import { climbingStairsMemoizationEducational } from "./educational";

import typescriptSource from "./sources/climbing-stairs-memoization.ts?raw";
import pythonSource from "./sources/climbing-stairs-memoization.py?raw";
import javaSource from "./sources/ClimbingStairsMemoization.java?raw";
import rustSource from "./sources/climbing-stairs-memoization.rs?raw";
import cppSource from "./sources/ClimbingStairsMemoization.cpp?raw";
import goSource from "./sources/climbing-stairs-memoization.go?raw";

export interface ClimbingStairsInput {
  numberOfStairs: number;
}

const climbingStairsMemoizationDefinition: AlgorithmDefinition<ClimbingStairsInput> = {
  meta: {
    id: ALGORITHM_ID.CLIMBING_STAIRS_MEMOIZATION!,
    name: "Climbing Stairs (Memoization)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A top-down dynamic programming approach that uses recursion with memoization to count distinct ways to climb n stairs",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { numberOfStairs: 7 },
  },
  execute: (input: ClimbingStairsInput) => climbingStairsMemoization(input.numberOfStairs),
  generateSteps: generateClimbingStairsMemoizationSteps,
  educational: climbingStairsMemoizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(climbingStairsMemoizationDefinition);
