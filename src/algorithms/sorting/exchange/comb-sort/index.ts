/**
 * Comb Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { combSort } from "./sources/comb-sort.ts?fn";
import { generateCombSortSteps } from "./step-generator";
import { combSortEducational } from "./educational";

import typescriptSource from "./sources/comb-sort.ts?raw";
import pythonSource from "./sources/comb-sort.py?raw";
import javaSource from "./sources/CombSort.java?raw";
import rustSource from "./sources/comb-sort.rs?raw";
import cppSource from "./sources/CombSort.cpp?raw";
import goSource from "./sources/comb-sort.go?raw";

const combSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.COMB_SORT!,
    name: "Comb Sort",
    category: CATEGORY.SORTING!,
    technique: "exchange",
    description:
      "Improved bubble sort using a shrinking gap (factor 1.3) to eliminate distant inversions before final cleanup",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n²/2^p)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: combSort,
  generateSteps: generateCombSortSteps,
  educational: combSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(combSortDefinition);
