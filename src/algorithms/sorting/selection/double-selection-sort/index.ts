/**
 * Double Selection Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { doubleSelectionSort } from "./sources/double-selection-sort.ts?fn";
import { generateDoubleSelectionSortSteps } from "./step-generator";
import { doubleSelectionSortEducational } from "./educational";

import typescriptSource from "./sources/double-selection-sort.ts?raw";
import pythonSource from "./sources/double-selection-sort.py?raw";
import javaSource from "./sources/DoubleSelectionSort.java?raw";

const doubleSelectionSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.DOUBLE_SELECTION_SORT!,
    name: "Double Selection Sort",
    category: CATEGORY.SORTING!,
    technique: "selection",
    description:
      "Finds both minimum and maximum in each pass, placing min at the left bound and max at the right bound simultaneously — halving the number of passes",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: doubleSelectionSort,
  generateSteps: generateDoubleSelectionSortSteps,
  educational: doubleSelectionSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(doubleSelectionSortDefinition);
