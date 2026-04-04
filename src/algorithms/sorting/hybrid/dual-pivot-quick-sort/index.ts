/**
 * Dual-Pivot Quick Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { dualPivotQuickSort } from "./sources/dual-pivot-quick-sort.ts?fn";
import { generateDualPivotQuickSortSteps } from "./step-generator";
import { dualPivotQuickSortEducational } from "./educational";

import typescriptSource from "./sources/dual-pivot-quick-sort.ts?raw";
import pythonSource from "./sources/dual-pivot-quick-sort.py?raw";
import javaSource from "./sources/DualPivotQuickSort.java?raw";

const dualPivotQuickSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.DUAL_PIVOT_QUICK_SORT!,
    name: "Dual-Pivot Quick Sort",
    category: CATEGORY.SORTING!,
    technique: "hybrid",
    description:
      "Uses two pivots to create three partitions per pass, producing fewer comparisons than single-pivot Quick Sort — Java's Arrays.sort() default for primitives",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: dualPivotQuickSort,
  generateSteps: generateDualPivotQuickSortSteps,
  educational: dualPivotQuickSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(dualPivotQuickSortDefinition);
