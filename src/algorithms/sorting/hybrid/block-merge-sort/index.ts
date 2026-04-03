/**
 * Block Merge Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { blockMergeSort } from "./sources/block-merge-sort.ts?fn";
import { generateBlockMergeSortSteps } from "./step-generator";
import { blockMergeSortEducational } from "./educational";

import typescriptSource from "./sources/block-merge-sort.ts?raw";
import pythonSource from "./sources/block-merge-sort.py?raw";
import javaSource from "./sources/BlockMergeSort.java?raw";

const blockMergeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.BLOCK_MERGE_SORT!,
    name: "Block Merge Sort",
    category: CATEGORY.SORTING!,
    technique: "hybrid",
    description:
      "In-place stable merge sort using rotation-based merging of natural runs — O(n log n) with O(1) auxiliary space",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: blockMergeSort,
  generateSteps: generateBlockMergeSortSteps,
  educational: blockMergeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(blockMergeSortDefinition);
