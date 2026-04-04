/**
 * Block Sort (WikiSort) algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { blockSort } from "./sources/block-sort.ts?fn";
import { generateBlockSortSteps } from "./step-generator";
import { blockSortEducational } from "./educational";

import typescriptSource from "./sources/block-sort.ts?raw";
import pythonSource from "./sources/block-sort.py?raw";
import javaSource from "./sources/BlockSort.java?raw";

const blockSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.BLOCK_SORT!,
    name: "Block Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "In-place stable merge sort using rotation-based merging; finds natural runs then merges them without auxiliary memory",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: blockSort,
  generateSteps: generateBlockSortSteps,
  educational: blockSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(blockSortDefinition);
