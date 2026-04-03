/**
 * Binary Insertion Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { binaryInsertionSort } from "./sources/binary-insertion-sort.ts?fn";
import { generateBinaryInsertionSortSteps } from "./step-generator";
import { binaryInsertionSortEducational } from "./educational";

import typescriptSource from "./sources/binary-insertion-sort.ts?raw";
import pythonSource from "./sources/binary-insertion-sort.py?raw";
import javaSource from "./sources/BinaryInsertionSort.java?raw";

const binaryInsertionSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.BINARY_INSERTION_SORT!,
    name: "Binary Insertion Sort",
    category: CATEGORY.SORTING!,
    technique: "insertion",
    description:
      "Uses binary search to find each element's insertion position in the sorted prefix, reducing comparisons to O(n log n) while keeping O(n²) shifts",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: binaryInsertionSort,
  generateSteps: generateBinaryInsertionSortSteps,
  educational: binaryInsertionSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(binaryInsertionSortDefinition);
