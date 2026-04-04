/**
 * Intro Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { introSort } from "./sources/intro-sort.ts?fn";
import { generateIntroSortSteps } from "./step-generator";
import { introSortEducational } from "./educational";

import typescriptSource from "./sources/intro-sort.ts?raw";
import pythonSource from "./sources/intro-sort.py?raw";
import javaSource from "./sources/IntroSort.java?raw";

const introSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.INTRO_SORT!,
    name: "Intro Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Hybrid of Quick Sort, Heap Sort, and Insertion Sort — guarantees O(n log n) by switching strategies based on recursion depth",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: introSort,
  generateSteps: generateIntroSortSteps,
  educational: introSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(introSortDefinition);
