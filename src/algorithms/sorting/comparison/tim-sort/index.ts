/**
 * Tim Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { timSort } from "./sources/tim-sort.ts?fn";
import { generateTimSortSteps } from "./step-generator";
import { timSortEducational } from "./educational";

import typescriptSource from "./sources/tim-sort.ts?raw";
import pythonSource from "./sources/tim-sort.py?raw";
import javaSource from "./sources/TimSort.java?raw";
import rustSource from "./sources/tim-sort.rs?raw";
import cppSource from "./sources/TimSort.cpp?raw";
import goSource from "./sources/tim-sort.go?raw";

const timSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.TIM_SORT!,
    name: "Tim Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Hybrid algorithm combining insertion sort for small runs with merge sort to combine them — the default sort in Python and Java",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [8, 3, 6, 1, 5, 2, 7, 4],
  },
  execute: timSort,
  generateSteps: generateTimSortSteps,
  educational: timSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(timSortDefinition);
