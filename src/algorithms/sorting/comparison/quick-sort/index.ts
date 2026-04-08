/**
 * Quick Sort (Lomuto) algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { quickSortLomuto } from "./sources/quick-sort.ts?fn";
import { generateQuickSortSteps } from "./step-generator";
import { quickSortEducational } from "./educational";

import typescriptSource from "./sources/quick-sort.ts?raw";
import pythonSource from "./sources/quick-sort.py?raw";
import javaSource from "./sources/QuickSort.java?raw";
import rustSource from "./sources/quick-sort.rs?raw";
import cppSource from "./sources/QuickSort.cpp?raw";
import goSource from "./sources/quick-sort.go?raw";

const quickSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.QUICK_SORT!,
    name: "Quick Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Lomuto partition scheme — selects the last element as pivot and partitions around it",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: quickSortLomuto,
  generateSteps: generateQuickSortSteps,
  educational: quickSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(quickSortDefinition);
