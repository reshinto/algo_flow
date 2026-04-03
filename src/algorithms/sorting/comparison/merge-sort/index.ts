/**
 * Merge Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { mergeSort } from "./sources/merge-sort.ts?fn";
import { generateMergeSortSteps } from "./step-generator";
import { mergeSortEducational } from "./educational";

import typescriptSource from "./sources/merge-sort.ts?raw";
import pythonSource from "./sources/merge-sort.py?raw";
import javaSource from "./sources/MergeSort.java?raw";

const mergeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.MERGE_SORT!,
    name: "Merge Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Divide-and-conquer algorithm that recursively splits the array then merges sorted halves",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: mergeSort,
  generateSteps: generateMergeSortSteps,
  educational: mergeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(mergeSortDefinition);
