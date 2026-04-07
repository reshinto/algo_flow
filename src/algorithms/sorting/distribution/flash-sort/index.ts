/**
 * Flash Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { flashSort } from "./sources/flash-sort.ts?fn";
import { generateFlashSortSteps } from "./step-generator";
import { flashSortEducational } from "./educational";

import typescriptSource from "./sources/flash-sort.ts?raw";
import pythonSource from "./sources/flash-sort.py?raw";
import javaSource from "./sources/FlashSort.java?raw";
import rustSource from "./sources/flash-sort.rs?raw";
import cppSource from "./sources/FlashSort.cpp?raw";
import goSource from "./sources/flash-sort.go?raw";

const flashSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.FLASH_SORT!,
    name: "Flash Sort",
    category: CATEGORY.SORTING!,
    technique: "distribution",
    description:
      "Classifies elements into value-range buckets, permutes them in-place, then finishes with insertion sort — O(n) average",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: flashSort,
  generateSteps: generateFlashSortSteps,
  educational: flashSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(flashSortDefinition);
