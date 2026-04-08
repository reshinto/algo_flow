import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { islandCount } from "./sources/island-count.ts?fn";
import { generateIslandCountSteps } from "./step-generator";
import type { IslandCountInput } from "./step-generator";
import { islandCountEducational } from "./educational";

import typescriptSource from "./sources/island-count.ts?raw";
import pythonSource from "./sources/island-count.py?raw";
import javaSource from "./sources/IslandCount.java?raw";
import rustSource from "./sources/island-count.rs?raw";
import cppSource from "./sources/IslandCount.cpp?raw";
import goSource from "./sources/island-count.go?raw";

function executeIslandCount(input: IslandCountInput): number {
  // Pass a deep copy so the source function's grid mutation does not affect the stored input
  const gridCopy = input.grid.map((row) => [...row]);
  return islandCount(gridCopy) as number;
}

const islandCountDefinition: AlgorithmDefinition<IslandCountInput> = {
  meta: {
    id: ALGORITHM_ID.ISLAND_COUNT!,
    name: "Island Count",
    category: CATEGORY.MATRICES!,
    technique: "search",
    description:
      "Count connected groups of 1s in a binary grid using DFS flood fill — O(m × n) time, O(m × n) stack space",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
    },
    spaceComplexity: "O(m × n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      grid: [
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1],
      ],
    },
  },
  execute: executeIslandCount,
  generateSteps: generateIslandCountSteps,
  educational: islandCountEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(islandCountDefinition);
