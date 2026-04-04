/**
 * Spaghetti Sort algorithm registration module.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { spaghettiSort } from "./sources/spaghetti-sort.ts?fn";
import { generateSpaghettiSortSteps } from "./step-generator";
import { spaghettiSortEducational } from "./educational";

import typescriptSource from "./sources/spaghetti-sort.ts?raw";
import pythonSource from "./sources/spaghetti-sort.py?raw";
import javaSource from "./sources/SpaghettiSort.java?raw";

const spaghettiSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.SPAGHETTI_SORT!,
    name: "Spaghetti Sort",
    category: CATEGORY.SORTING!,
    technique: "novelty",
    description:
      "Physical analogy: find and extract the tallest spaghetti strand (maximum) repeatedly to build sorted order",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [5, 3, 8, 1, 4, 2, 7, 6],
  },
  execute: spaghettiSort,
  generateSteps: generateSpaghettiSortSteps,
  educational: spaghettiSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(spaghettiSortDefinition);
