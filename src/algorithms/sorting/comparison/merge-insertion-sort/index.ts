/**
 * Merge Insertion Sort (Ford-Johnson) algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { mergeInsertionSort } from "./sources/merge-insertion-sort.ts?fn";
import { generateMergeInsertionSortSteps } from "./step-generator";
import { mergeInsertionSortEducational } from "./educational";

import typescriptSource from "./sources/merge-insertion-sort.ts?raw";
import pythonSource from "./sources/merge-insertion-sort.py?raw";
import javaSource from "./sources/MergeInsertionSort.java?raw";
import rustSource from "./sources/merge-insertion-sort.rs?raw";
import cppSource from "./sources/MergeInsertionSort.cpp?raw";
import goSource from "./sources/merge-insertion-sort.go?raw";

const mergeInsertionSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.MERGE_INSERTION_SORT!,
    name: "Merge Insertion Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Ford-Johnson algorithm: pairs elements, sorts larger elements recursively, then binary-inserts smaller elements for theoretically optimal comparison count",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: mergeInsertionSort,
  generateSteps: generateMergeInsertionSortSteps,
  educational: mergeInsertionSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(mergeInsertionSortDefinition);
