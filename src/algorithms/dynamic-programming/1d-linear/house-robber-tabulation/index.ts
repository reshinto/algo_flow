import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { houseRobberTabulation } from "./sources/house-robber-tabulation.ts?fn";
import { generateHouseRobberTabulationSteps } from "./step-generator";
import { houseRobberTabulationEducational } from "./educational";

import typescriptSource from "./sources/house-robber-tabulation.ts?raw";
import pythonSource from "./sources/house-robber-tabulation.py?raw";
import javaSource from "./sources/HouseRobberTabulation.java?raw";

interface HouseRobberInput {
  houses: number[];
}

const houseRobberTabulationDefinition: AlgorithmDefinition<HouseRobberInput> = {
  meta: {
    id: ALGORITHM_ID.HOUSE_ROBBER_TABULATION!,
    name: "House Robber (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "1d-linear",
    description:
      "A bottom-up dynamic programming approach to find the maximum amount of money that can be robbed without robbing adjacent houses",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { houses: [2, 7, 9, 3, 1] },
  },
  execute: (input: HouseRobberInput) => houseRobberTabulation(input.houses),
  generateSteps: generateHouseRobberTabulationSteps,
  educational: houseRobberTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(houseRobberTabulationDefinition);
