/**
 * Selection Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { selectionSort } from "./sources/selection-sort.ts?fn";
import { generateSelectionSortSteps } from "./step-generator";
import { selectionSortEducational } from "./educational";

import typescriptSource from "./sources/selection-sort.ts?raw";
import pythonSource from "./sources/selection-sort.py?raw";
import javaSource from "./sources/SelectionSort.java?raw";
import rustSource from "./sources/selection-sort.rs?raw";
import cppSource from "./sources/SelectionSort.cpp?raw";
import goSource from "./sources/selection-sort.go?raw";

const selectionSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.SELECTION_SORT!,
    name: "Selection Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Repeatedly selects the minimum element from the unsorted portion and places it at the front",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: selectionSort,
  generateSteps: generateSelectionSortSteps,
  educational: selectionSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(selectionSortDefinition);
