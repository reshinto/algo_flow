/**
 * Cycle Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { cycleSort } from "./sources/cycle-sort.ts?fn";
import { generateCycleSortSteps } from "./step-generator";
import { cycleSortEducational } from "./educational";

import typescriptSource from "./sources/cycle-sort.ts?raw";
import pythonSource from "./sources/cycle-sort.py?raw";
import javaSource from "./sources/CycleSort.java?raw";
import rustSource from "./sources/cycle-sort.rs?raw";
import cppSource from "./sources/CycleSort.cpp?raw";
import goSource from "./sources/cycle-sort.go?raw";

const cycleSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.CYCLE_SORT!,
    name: "Cycle Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Minimizes array writes by placing each element directly in its correct position via cycle decomposition — optimal for write-expensive storage",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [3, 1, 5, 2, 4, 6, 0],
  },
  execute: cycleSort,
  generateSteps: generateCycleSortSteps,
  educational: cycleSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(cycleSortDefinition);
