/**
 * Insertion Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { insertionSort } from "./sources/insertion-sort.ts?fn";
import { generateInsertionSortSteps } from "./step-generator";
import { insertionSortEducational } from "./educational";

import typescriptSource from "./sources/insertion-sort.ts?raw";
import pythonSource from "./sources/insertion-sort.py?raw";
import javaSource from "./sources/InsertionSort.java?raw";

const insertionSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.INSERTION_SORT!,
    name: "Insertion Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Builds the sorted array one element at a time by inserting each into its correct position",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: insertionSort,
  generateSteps: generateInsertionSortSteps,
  educational: insertionSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(insertionSortDefinition);
