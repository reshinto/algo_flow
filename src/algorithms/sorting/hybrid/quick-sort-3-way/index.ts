/**
 * Quick Sort 3-Way algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { quickSort3Way } from "./sources/quick-sort-3-way.ts?fn";
import { generateQuickSort3WaySteps } from "./step-generator";
import { quickSort3WayEducational } from "./educational";

import typescriptSource from "./sources/quick-sort-3-way.ts?raw";
import pythonSource from "./sources/quick-sort-3-way.py?raw";
import javaSource from "./sources/QuickSort3Way.java?raw";

const quickSort3WayDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.QUICK_SORT_3_WAY!,
    name: "Quick Sort (3-Way)",
    category: CATEGORY.SORTING!,
    technique: "hybrid",
    description:
      "Dutch National Flag partitioning creates three regions (< pivot, = pivot, > pivot), enabling O(n) performance on arrays with many duplicate values",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: quickSort3Way,
  generateSteps: generateQuickSort3WaySteps,
  educational: quickSort3WayEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(quickSort3WayDefinition);
