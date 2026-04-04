/**
 * Stalin Sort algorithm registration module.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { stalinSort } from "./sources/stalin-sort.ts?fn";
import { generateStalinSortSteps } from "./step-generator";
import { stalinSortEducational } from "./educational";

import typescriptSource from "./sources/stalin-sort.ts?raw";
import pythonSource from "./sources/stalin-sort.py?raw";
import javaSource from "./sources/StalinSort.java?raw";

const stalinSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.STALIN_SORT!,
    name: "Stalin Sort",
    category: CATEGORY.SORTING!,
    technique: "novelty",
    description:
      "Eliminates any element less than the current maximum; returns only surviving in-order elements (output is shorter than input)",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: [3, 1, 4, 2, 5],
  },
  execute: stalinSort,
  generateSteps: generateStalinSortSteps,
  educational: stalinSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(stalinSortDefinition);
