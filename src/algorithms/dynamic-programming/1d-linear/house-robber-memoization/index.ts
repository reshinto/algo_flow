import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { houseRobberMemoization } from "./sources/house-robber-memoization.ts?fn";
import { generateHouseRobberMemoizationSteps } from "./step-generator";
import { houseRobberMemoizationEducational } from "./educational";

import typescriptSource from "./sources/house-robber-memoization.ts?raw";
import pythonSource from "./sources/house-robber-memoization.py?raw";
import javaSource from "./sources/HouseRobberMemoization.java?raw";

interface HouseRobberInput {
  houses: number[];
}

const houseRobberMemoizationDefinition: AlgorithmDefinition<HouseRobberInput> = {
  meta: {
    id: ALGORITHM_ID.HOUSE_ROBBER_MEMOIZATION!,
    name: "House Robber (Memoization)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A top-down dynamic programming approach that uses recursion with a cache to find the maximum money robbable from non-adjacent houses",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { houses: [2, 7, 9, 3, 1] },
  },
  execute: (input: HouseRobberInput) => houseRobberMemoization(input.houses),
  generateSteps: generateHouseRobberMemoizationSteps,
  educational: houseRobberMemoizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(houseRobberMemoizationDefinition);
