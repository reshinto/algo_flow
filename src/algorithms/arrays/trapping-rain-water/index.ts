/**
 * Trapping Rain Water algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { trappingRainWater } from "./sources/trapping-rain-water.ts?fn";
import { generateTrappingRainWaterSteps } from "./step-generator";
import { trappingRainWaterEducational } from "./educational";

import typescriptSource from "./sources/trapping-rain-water.ts?raw";
import pythonSource from "./sources/trapping-rain-water.py?raw";
import javaSource from "./sources/TrappingRainWater.java?raw";

interface TrappingRainWaterInput {
  heights: number[];
}

const trappingRainWaterDefinition: AlgorithmDefinition<TrappingRainWaterInput> = {
  meta: {
    id: ALGORITHM_ID.TRAPPING_RAIN_WATER!,
    name: "Trapping Rain Water",
    category: CATEGORY.ARRAYS!,
    description:
      "Computes the total water trapped between elevation bars using an O(n) two-pointer approach that processes the shorter side first",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    },
  },
  execute: (input: TrappingRainWaterInput) => trappingRainWater(input.heights),
  generateSteps: generateTrappingRainWaterSteps,
  educational: trappingRainWaterEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(trappingRainWaterDefinition);
