/**
 * Bozo Sort algorithm registration module.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bozoSort } from "./sources/bozo-sort.ts?fn";
import { generateBozoSortSteps } from "./step-generator";
import { bozoSortEducational } from "./educational";

import typescriptSource from "./sources/bozo-sort.ts?raw";
import pythonSource from "./sources/bozo-sort.py?raw";
import javaSource from "./sources/BozoSort.java?raw";
import rustSource from "./sources/bozo-sort.rs?raw";
import cppSource from "./sources/BozoSort.cpp?raw";
import goSource from "./sources/bozo-sort.go?raw";

const bozoSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.BOZO_SORT!,
    name: "Bozo Sort",
    category: CATEGORY.SORTING!,
    technique: "novelty",
    description:
      "Randomly swaps two elements and checks if sorted; uses seeded PRNG for determinism, capped at 200 iterations",
    timeComplexity: {
      best: "O(n)",
      average: "O(n·n!)",
      worst: "O(∞)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [3, 1, 2],
  },
  execute: bozoSort,
  generateSteps: generateBozoSortSteps,
  educational: bozoSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bozoSortDefinition);
