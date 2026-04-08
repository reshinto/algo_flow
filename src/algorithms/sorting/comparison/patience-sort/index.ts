/**
 * Patience Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { patienceSort } from "./sources/patience-sort.ts?fn";
import { generatePatienceSortSteps } from "./step-generator";
import { patienceSortEducational } from "./educational";

import typescriptSource from "./sources/patience-sort.ts?raw";
import pythonSource from "./sources/patience-sort.py?raw";
import javaSource from "./sources/PatienceSort.java?raw";
import rustSource from "./sources/patience-sort.rs?raw";
import cppSource from "./sources/PatienceSort.cpp?raw";
import goSource from "./sources/patience-sort.go?raw";

const patienceSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.PATIENCE_SORT!,
    name: "Patience Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Places elements into piles following patience game rules, then merges piles — also reveals the Longest Increasing Subsequence length",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [3, 1, 4, 1, 5, 9, 2, 6],
  },
  execute: patienceSort,
  generateSteps: generatePatienceSortSteps,
  educational: patienceSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(patienceSortDefinition);
