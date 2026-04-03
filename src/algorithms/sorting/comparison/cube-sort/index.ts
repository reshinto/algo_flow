/**
 * Cube Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { cubeSort } from "./sources/cube-sort.ts?fn";
import { generateCubeSortSteps } from "./step-generator";
import { cubeSortEducational } from "./educational";

import typescriptSource from "./sources/cube-sort.ts?raw";
import pythonSource from "./sources/cube-sort.py?raw";
import javaSource from "./sources/CubeSort.java?raw";

const cubeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.CUBE_SORT!,
    name: "Cube Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Divides the array into cube-root-sized blocks, insertion-sorts each block, then merges all blocks with a k-way merge",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: cubeSort,
  generateSteps: generateCubeSortSteps,
  educational: cubeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(cubeSortDefinition);
