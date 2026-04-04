/**
 * Stooge Sort algorithm registration module.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { stoogeSort } from "./sources/stooge-sort.ts?fn";
import { generateStoogeSortSteps } from "./step-generator";
import { stoogeSortEducational } from "./educational";

import typescriptSource from "./sources/stooge-sort.ts?raw";
import pythonSource from "./sources/stooge-sort.py?raw";
import javaSource from "./sources/StoogeSort.java?raw";

const stoogeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.STOOGE_SORT!,
    name: "Stooge Sort",
    category: CATEGORY.SORTING!,
    technique: "concurrent",
    description:
      "Recursive: swap first/last if needed, then recursively sort first 2/3, last 2/3, and first 2/3 again",
    timeComplexity: {
      best: "O(n^2.71)",
      average: "O(n^2.71)",
      worst: "O(n^2.71)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [5, 3, 1, 4, 2],
  },
  execute: stoogeSort,
  generateSteps: generateStoogeSortSteps,
  educational: stoogeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(stoogeSortDefinition);
