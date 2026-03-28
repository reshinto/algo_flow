/**
 * Container With Most Water algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { containerWithMostWater } from "./sources/container-with-most-water.ts?fn";
import { generateContainerWithMostWaterSteps } from "./step-generator";
import { containerWithMostWaterEducational } from "./educational";

import typescriptSource from "./sources/container-with-most-water.ts?raw";
import pythonSource from "./sources/container-with-most-water.py?raw";
import javaSource from "./sources/ContainerWithMostWater.java?raw";

interface ContainerWithMostWaterInput {
  heights: number[];
}

const containerWithMostWaterDefinition: AlgorithmDefinition<ContainerWithMostWaterInput> = {
  meta: {
    id: ALGORITHM_ID.CONTAINER_WITH_MOST_WATER!,
    name: "Container With Most Water",
    category: CATEGORY.ARRAYS!,
    description:
      "Two-pointer algorithm that finds the pair of bars forming the container with maximum water capacity, converging inward by always moving the shorter bar — O(n) with O(1) space",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    },
  },
  execute: (input: ContainerWithMostWaterInput) => containerWithMostWater(input.heights),
  generateSteps: generateContainerWithMostWaterSteps,
  educational: containerWithMostWaterEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(containerWithMostWaterDefinition);
