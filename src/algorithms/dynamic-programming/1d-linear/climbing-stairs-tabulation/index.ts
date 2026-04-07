import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { climbingStairsTabulation } from "./sources/climbing-stairs-tabulation.ts?fn";
import { generateClimbingStairsTabulationSteps } from "./step-generator";
import { climbingStairsTabulationEducational } from "./educational";

import typescriptSource from "./sources/climbing-stairs-tabulation.ts?raw";
import pythonSource from "./sources/climbing-stairs-tabulation.py?raw";
import javaSource from "./sources/ClimbingStairsTabulation.java?raw";
import rustSource from "./sources/climbing-stairs-tabulation.rs?raw";
import cppSource from "./sources/ClimbingStairsTabulation.cpp?raw";
import goSource from "./sources/climbing-stairs-tabulation.go?raw";

interface ClimbingStairsInput {
  numberOfStairs: number;
}

const climbingStairsTabulationDefinition: AlgorithmDefinition<ClimbingStairsInput> = {
  meta: {
    id: ALGORITHM_ID.CLIMBING_STAIRS_TABULATION!,
    name: "Climbing Stairs (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A bottom-up dynamic programming approach that counts the distinct ways to climb n stairs taking 1 or 2 steps at a time",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { numberOfStairs: 7 },
  },
  execute: (input: ClimbingStairsInput) => climbingStairsTabulation(input.numberOfStairs),
  generateSteps: generateClimbingStairsTabulationSteps,
  educational: climbingStairsTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(climbingStairsTabulationDefinition);
